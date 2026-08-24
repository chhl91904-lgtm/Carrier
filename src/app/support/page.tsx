import type { Metadata } from "next";
import Link from "next/link";
import type { SVGProps } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "고객지원",
  description: "CANE MATE 사용 가이드, FAQ, 문의와 A/S 지원",
};
const supportLinks = [
  {
    href: "/support/guide",
    icon: "guide",
    title: "제품 사용 가이드",
    body: "제품 설정부터 충전까지 올바른 사용 방법을 확인하세요.",
    cta: "가이드 보기",
  },
  {
    href: "/support/faq",
    icon: "faq",
    title: "자주 묻는 질문",
    body: "제품 기능과 구매·체험에 관한 답변을 빠르게 확인하세요.",
    cta: "FAQ 보기",
  },
  {
    href: "/support/inquiry",
    icon: "inquiry",
    title: "문의하기",
    body: "제품과 서비스에 관한 궁금한 점을 문의하세요.",
    cta: "문의하기",
  },
  {
    href: "/support/as",
    icon: "service",
    title: "제품 A/S 신청",
    body: "점검이 필요한 제품의 A/S를 간편하게 신청하세요.",
    cta: "A/S 신청",
  },
] as const;

type SupportIconName = (typeof supportLinks)[number]["icon"];

function SupportServiceIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: SupportIconName }) {
  const paths = {
    guide: (
      <>
        <path d="M5 4.5h8.5A2.5 2.5 0 0 1 16 7v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5Z" />
        <path d="M16 7a2.5 2.5 0 0 1 2.5-2.5H20v15.2h-1.5A2.5 2.5 0 0 0 16 22.2V7ZM8.5 9h4M8.5 12.5h4" />
      </>
    ),
    faq: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 1 1-4.1-7.3" />
        <path d="M9.7 9a2.4 2.4 0 1 1 3.6 2.1c-.8.5-1.3 1-1.3 2M12 17h.01" />
      </>
    ),
    inquiry: (
      <>
        <path d="M4 5.5h16v12H8l-4 3v-15Z" />
        <path d="M8 10h8M8 13.5h5" />
      </>
    ),
    service: (
      <>
        <path d="M14.6 6.3a4.2 4.2 0 0 0-5.1 5.1L4 16.9 7.1 20l5.5-5.5a4.2 4.2 0 0 0 5.1-5.1l-2.5 2.5-3.1-3.1 2.5-2.5Z" />
        <path d="m5.5 17.5 1 1" />
      </>
    ),
  } satisfies Record<SupportIconName, React.ReactNode>;

  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export default function SupportPage() {
  return (
    <main className="support-page" id="main-content">
      <section className="support-hub" aria-labelledby="support-hub-title">
        <Container size="wide">
          <header className="support-hub-heading">
            <h1 id="support-hub-title">무엇을 도와드릴까요?</h1>
            <p>
              CANE MATE 사용부터 제품 문의까지 필요한 도움을 빠르게 확인하세요.
            </p>
          </header>
          <div className="support-service-grid">
            {supportLinks.map((item) => (
              <Link
                className="support-service-card"
                href={item.href}
                key={item.href}
              >
                <span className="support-service-icon">
                  <SupportServiceIcon name={item.icon} />
                </span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <strong>
                  {item.cta} <span aria-hidden="true">→</span>
                </strong>
              </Link>
            ))}
          </div>
          <aside
            className="support-contact-cta"
            aria-labelledby="support-contact-title"
          >
            <div>
              <h2 id="support-contact-title">도움이 더 필요하신가요?</h2>
              <p>현재 문의와 A/S는 실제 고객센터 전송이 없는 데모입니다.</p>
            </div>
            <ButtonLink href="/support/inquiry">고객센터 문의하기</ButtonLink>
          </aside>
        </Container>
      </section>
      <section className="support-safety">
        <Container size="wide">
          <p>SAFETY FIRST</p>
          <h2>보조 기술은 기본 탐색과 주변 확인을 대신하지 않습니다.</h2>
          <p>
            CANE MATE는 의료기기, 안내견의 완전한 대체품 또는 자율주행 지팡이가
            아닙니다. ToF와 IMU 알림은 모든 장애물이나 낙상을 100% 감지하지
            않으며 긴급 신고를 보장하지 않습니다.
          </p>
        </Container>
      </section>
    </main>
  );
}
