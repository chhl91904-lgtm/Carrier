import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { CheckoutForm } from "../src/components/checkout/checkout-form";
import { caneMateProduct } from "../src/config/commerce";
import { calculateCart } from "../src/lib/cart/domain";
import type { DemoCart } from "../src/lib/cart/types";
import {
  createDemoOrderId,
  validateCheckout,
} from "../src/lib/checkout/domain";
import {
  calculateCouponDiscount,
  findApplicableCoupon,
  markCouponUsed,
  normalizeCouponWallet,
} from "../src/lib/coupon/domain";
import { demoCouponFixtures } from "../src/lib/coupon/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));

const giftCart: DemoCart = {
  items: [
    {
      lineId: "cane-mate-gift",
      productId: "cane-mate",
      quantity: 3,
      isGift: true,
    },
  ],
};

function validCheckoutData() {
  const data = new FormData();
  data.set("shippingName", "데모 사용자");
  data.set("shippingContact", "010-0000-0000");
  data.set("postalCode", "00000");
  data.set("address", "데모시 예시구");
  data.set("addressDetail", "프로젝트용 00");
  data.set("recipientName", "데모 받는 분");
  data.set("recipientContact", "010-0000-0000");
  data.set("giftAddress", "데모시 선물로 00");
  data.set("giftMessage", "데모 메시지");
  data.set("paymentMethod", "demo");
  return data;
}

describe("coupon and checkout domain", () => {
  it("calculates 5% from the product subtotal with won-unit floor policy", () => {
    const subtotal = caneMateProduct.unitPrice * 3;
    const available = demoCouponFixtures[0];
    const discount = calculateCouponDiscount(subtotal, available);
    expect(discount).toBe(22_350);
    expect(calculateCart(giftCart, discount)).toMatchObject({
      subtotal: 447_000,
      discount: 22_350,
      total: 424_650,
    });
    expect(
      calculateCouponDiscount(101, {
        discountRate: 5,
        status: "available",
      }),
    ).toBe(5);
  });

  it("rejects used and expired coupons and changes an available coupon once", () => {
    const wallet = normalizeCouponWallet(null);
    expect(findApplicableCoupon(wallet, "checkout-demo-used")).toBeNull();
    expect(findApplicableCoupon(wallet, "checkout-demo-expired")).toBeNull();
    const applied = findApplicableCoupon(wallet, "checkout-demo-available");
    expect(applied?.status).toBe("available");

    const used = markCouponUsed(wallet, "checkout-demo-available", "CM-DEMO-1");
    expect(findApplicableCoupon(used, "checkout-demo-available")).toBeNull();
    expect(used[0]).toMatchObject({ status: "used", orderId: "CM-DEMO-1" });
    expect(
      markCouponUsed(used, "checkout-demo-available", "CM-DEMO-2")[0],
    ).toMatchObject({
      status: "used",
      orderId: "CM-DEMO-1",
    });
  });

  it("validates every shipping and gift field without returning entered values", () => {
    const empty = new FormData();
    const errors = validateCheckout(empty, giftCart.items);
    for (const field of [
      "shippingName",
      "shippingContact",
      "postalCode",
      "address",
      "addressDetail",
      "recipientName",
      "recipientContact",
      "giftAddress",
      "paymentMethod",
    ]) {
      expect(errors).toHaveProperty(field);
    }
    expect(validateCheckout(validCheckoutData(), giftCart.items)).toEqual({});
    expect(JSON.stringify(errors)).not.toContain("데모시 선물로 00");
  });

  it("creates the same safe demo order id for the same checkout token", () => {
    const token = "12345678-1234-1234-1234-123456789abc";
    expect(createDemoOrderId(token)).toBe(createDemoOrderId(token));
    expect(createDemoOrderId(token)).toMatch(/^CM-DEMO-[A-Z0-9]{10}$/);
  });
});

describe("checkout presentation", () => {
  it("renders gift fields, coupon states, demo payment, and explicit no-storage notice", () => {
    const html = renderToStaticMarkup(
      <CheckoutForm
        cart={giftCart}
        coupons={demoCouponFixtures}
        checkoutToken="12345678-1234-1234-1234-123456789abc"
        isAuthenticated
      />,
    );
    for (const field of [
      "recipientName",
      "recipientContact",
      "giftAddress",
      "giftMessage",
      "shippingName",
      "shippingContact",
      "postalCode",
      "address",
      "addressDetail",
      "paymentMethod",
    ]) {
      expect(html).toContain(`name="${field}"`);
    }
    expect(html).toContain("사용 가능");
    expect(html).toContain("사용 완료");
    expect(html).toContain("기간 만료");
    expect(html).toContain("카드번호·계좌정보를 입력하지 않습니다");
    expect(html).toContain(
      "실제 결제가 진행되지 않는 프로젝트용 Demo Checkout",
    );
    expect(html).toContain("주문 결과에 저장되지 않습니다");
    expect(html).not.toContain("cardNumber");
    expect(html).not.toContain("accountNumber");
  });
});
