import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "고객지원",
  description: "CANE MATE 사용 가이드, FAQ, 문의와 A/S 지원",
};
const supportLinks = [
  {
    href: "/support/guide",
    number: "01",
    title: "제품 사용 가이드",
    body: "펼치기부터 센서·햅틱·음성 안내와 충전까지 안전한 사용 순서를 확인합니다.",
  },
  {
    href: "/support/faq",
    number: "02",
    title: "자주 묻는 질문",
    body: "제품 기능, 감지 한계, 위치 동의, 구매와 체험 관련 답변을 확인합니다.",
  },
  {
    href: "/support/inquiry",
    number: "03",
    title: "문의하기",
    body: "제품·체험존·앱 연결·사용·고객센터 문의를 데모로 접수합니다.",
  },
  {
    href: "/support/as",
    number: "04",
    title: "제품 A/S 신청",
    body: "제품 상태와 점검이 필요한 증상을 데모로 접수합니다.",
  },
] as const;
export default function SupportPage() {
  return (
    <main className="support-page" id="main-content">
      <section className="support-hero">
        <Container size="wide">
          <p>SUPPORT · CANE MATE</p>
          <h1>
            안전한 사용을 위한
            <br />
            정보와 지원.
          </h1>
          <p>
            제품의 가능성뿐 아니라 올바른 사용법과 감지 한계를 함께 안내합니다.
            현재 문의와 A/S는 실제 고객센터 전송이 없는 데모입니다.
          </p>
        </Container>
      </section>
      <section className="support-hub" aria-labelledby="support-hub-title">
        <Container size="wide">
          <h2 id="support-hub-title">무엇을 도와드릴까요?</h2>
          <div>
            {supportLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <strong>바로가기 →</strong>
              </Link>
            ))}
          </div>
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
