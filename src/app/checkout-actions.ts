"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { calculateCart } from "@/lib/cart/domain";
import { createDemoCartRepository } from "@/lib/cart/repository";
import { createDemoOrderId, validateCheckout } from "@/lib/checkout/domain";
import { createDemoOrderRepository } from "@/lib/checkout/repository";
import type { CheckoutActionState, DemoOrder } from "@/lib/checkout/types";
import {
  calculateCouponDiscount,
  findApplicableCoupon,
  markCouponUsed,
} from "@/lib/coupon/domain";
import { createDemoCouponRepository } from "@/lib/coupon/repository";
import { readDemoSession } from "@/lib/auth/session";

function errorState(
  message: string,
  fieldErrors: CheckoutActionState["fieldErrors"] = {},
): CheckoutActionState {
  return { status: "error", message, fieldErrors };
}

export async function createDemoOrderAction(
  _previousState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const checkoutToken = formData.get("checkoutToken")?.toString() ?? "";
  if (!/^[a-f0-9-]{20,50}$/i.test(checkoutToken)) {
    return errorState(
      "주문 확인 토큰이 만료되었습니다. checkout 화면을 새로고침해 주세요.",
    );
  }

  const orderRepository = createDemoOrderRepository();
  const existingOrder = await orderRepository.read();
  if (existingOrder?.checkoutToken === checkoutToken) {
    redirect("/checkout/demo-result");
  }

  const cartRepository = createDemoCartRepository();
  const cart = await cartRepository.read();
  if (!cart.items.length) {
    return errorState("장바구니가 비어 있습니다. BUY에서 상품을 담아 주세요.");
  }

  const fieldErrors = validateCheckout(formData, cart.items);
  if (Object.keys(fieldErrors).length) {
    return errorState(
      "입력한 데모 배송·선물 정보를 확인해 주세요.",
      fieldErrors,
    );
  }

  const session = await readDemoSession();
  const requestedCouponId = formData.get("couponId")?.toString() ?? "";
  const couponRepository = createDemoCouponRepository();
  const coupons = session ? await couponRepository.read() : [];
  const coupon = findApplicableCoupon(coupons, requestedCouponId);
  if (requestedCouponId && !coupon) {
    return errorState("선택한 쿠폰은 사용할 수 없습니다.", {
      coupon: "사용 가능 상태의 회원 쿠폰만 적용할 수 있습니다.",
    });
  }

  const baseCalculation = calculateCart(cart);
  const discount = calculateCouponDiscount(baseCalculation.subtotal, coupon);
  const calculation = calculateCart(cart, discount);
  const orderId = createDemoOrderId(checkoutToken);
  const order: DemoOrder = {
    id: orderId,
    checkoutToken,
    items: calculation.lines,
    coupon: coupon
      ? {
          id: coupon.id,
          name: coupon.name,
          discountRate: coupon.discountRate,
        }
      : null,
    subtotal: calculation.subtotal,
    discount: calculation.discount,
    total: calculation.total,
    shippingSnapshot: "입력값 미저장 · 데모 배송 정보 확인 완료",
    mode: "demo",
    status: "demo-created",
    createdAt: new Date().toISOString(),
  };

  try {
    await orderRepository.write(order);
    if (coupon) {
      await couponRepository.write(markCouponUsed(coupons, coupon.id, orderId));
    }
    await cartRepository.clear();
    revalidatePath("/", "layout");
    revalidatePath("/mypage/coupons");
  } catch {
    return errorState(
      "데모 주문을 만들지 못했습니다. 입력값은 저장되지 않았습니다. 다시 시도해 주세요.",
    );
  }

  redirect("/checkout/demo-result");
}
