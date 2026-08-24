import type { Metadata } from "next";
import Link from "next/link";

import { CartLineActions } from "@/components/commerce/cart-line-actions";
import { ProductVisualPlaceholder } from "@/components/home/product-visual-placeholder";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { caneMateProduct, demoCartPolicy } from "@/config/commerce";
import { calculateCart, formatWon, getCartItemCount } from "@/lib/cart/domain";
import { readDemoCart } from "@/lib/cart/repository";

export const metadata: Metadata = {
  title: "장바구니",
  description: "CANE MATE 데모 장바구니의 상품, 수량과 합계를 확인합니다.",
};

export default async function CartPage() {
  const cart = await readDemoCart();
  const calculation = calculateCart(cart);
  const itemCount = getCartItemCount(cart);

  return (
    <main className="cart-page" id="main-content">
      <Container size="wide">
        <div className="cart-heading">
          <div>
            <p>CART · DEMO SESSION</p>
            <h1>장바구니</h1>
          </div>
          <p aria-live="polite">현재 총 수량 {itemCount}개</p>
        </div>

        {calculation.lines.length === 0 ? (
          <section className="cart-empty" aria-labelledby="empty-cart-title">
            <span aria-hidden="true">0</span>
            <h2 id="empty-cart-title">장바구니가 비어 있습니다.</h2>
            <p>
              CANE MATE 제품과 수량을 선택하면 이곳에서 가격과 합계를 확인할 수
              있습니다.
            </p>
            <ButtonLink href="/buy">BUY로 돌아가기</ButtonLink>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-labelledby="cart-items-title">
              <h2 id="cart-items-title" className="visually-hidden">
                장바구니 상품
              </h2>
              {calculation.lines.map((line) => (
                <article className="cart-line" key={line.lineId}>
                  <div className="cart-line-visual">
                    <ProductVisualPlaceholder compact idPrefix={line.lineId} />
                  </div>
                  <div className="cart-line-info">
                    <span className="cart-line-type">
                      {line.isGift ? "선물용" : "일반 구매"}
                    </span>
                    <h3>{caneMateProduct.name}</h3>
                    <p>단가 {formatWon(line.unitPrice)}</p>
                    <CartLineActions
                      lineId={line.lineId}
                      quantity={line.quantity}
                    />
                  </div>
                  <p className="cart-line-total">
                    <span>상품 금액</span>
                    <strong>{formatWon(line.lineTotal)}</strong>
                  </p>
                </article>
              ))}
            </section>

            <aside
              className="cart-summary"
              aria-labelledby="cart-summary-title"
            >
              <p>ORDER SUMMARY</p>
              <h2 id="cart-summary-title">금액 확인</h2>
              <dl>
                <div>
                  <dt>상품 소계</dt>
                  <dd>{formatWon(calculation.subtotal)}</dd>
                </div>
                <div>
                  <dt>적용 쿠폰</dt>
                  <dd>Checkout에서 선택</dd>
                </div>
                <div>
                  <dt>쿠폰 할인</dt>
                  <dd>− {formatWon(calculation.discount)}</dd>
                </div>
                <div className="cart-summary-total">
                  <dt>총 금액</dt>
                  <dd>{formatWon(calculation.total)}</dd>
                </div>
              </dl>
              <ButtonLink href="/checkout">Demo Checkout으로</ButtonLink>
              <Link href="/buy" className="cart-continue-link">
                쇼핑 계속하기
              </Link>
              <p className="cart-summary-notice">
                실제 결제가 진행되지 않습니다. 쿠폰은 Demo Checkout에서 적용하고
                배송 정보는 저장하지 않습니다.
              </p>
            </aside>
          </div>
        )}

        <p className="cart-policy-note">
          데모 수량은 장바구니 전체 최대 {demoCartPolicy.maximumTotalQuantity}
          개이며, 가격은 저장된 값이 아닌 서버의 단일 상품 설정으로 매번 다시
          계산합니다.
        </p>
      </Container>
    </main>
  );
}
