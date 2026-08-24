import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { formatWon } from "@/lib/cart/domain";
import { createDemoOrderRepository } from "@/lib/checkout/repository";

export const metadata: Metadata = {
  title: "데모 주문 결과",
  description: "실제 결제와 구분되는 CANE MATE 데모 주문 생성 결과",
};

export default async function DemoOrderResultPage() {
  const order = await createDemoOrderRepository().read();
  return (
    <main className="demo-result-page" id="main-content">
      <Container size="narrow">
        {order ? (
          <article className="demo-result-card">
            <span className="demo-result-mark" aria-hidden="true">
              DEMO
            </span>
            <p className="demo-result-eyebrow">ORDER CREATED · NO PAYMENT</p>
            <h1>데모 주문이 생성되었습니다.</h1>
            <p className="demo-result-lead">
              실제 결제, 배송 요청, 개인정보 저장은 발생하지 않았습니다. 이
              결과는 프로젝트 기능 확인용입니다.
            </p>
            <dl className="demo-result-summary">
              <div>
                <dt>데모 주문 번호</dt>
                <dd>{order.id}</dd>
              </div>
              <div>
                <dt>상품 소계</dt>
                <dd>{formatWon(order.subtotal)}</dd>
              </div>
              <div>
                <dt>쿠폰 할인</dt>
                <dd>− {formatWon(order.discount)}</dd>
              </div>
              <div>
                <dt>최종 표시 금액</dt>
                <dd>{formatWon(order.total)}</dd>
              </div>
              <div>
                <dt>결과 상태</dt>
                <dd>데모 주문 생성 · 결제되지 않음</dd>
              </div>
              <div>
                <dt>배송 정보</dt>
                <dd>{order.shippingSnapshot}</dd>
              </div>
            </dl>
            {order.coupon ? (
              <p className="demo-result-coupon">
                {order.coupon.name} ({order.coupon.discountRate}%)을 데모 사용
                완료 상태로 변경했습니다.
              </p>
            ) : null}
            <div className="demo-result-actions">
              <ButtonLink href="/buy">BUY로 돌아가기</ButtonLink>
              <ButtonLink href="/mypage/coupons" variant="secondary">
                쿠폰함 확인
              </ButtonLink>
            </div>
          </article>
        ) : (
          <section className="checkout-empty" aria-labelledby="no-result-title">
            <span aria-hidden="true">?</span>
            <h1 id="no-result-title">확인할 데모 주문이 없습니다.</h1>
            <p>
              장바구니에서 Demo Checkout을 진행하면 결과를 확인할 수 있습니다.
            </p>
            <ButtonLink href="/cart">장바구니로 이동</ButtonLink>
          </section>
        )}
        <Link className="checkout-back-link" href="/">
          홈으로 이동
        </Link>
      </Container>
    </main>
  );
}
