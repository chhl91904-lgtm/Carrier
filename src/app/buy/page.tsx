import type { Metadata } from "next";

import { BuyControls } from "@/components/commerce/buy-controls";
import { ProductVisualPlaceholder } from "@/components/home/product-visual-placeholder";
import { Container } from "@/components/ui/layout";
import { caneMateProduct } from "@/config/commerce";
import { formatWon } from "@/lib/cart/domain";

export const metadata: Metadata = {
  title: "CANE MATE 구매",
  description: "CANE MATE 기획 제품을 데모 장바구니에 담는 구매 화면입니다.",
};

export default function BuyPage() {
  return (
    <main className="buy-page" id="main-content">
      <Container size="wide">
        <div className="buy-heading">
          <p>BUY · DEMO COMMERCE</p>
          <h1>필요한 이동을 위한 선택.</h1>
          <span>실제 결제 없이 구매 흐름을 확인하는 프로젝트 데모입니다.</span>
        </div>

        <div className="buy-product-layout">
          <div className="buy-product-visual">
            <ProductVisualPlaceholder compact idPrefix="buy-cane" />
          </div>
          <section
            className="buy-product-info"
            aria-labelledby="buy-product-title"
          >
            <p className="buy-product-status">{caneMateProduct.status}</p>
            <h2 id="buy-product-title">{caneMateProduct.name}</h2>
            <p className="buy-product-price">
              {formatWon(caneMateProduct.unitPrice)}
            </p>
            <p className="buy-product-spec-note">
              가격과 제품 사양은 현재 프로젝트의 기획 목표이며 확정된 상용 판매
              조건이 아닙니다.
            </p>
            <ul className="buy-feature-list">
              {caneMateProduct.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <BuyControls />
          </section>
        </div>

        <aside className="buy-demo-policy" aria-labelledby="buy-policy-title">
          <strong id="buy-policy-title">데모 장바구니 정책</strong>
          <p>
            상품 ID·수량·선물 여부만 서명된 브라우저 세션 쿠키에 보관합니다.
            개인정보와 결제정보는 저장하지 않으며 브라우저 세션 종료 시
            장바구니도 종료됩니다.
          </p>
        </aside>
      </Container>
    </main>
  );
}
