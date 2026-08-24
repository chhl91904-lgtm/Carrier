import type { Metadata } from "next";
import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";
import { Container } from "@/components/ui/layout";
import { requireDemoSession } from "@/lib/auth/session";
import { createDemoOrderRepository } from "@/lib/checkout/repository";
import { createDemoCouponRepository } from "@/lib/coupon/repository";
import { createDemoFeedbackRepository } from "@/lib/feedback/repository";
import { createDemoInquiryRepository } from "@/lib/inquiry/repository";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "CANE MATE 데모 회원 활동을 확인하는 보호된 화면입니다.",
};

const myPageLinks = [
  { href: "/mypage/orders", label: "주문 내역", description: "데모 주문 확인" },
  { href: "/mypage/coupons", label: "쿠폰함", description: "쿠폰 상태 확인" },
  {
    href: "/mypage/reviews",
    label: "후기·피드백",
    description: "작성 활동 확인",
  },
  {
    href: "/mypage/inquiries",
    label: "문의·A/S",
    description: "접수 상태 확인",
  },
] as const;

export default async function MyPage() {
  const session = await requireDemoSession("/mypage");
  const [order, coupons, feedback, inquiries] = await Promise.all([
    createDemoOrderRepository().read(),
    createDemoCouponRepository().read(),
    createDemoFeedbackRepository().read(),
    createDemoInquiryRepository().read(),
  ]);

  return (
    <main className="mypage" id="main-content">
      <Container>
        <div className="mypage-heading">
          <p className="auth-eyebrow">MY PAGE · DEMO SESSION</p>
          <h1>나의 CANE MATE</h1>
          <p>
            {session.displayName}으로 로그인되어 있습니다. 이 세션은 실제 회원
            계정이나 개인정보를 포함하지 않습니다.
          </p>
        </div>

        <section
          className="mypage-session-card"
          aria-labelledby="session-title"
        >
          <div>
            <p>SESSION STATUS</p>
            <h2 id="session-title">데모 로그인 상태</h2>
          </div>
          <dl>
            <div>
              <dt>표시 이름</dt>
              <dd>{session.displayName}</dd>
            </div>
            <div>
              <dt>데이터 저장</dt>
              <dd>개인정보 저장 안 함</dd>
            </div>
            <div>
              <dt>세션 방식</dt>
              <dd>서명된 HttpOnly 쿠키</dd>
            </div>
          </dl>
          <LogoutButton />
        </section>

        <section className="mypage-summary" aria-labelledby="activity-title">
          <h2 id="activity-title">데모 활동 요약</h2>
          <dl>
            <div>
              <dt>주문</dt>
              <dd>
                {order ? 1 : 0}
                <span>건</span>
              </dd>
            </div>
            <div>
              <dt>사용 가능 쿠폰</dt>
              <dd>
                {
                  coupons.filter((coupon) => coupon.status === "available")
                    .length
                }
                <span>장</span>
              </dd>
            </div>
            <div>
              <dt>후기·피드백</dt>
              <dd>
                {feedback.records.length}
                <span>건</span>
              </dd>
            </div>
            <div>
              <dt>문의·A/S</dt>
              <dd>
                {
                  inquiries.records.filter(
                    (record) => record.owner === "member",
                  ).length
                }
                <span>건</span>
              </dd>
            </div>
          </dl>
        </section>

        <nav className="mypage-nav" aria-label="마이페이지 메뉴">
          <ul>
            {myPageLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span>{item.label}</span>
                  <small>{item.description}</small>
                  <i aria-hidden="true">→</i>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="mypage-security-note">
          <strong>실제 운영 시 보안 기준</strong>
          <p>
            운영 환경에서는 검증된 인증 제공자, 강력한 서버 비밀키, 안전한 세션
            만료·재발급, 비밀번호 해시, 본인 데이터 권한 검사를 적용해야 합니다.
          </p>
        </aside>
      </Container>
    </main>
  );
}
