"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { removeCartItemAction, updateCartItemAction } from "@/app/cart-actions";
import { demoCartPolicy } from "@/config/commerce";
import { initialCartActionState, type CartLineId } from "@/lib/cart/types";

export function CartLineActions({
  lineId,
  quantity,
}: {
  lineId: CartLineId;
  quantity: number;
}) {
  const [updateState, updateAction] = useActionState(
    updateCartItemAction,
    initialCartActionState,
  );
  const [removeState, removeAction] = useActionState(
    removeCartItemAction,
    initialCartActionState,
  );
  const status = removeState.status !== "idle" ? removeState : updateState;

  return (
    <div className="cart-line-actions">
      <form action={updateAction} className="cart-quantity-form">
        <input type="hidden" name="lineId" value={lineId} />
        <label htmlFor={`${lineId}-quantity`}>수량</label>
        <input
          id={`${lineId}-quantity`}
          name="quantity"
          type="number"
          inputMode="numeric"
          min={demoCartPolicy.minimumQuantity}
          max={demoCartPolicy.maximumTotalQuantity}
          step="1"
          defaultValue={quantity}
          required
        />
        <LineSubmitButton>수량 변경</LineSubmitButton>
      </form>
      <form action={removeAction}>
        <input type="hidden" name="lineId" value={lineId} />
        <LineSubmitButton danger>삭제</LineSubmitButton>
      </form>
      <p
        className="cart-line-status"
        data-status={status.status}
        role="status"
        aria-live="polite"
      >
        {status.status === "idle" ? "" : status.message}
      </p>
    </div>
  );
}

function LineSubmitButton({
  children,
  danger = false,
}: {
  children: string;
  danger?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      data-danger={danger || undefined}
      disabled={pending}
      aria-busy={pending || undefined}
    >
      {pending ? "처리 중" : children}
    </button>
  );
}
