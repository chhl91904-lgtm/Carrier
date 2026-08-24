"use server";

import { revalidatePath } from "next/cache";

import {
  addCartItem,
  getCartItemCount,
  parseQuantity,
  removeCartItem,
  updateCartItem,
} from "@/lib/cart/domain";
import { createDemoCartRepository } from "@/lib/cart/repository";
import type { CartActionState, CartLineId } from "@/lib/cart/types";

function refreshCartViews() {
  revalidatePath("/", "layout");
}

function errorState(message: string, cartCount: number): CartActionState {
  return { status: "error", message, cartCount };
}

function parseLineId(value: FormDataEntryValue | null): CartLineId | null {
  return value === "cane-mate-standard" || value === "cane-mate-gift"
    ? value
    : null;
}

export async function addToCartAction(
  _previousState: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const repository = createDemoCartRepository();
  const cart = await repository.read();
  const currentCount = getCartItemCount(cart);
  const quantity = parseQuantity(formData.get("quantity"));
  const intent = formData.get("intent");

  if (!quantity) {
    return errorState("수량은 1~10 사이의 정수로 입력해 주세요.", currentCount);
  }
  if (intent !== "cart" && intent !== "gift" && intent !== "buy") {
    return errorState("요청한 구매 방식을 확인하지 못했습니다.", currentCount);
  }

  const mutation = addCartItem(cart, quantity, intent === "gift");
  if (!mutation.ok) return errorState(mutation.error, currentCount);

  try {
    await repository.write(mutation.cart);
    refreshCartViews();
    const cartCount = getCartItemCount(mutation.cart);
    const actionLabel = intent === "gift" ? "선물용 상품" : "상품";
    return {
      status: "success",
      message: `${actionLabel} ${quantity}개를 장바구니에 담았습니다. 현재 총 ${cartCount}개입니다.`,
      cartCount,
      redirectTo: intent === "buy" ? "/checkout" : undefined,
    };
  } catch {
    return errorState(
      "장바구니를 저장하지 못했습니다. 다시 시도해 주세요.",
      currentCount,
    );
  }
}

export async function updateCartItemAction(
  _previousState: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const repository = createDemoCartRepository();
  const cart = await repository.read();
  const currentCount = getCartItemCount(cart);
  const lineId = parseLineId(formData.get("lineId"));
  const quantity = parseQuantity(formData.get("quantity"));

  if (!lineId || !quantity) {
    return errorState(
      "상품과 1~10 사이의 정수 수량을 확인해 주세요.",
      currentCount,
    );
  }

  const mutation = updateCartItem(cart, lineId, quantity);
  if (!mutation.ok) return errorState(mutation.error, currentCount);

  try {
    await repository.write(mutation.cart);
    refreshCartViews();
    const cartCount = getCartItemCount(mutation.cart);
    return {
      status: "success",
      message: `수량을 ${quantity}개로 변경했습니다. 장바구니에는 총 ${cartCount}개가 있습니다.`,
      cartCount,
    };
  } catch {
    return errorState(
      "수량을 저장하지 못했습니다. 다시 시도해 주세요.",
      currentCount,
    );
  }
}

export async function removeCartItemAction(
  _previousState: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const repository = createDemoCartRepository();
  const cart = await repository.read();
  const currentCount = getCartItemCount(cart);
  const lineId = parseLineId(formData.get("lineId"));
  if (!lineId || !cart.items.some((item) => item.lineId === lineId)) {
    return errorState("삭제할 상품을 찾지 못했습니다.", currentCount);
  }

  try {
    const nextCart = removeCartItem(cart, lineId);
    await repository.write(nextCart);
    refreshCartViews();
    const cartCount = getCartItemCount(nextCart);
    return {
      status: "success",
      message: `상품을 삭제했습니다. 장바구니에는 총 ${cartCount}개가 있습니다.`,
      cartCount,
    };
  } catch {
    return errorState(
      "상품을 삭제하지 못했습니다. 다시 시도해 주세요.",
      currentCount,
    );
  }
}
