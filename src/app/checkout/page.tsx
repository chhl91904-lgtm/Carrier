import type { Metadata } from "next";
import Link from "next/link";
import { randomUUID } from "node:crypto";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { readDemoSession } from "@/lib/auth/session";
import { readDemoCart } from "@/lib/cart/repository";
import { createDemoCouponRepository } from "@/lib/coupon/repository";

export const metadata: Metadata = {
  title: "Demo Checkout",
  description:
    "실제 개인정보와 결제정보를 수집하지 않는 CANE MATE 프로젝트용 데모 주문 화면",
};

export default async function CheckoutPage() {
  const [cart, session] = await Promise.all([
    readDemoCart(),
    readDemoSession(),
  ]);
  const coupons = session ? await createDemoCouponRepository().read() : [];
  return (
    <main className="checkout-page" id="main-content">
      <Container size="wide">
        <header className="checkout-heading">
          <p>DEMO CHECKOUT · NO PAYMENT</p>
          <h1 id="checkout-title">주문 정보 확인</h1>
          <p>
            상품과 쿠폰, 예시 배송 정보를 확인해 데모 주문 결과를 만듭니다. 실제
            결제·배송·개인정보 저장은 이루어지지 않습니다.
          </p>
        </header>
        {!cart.items.length ? (
          <section
            className="checkout-empty"
            aria-labelledby="checkout-empty-title"
          >
            <span aria-hidden="true">0</span>
            <h2 id="checkout-empty-title">checkout할 상품이 없습니다.</h2>
            <p>BUY에서 CANE MATE를 장바구니에 담은 뒤 다시 진행해 주세요.</p>
            <ButtonLink href="/buy">BUY로 이동</ButtonLink>
          </section>
        ) : (
          <CheckoutForm
            cart={cart}
            coupons={coupons}
            checkoutToken={randomUUID()}
            isAuthenticated={Boolean(session)}
          />
        )}
        <Link className="checkout-back-link" href="/cart">
          장바구니로 돌아가기
        </Link>
      </Container>
    </main>
  );
}
