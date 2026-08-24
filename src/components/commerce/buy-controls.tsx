"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { addToCartAction } from "@/app/cart-actions";
import { demoCartPolicy } from "@/config/commerce";
import { initialCartActionState } from "@/lib/cart/types";

export function BuyControls() {
  const [quantity, setQuantity] = useState("1");
  const [state, formAction] = useActionState(
    addToCartAction,
    initialCartActionState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") router.refresh();
    if (state.status === "success" && state.redirectTo) {
      const timer = window.setTimeout(
        () => router.push(state.redirectTo ?? "/checkout"),
        650,
      );
      return () => window.clearTimeout(timer);
    }
  }, [router, state]);

  return (
    <form className="buy-controls" action={formAction}>
      <div className="buy-quantity-field">
        <label htmlFor="buy-quantity">수량</label>
        <div>
          <QuantityButton
            label="수량 1개 줄이기"
            onClick={() =>
              setQuantity((current) =>
                String(
                  Math.max(
                    demoCartPolicy.minimumQuantity,
                    Number(current) - 1 || 1,
                  ),
                ),
              )
            }
          >
            −
          </QuantityButton>
          <input
            id="buy-quantity"
            name="quantity"
            type="number"
            inputMode="numeric"
            min={demoCartPolicy.minimumQuantity}
            max={demoCartPolicy.maximumTotalQuantity}
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            aria-describedby="buy-quantity-hint"
            required
          />
          <QuantityButton
            label="수량 1개 늘리기"
            onClick={() =>
              setQuantity((current) =>
                String(
                  Math.min(
                    demoCartPolicy.maximumTotalQuantity,
                    (Number(current) || 0) + 1,
                  ),
                ),
              )
            }
          >
            +
          </QuantityButton>
        </div>
        <p id="buy-quantity-hint">
          데모 장바구니 전체 수량은 최대 {demoCartPolicy.maximumTotalQuantity}
          개입니다.
        </p>
      </div>

      <div
        className="cart-action-status"
        data-status={state.status}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.status === "idle" ? "구매 방식을 선택해 주세요." : state.message}
      </div>

      <div className="buy-action-grid">
        <CartSubmitButton intent="gift">선물하기</CartSubmitButton>
        <CartSubmitButton intent="cart">장바구니 담기</CartSubmitButton>
        <CartSubmitButton intent="buy" primary>
          구매하기
        </CartSubmitButton>
      </div>
    </form>
  );
}

function QuantityButton({
  children,
  label,
  onClick,
}: {
  children: string;
  label: string;
  onClick: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={pending}
    >
      {children}
    </button>
  );
}

function CartSubmitButton({
  children,
  intent,
  primary = false,
}: {
  children: string;
  intent: "cart" | "gift" | "buy";
  primary?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name="intent"
      value={intent}
      data-primary={primary || undefined}
      disabled={pending}
      aria-busy={pending || undefined}
    >
      {pending ? "처리 중" : children}
    </button>
  );
}
