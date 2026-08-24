import type { Metadata } from "next";

import { Container } from "@/components/ui/layout";
import { requireDemoSession } from "@/lib/auth/session";
import { createDemoCouponRepository } from "@/lib/coupon/repository";
import { couponStatusLabels } from "@/lib/coupon/types";

export const metadata: Metadata = { title: "쿠폰함" };

export default async function MyCouponsPage() {
  await requireDemoSession("/mypage/coupons");
  const coupons = await createDemoCouponRepository().read();
  return (
    <main className="coupon-wallet-page" id="main-content">
      <Container>
        <header className="coupon-wallet-heading">
          <p>MY PAGE · COUPONS</p>
          <h1>쿠폰함</h1>
          <p>
            사용 가능·사용 완료·기간 만료 상태를 구분합니다. 체험 피드백으로
            발급된 5% 데모 쿠폰은 checkout의 같은 계산 규칙과 연결됩니다.
          </p>
        </header>
        <ul className="coupon-wallet-list">
          {coupons.map((coupon) => (
            <li key={coupon.id} data-status={coupon.status}>
              <div>
                <span>DEMO · 5% OFF</span>
                <h2>{coupon.name}</h2>
                <p>기능 검증용 샘플 · 운영 만료 기간과 최대 할인 정책은 미정</p>
              </div>
              <strong>{couponStatusLabels[coupon.status]}</strong>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
