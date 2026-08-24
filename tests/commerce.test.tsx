import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import BuyPage from "../src/app/buy/page";
import CartPage from "../src/app/cart/page";
import { ProductVisualPlaceholder } from "../src/components/home/product-visual-placeholder";
import { caneMateProduct, demoCartPolicy } from "../src/config/commerce";
import {
  addCartItem,
  calculateCart,
  formatWon,
  getCartItemCount,
  normalizeCart,
  parseQuantity,
  removeCartItem,
  updateCartItem,
} from "../src/lib/cart/domain";
import { createDemoCartRepository } from "../src/lib/cart/repository";
import { emptyCart } from "../src/lib/cart/types";

const { cookieValues, cookieSet } = vi.hoisted(() => {
  const cookieValues = new Map<string, string>();
  return {
    cookieValues,
    cookieSet: vi.fn((name: string, value: string) => {
      if (value) cookieValues.set(name, value);
      else cookieValues.delete(name);
    }),
  };
});

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => {
      const value = cookieValues.get(name);
      return value ? { value } : undefined;
    },
    set: cookieSet,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("demo commerce domain", () => {
  it("defends quantity boundaries and malformed values", () => {
    expect(parseQuantity("1")).toBe(1);
    expect(parseQuantity(String(demoCartPolicy.maximumTotalQuantity))).toBe(10);
    for (const value of [null, "", "0", "11", "1.5", "-1", "one"]) {
      expect(parseQuantity(value)).toBeNull();
    }
  });

  it("merges matching lines, keeps gift lines separate, and enforces the total cap", () => {
    const first = addCartItem(emptyCart, 2, false);
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const merged = addCartItem(first.cart, 3, false);
    expect(merged.ok).toBe(true);
    if (!merged.ok) return;
    expect(merged.cart.items).toHaveLength(1);
    expect(merged.cart.items[0]?.quantity).toBe(5);

    const gift = addCartItem(merged.cart, 2, true);
    expect(gift.ok).toBe(true);
    if (!gift.ok) return;
    expect(gift.cart.items).toHaveLength(2);
    expect(getCartItemCount(gift.cart)).toBe(7);

    const overLimit = addCartItem(gift.cart, 4, false);
    expect(overLimit).toMatchObject({ ok: false, cart: gift.cart });
  });

  it("keeps quantity changes, removal, and totals mathematically consistent", () => {
    const initial = {
      items: [
        {
          lineId: "cane-mate-standard" as const,
          productId: "cane-mate" as const,
          quantity: 2,
          isGift: false,
        },
        {
          lineId: "cane-mate-gift" as const,
          productId: "cane-mate" as const,
          quantity: 1,
          isGift: true,
        },
      ],
    };
    const updated = updateCartItem(initial, "cane-mate-standard", 4);
    expect(updated.ok).toBe(true);
    if (!updated.ok) return;

    const calculation = calculateCart(updated.cart);
    expect(getCartItemCount(updated.cart)).toBe(5);
    expect(calculation.subtotal).toBe(caneMateProduct.unitPrice * 5);
    expect(calculation.discount).toBe(0);
    expect(calculation.total).toBe(745_000);
    expect(formatWon(calculation.total)).toBe("745,000원");

    const removed = removeCartItem(updated.cart, "cane-mate-gift");
    expect(getCartItemCount(removed)).toBe(4);
    expect(calculateCart(removed).total).toBe(596_000);
  });

  it("normalizes tampered cart data without trusting price or invalid quantities", () => {
    expect(
      normalizeCart({
        items: [
          {
            lineId: "cane-mate-standard",
            productId: "cane-mate",
            quantity: 2,
            isGift: false,
            unitPrice: 1,
          },
          {
            lineId: "unknown",
            productId: "cane-mate",
            quantity: 999,
            isGift: false,
          },
        ],
      }),
    ).toEqual({
      items: [
        {
          lineId: "cane-mate-standard",
          productId: "cane-mate",
          quantity: 2,
          isGift: false,
        },
      ],
    });
  });

  it("persists only normalized cart state in a signed session cookie", async () => {
    cookieValues.clear();
    cookieSet.mockClear();
    const repository = createDemoCartRepository();
    await repository.write({
      items: [
        {
          lineId: "cane-mate-standard",
          productId: "cane-mate",
          quantity: 3,
          isGift: false,
        },
      ],
    });

    expect(cookieSet).toHaveBeenCalledWith(
      "cane_mate_demo_cart",
      expect.any(String),
      expect.objectContaining({ httpOnly: true, sameSite: "lax", path: "/" }),
    );
    expect(await repository.read()).toEqual({
      items: [
        {
          lineId: "cane-mate-standard",
          productId: "cane-mate",
          quantity: 3,
          isGift: false,
        },
      ],
    });

    const stored = cookieValues.get("cane_mate_demo_cart");
    cookieValues.set("cane_mate_demo_cart", `${stored}tampered`);
    expect(await repository.read()).toEqual(emptyCart);
  });
});

describe("BUY and CART presentation", () => {
  it("renders the product, planning price, three distinct CTAs, and live status", () => {
    const html = renderToStaticMarkup(<BuyPage />);

    expect(html).toContain("CANE MATE");
    expect(html).toContain("149,000원");
    for (const feature of caneMateProduct.features)
      expect(html).toContain(feature);
    expect(html).toContain("선물하기");
    expect(html).toContain("장바구니 담기");
    expect(html).toContain("구매하기");
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("실제 결제 없이");
  });

  it("renders empty and populated cart states with exact totals", async () => {
    cookieValues.clear();
    const emptyHtml = renderToStaticMarkup(await CartPage());
    expect(emptyHtml).toContain("장바구니가 비어 있습니다.");
    expect(emptyHtml).toContain("BUY로 돌아가기");

    await createDemoCartRepository().write({
      items: [
        {
          lineId: "cane-mate-standard",
          productId: "cane-mate",
          quantity: 2,
          isGift: false,
        },
      ],
    });
    const populatedHtml = renderToStaticMarkup(await CartPage());
    expect(populatedHtml).toContain("현재 총 수량 2개");
    expect(populatedHtml).toContain("298,000원");
    expect(populatedHtml).toContain("적용 쿠폰");
    expect(populatedHtml).toContain("Checkout에서 선택");
    expect(populatedHtml).toContain("삭제");
  });

  it("renders the upright product image without folded-cane artwork", () => {
    const html = renderToStaticMarkup(
      <>
        <ProductVisualPlaceholder compact idPrefix="standard" />
        <ProductVisualPlaceholder compact idPrefix="gift" />
      </>,
    );
    expect(html.match(/src="\/cane-mate-product.png"/g)).toHaveLength(2);
    expect(html).not.toContain("4-STEP FOLDING");
  });
});
