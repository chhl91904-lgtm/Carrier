import { caneMateProduct, demoCartPolicy } from "@/config/commerce";
import {
  emptyCart,
  type CartItem,
  type CartLineId,
  type DemoCart,
} from "@/lib/cart/types";

export type CartMutation =
  { ok: true; cart: DemoCart } | { ok: false; cart: DemoCart; error: string };

export function parseQuantity(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value.trim())) return null;
  const quantity = Number(value);
  if (
    !Number.isSafeInteger(quantity) ||
    quantity < demoCartPolicy.minimumQuantity ||
    quantity > demoCartPolicy.maximumTotalQuantity
  ) {
    return null;
  }
  return quantity;
}

export function getCartItemCount(cart: DemoCart): number {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export function addCartItem(
  cart: DemoCart,
  quantity: number,
  isGift: boolean,
): CartMutation {
  const nextTotal = getCartItemCount(cart) + quantity;
  if (nextTotal > demoCartPolicy.maximumTotalQuantity) {
    return {
      ok: false,
      cart,
      error: `데모 장바구니에는 총 ${demoCartPolicy.maximumTotalQuantity}개까지 담을 수 있습니다.`,
    };
  }

  const lineId: CartLineId = isGift ? "cane-mate-gift" : "cane-mate-standard";
  const existing = cart.items.find((item) => item.lineId === lineId);
  const items = existing
    ? cart.items.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [
        ...cart.items,
        { lineId, productId: "cane-mate" as const, quantity, isGift },
      ];
  return { ok: true, cart: { items } };
}

export function updateCartItem(
  cart: DemoCart,
  lineId: CartLineId,
  quantity: number,
): CartMutation {
  const existing = cart.items.find((item) => item.lineId === lineId);
  if (!existing)
    return { ok: false, cart, error: "변경할 상품을 찾지 못했습니다." };

  const otherQuantity = getCartItemCount(cart) - existing.quantity;
  if (otherQuantity + quantity > demoCartPolicy.maximumTotalQuantity) {
    return {
      ok: false,
      cart,
      error: `데모 장바구니에는 총 ${demoCartPolicy.maximumTotalQuantity}개까지 담을 수 있습니다.`,
    };
  }

  return {
    ok: true,
    cart: {
      items: cart.items.map((item) =>
        item.lineId === lineId ? { ...item, quantity } : item,
      ),
    },
  };
}

export function removeCartItem(cart: DemoCart, lineId: CartLineId): DemoCart {
  return { items: cart.items.filter((item) => item.lineId !== lineId) };
}

export function calculateCart(cart: DemoCart, discount = 0) {
  const lines = cart.items.map((item) => ({
    ...item,
    unitPrice: caneMateProduct.unitPrice,
    lineTotal: caneMateProduct.unitPrice * item.quantity,
  }));
  return {
    lines,
    subtotal: lines.reduce((total, line) => total + line.lineTotal, 0),
    discount,
    total: Math.max(
      0,
      lines.reduce((total, line) => total + line.lineTotal, 0) - discount,
    ),
  };
}

export function formatWon(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

export function normalizeCart(value: unknown): DemoCart {
  if (!value || typeof value !== "object" || !("items" in value))
    return emptyCart;
  const rawItems = (value as { items?: unknown }).items;
  if (!Array.isArray(rawItems)) return emptyCart;

  const items: CartItem[] = [];
  let total = 0;
  for (const rawItem of rawItems) {
    if (!rawItem || typeof rawItem !== "object") continue;
    const candidate = rawItem as Partial<CartItem>;
    const isKnownLine =
      candidate.lineId === "cane-mate-standard" ||
      candidate.lineId === "cane-mate-gift";
    const isValidQuantity =
      Number.isSafeInteger(candidate.quantity) &&
      Number(candidate.quantity) >= demoCartPolicy.minimumQuantity;
    const expectedGift = candidate.lineId === "cane-mate-gift";
    if (
      !isKnownLine ||
      candidate.productId !== "cane-mate" ||
      !isValidQuantity ||
      candidate.isGift !== expectedGift ||
      items.some((item) => item.lineId === candidate.lineId)
    ) {
      continue;
    }

    const quantity = Number(candidate.quantity);
    if (total + quantity > demoCartPolicy.maximumTotalQuantity) continue;
    items.push({
      lineId: candidate.lineId as CartLineId,
      productId: "cane-mate",
      quantity,
      isGift: expectedGift,
    });
    total += quantity;
  }

  return { items };
}
