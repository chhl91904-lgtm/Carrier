"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { createDemoOrderAction } from "@/app/checkout-actions";
import { Button } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/components/ui/form-controls";
import { calculateCart, formatWon } from "@/lib/cart/domain";
import type { DemoCart } from "@/lib/cart/types";
import { initialCheckoutActionState } from "@/lib/checkout/types";
import { calculateCouponDiscount } from "@/lib/coupon/domain";
import { couponStatusLabels, type DemoCoupon } from "@/lib/coupon/types";

type CheckoutFormProps = {
  cart: DemoCart;
  coupons: DemoCoupon[];
  checkoutToken: string;
  isAuthenticated: boolean;
};

export function CheckoutForm({
  cart,
  coupons,
  checkoutToken,
  isAuthenticated,
}: CheckoutFormProps) {
  const [state, formAction] = useActionState(
    createDemoOrderAction,
    initialCheckoutActionState,
  );
  const [selectedCouponId, setSelectedCouponId] = useState("");
  const [appliedCouponId, setAppliedCouponId] = useState("");
  const [couponMessage, setCouponMessage] = useState(
    isAuthenticated
      ? "사용 가능 쿠폰을 선택해 적용할 수 있습니다."
      : "쿠폰은 데모 로그인 후 사용할 수 있습니다.",
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const hasGift = cart.items.some((item) => item.isGift);
  const appliedCoupon = coupons.find(
    (coupon) => coupon.id === appliedCouponId && coupon.status === "available",
  );
  const baseCalculation = useMemo(() => calculateCart(cart), [cart]);
  const discount = calculateCouponDiscount(
    baseCalculation.subtotal,
    appliedCoupon,
  );
  const calculation = calculateCart(cart, discount);

  useEffect(() => {
    if (state.status === "error") {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );
      (firstInvalid ?? statusRef.current)?.focus();
      return;
    }
    if (state.status === "success" && state.redirectTo) {
      statusRef.current?.focus();
      const timer = window.setTimeout(() => {
        router.replace(state.redirectTo ?? "/checkout/demo-result");
        router.refresh();
      }, 650);
      return () => window.clearTimeout(timer);
    }
  }, [router, state]);

  function applyCoupon() {
    const coupon = coupons.find((item) => item.id === selectedCouponId);
    if (!coupon || coupon.status !== "available") {
      setCouponMessage("사용 가능 상태의 쿠폰을 선택해 주세요.");
      return;
    }
    setAppliedCouponId(coupon.id);
    setCouponMessage(
      `${coupon.name}을 적용했습니다. ${coupon.discountRate}%가 할인됩니다.`,
    );
  }

  function releaseCoupon() {
    setAppliedCouponId("");
    setSelectedCouponId("");
    setCouponMessage("쿠폰 적용을 해제했습니다.");
  }

  return (
    <form
      ref={formRef}
      className="checkout-form"
      action={formAction}
      noValidate
      aria-labelledby="checkout-title"
    >
      <input type="hidden" name="checkoutToken" value={checkoutToken} />
      <input type="hidden" name="couponId" value={appliedCouponId} />

      <div
        ref={statusRef}
        className="checkout-status"
        data-status={state.status}
        role={state.status === "error" ? "alert" : "status"}
        tabIndex={-1}
      >
        <strong>
          {state.status === "idle"
            ? "실제 개인정보를 입력하지 마세요."
            : state.status === "error"
              ? "확인이 필요합니다."
              : "데모 주문을 생성했습니다."}
        </strong>
        <p>
          {state.status === "idle"
            ? "모든 입력값은 형식 확인 후 폐기되며 주문 결과에 저장되지 않습니다. 이름·연락처·주소는 예시값만 입력해 주세요."
            : state.message}
        </p>
        {state.status === "error" && Object.keys(state.fieldErrors).length ? (
          <ul aria-label="checkout 입력 오류 요약">
            {Object.values(state.fieldErrors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <section
        className="checkout-section"
        aria-labelledby="checkout-items-title"
      >
        <span className="checkout-step">01</span>
        <div>
          <h2 id="checkout-items-title">상품과 수량</h2>
          <ul className="checkout-item-list">
            {calculation.lines.map((line) => (
              <li key={line.lineId}>
                <span>
                  {line.isGift ? "선물용" : "일반 구매"} · CANE MATE ×{" "}
                  {line.quantity}
                </span>
                <strong>{formatWon(line.lineTotal)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="checkout-section"
        aria-labelledby="checkout-coupon-title"
      >
        <span className="checkout-step">02</span>
        <div>
          <h2 id="checkout-coupon-title">쿠폰</h2>
          {isAuthenticated ? (
            <fieldset
              className="coupon-fieldset"
              aria-describedby="coupon-live"
            >
              <legend className="visually-hidden">적용할 쿠폰 선택</legend>
              {coupons.map((coupon) => (
                <label
                  key={coupon.id}
                  className="coupon-option"
                  data-status={coupon.status}
                >
                  <input
                    type="radio"
                    name="couponSelection"
                    value={coupon.id}
                    checked={selectedCouponId === coupon.id}
                    onChange={() => setSelectedCouponId(coupon.id)}
                    disabled={coupon.status !== "available"}
                  />
                  <span>
                    <strong>{coupon.name}</strong>
                    <small>기능 검증용 샘플 · 운영 만료 정책 미정</small>
                  </span>
                  <em>{couponStatusLabels[coupon.status]}</em>
                </label>
              ))}
              <div className="coupon-actions">
                <Button type="button" variant="secondary" onClick={applyCoupon}>
                  쿠폰 적용
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={releaseCoupon}
                  disabled={!appliedCouponId}
                >
                  적용 해제
                </Button>
              </div>
            </fieldset>
          ) : (
            <p className="coupon-login-note">
              회원 쿠폰을 사용하려면{" "}
              <Link href="/login?returnTo=%2Fcheckout">데모 로그인</Link>해
              주세요.
            </p>
          )}
          <p id="coupon-live" className="coupon-live" aria-live="polite">
            {couponMessage}
          </p>
          {state.fieldErrors.coupon ? (
            <p className="ui-field-error" role="alert">
              오류: {state.fieldErrors.coupon}
            </p>
          ) : null}
        </div>
      </section>

      {hasGift ? (
        <section className="checkout-section" aria-labelledby="gift-title">
          <span className="checkout-step">03</span>
          <fieldset className="checkout-fieldset">
            <legend id="gift-title">선물 정보</legend>
            <p>
              선물용 상품에만 필요한 예시 정보입니다. 실제 받는 분의 정보를
              입력하지 마세요.
            </p>
            <div className="checkout-fields">
              <TextField
                id="recipientName"
                name="recipientName"
                label="선물 받는 분 표시 이름"
                required
                placeholder="예: 데모 받는 분"
                error={state.fieldErrors.recipientName}
              />
              <TextField
                id="recipientContact"
                name="recipientContact"
                label="선물용 데모 연락처"
                required
                placeholder="예: 010-0000-0000"
                error={state.fieldErrors.recipientContact}
              />
              <TextField
                id="giftAddress"
                name="giftAddress"
                label="선물용 데모 배송지"
                required
                placeholder="예: 데모시 예시로 00"
                error={state.fieldErrors.giftAddress}
              />
              <TextAreaField
                id="giftMessage"
                name="giftMessage"
                label="선물 메시지"
                maxLength={200}
                placeholder="실제 개인정보 없이 200자 이내"
                error={state.fieldErrors.giftMessage}
              />
            </div>
          </fieldset>
        </section>
      ) : null}

      <section className="checkout-section" aria-labelledby="shipping-title">
        <span className="checkout-step">{hasGift ? "04" : "03"}</span>
        <fieldset className="checkout-fieldset">
          <legend id="shipping-title">배송지</legend>
          <p>형식 확인용 예시값만 입력하며 제출 후 저장하지 않습니다.</p>
          <div className="checkout-fields">
            <TextField
              id="shippingName"
              name="shippingName"
              label="받는 분 표시 이름"
              required
              placeholder="예: 데모 사용자"
              error={state.fieldErrors.shippingName}
            />
            <TextField
              id="shippingContact"
              name="shippingContact"
              label="데모 연락처"
              required
              placeholder="예: 010-0000-0000"
              error={state.fieldErrors.shippingContact}
            />
            <TextField
              id="postalCode"
              name="postalCode"
              label="데모 우편번호"
              required
              placeholder="예: 00000"
              error={state.fieldErrors.postalCode}
            />
            <TextField
              id="address"
              name="address"
              label="데모 배송지"
              required
              placeholder="예: 데모시 예시구"
              error={state.fieldErrors.address}
            />
            <TextField
              id="addressDetail"
              name="addressDetail"
              label="데모 상세 주소"
              required
              placeholder="예: 프로젝트용 00"
              error={state.fieldErrors.addressDetail}
            />
          </div>
        </fieldset>
      </section>

      <section className="checkout-section" aria-labelledby="payment-title">
        <span className="checkout-step">{hasGift ? "05" : "04"}</span>
        <fieldset className="checkout-fieldset demo-payment">
          <legend id="payment-title">데모 결제수단</legend>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="demo"
              defaultChecked
            />
            <span>
              <strong>프로젝트용 데모 결제</strong>
              <small>카드번호·계좌정보를 입력하지 않습니다.</small>
            </span>
          </label>
          {state.fieldErrors.paymentMethod ? (
            <p className="ui-field-error" role="alert">
              오류: {state.fieldErrors.paymentMethod}
            </p>
          ) : null}
        </fieldset>
      </section>

      <section
        className="checkout-total"
        aria-labelledby="checkout-total-title"
      >
        <p>ORDER SUMMARY</p>
        <h2 id="checkout-total-title">최종 금액</h2>
        <dl aria-live="polite">
          <div>
            <dt>상품 소계</dt>
            <dd>{formatWon(calculation.subtotal)}</dd>
          </div>
          <div>
            <dt>쿠폰 할인</dt>
            <dd>− {formatWon(calculation.discount)}</dd>
          </div>
          <div>
            <dt>최종 금액</dt>
            <dd>{formatWon(calculation.total)}</dd>
          </div>
        </dl>
        <div className="checkout-demo-notice">
          <strong>
            실제 결제가 진행되지 않는 프로젝트용 Demo Checkout입니다.
          </strong>
          <p>버튼을 누르면 결제 완료가 아닌 데모 주문 결과만 생성됩니다.</p>
        </div>
        <SubmitOrderButton />
      </section>
    </form>
  );
}

function SubmitOrderButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="checkout-submit"
      type="submit"
      isLoading={pending}
      loadingLabel="데모 주문 생성 중"
    >
      데모 주문 생성하기
    </Button>
  );
}
