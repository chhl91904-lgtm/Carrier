import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { guideSteps } from "@/config/support-content";

export const metadata: Metadata = {
  title: "제품 사용 가이드",
  description: "CANE MATE의 안전한 사용 순서와 기능 한계",
};
export default function GuidePage() {
  return (
    <main className="support-detail" id="main-content">
      <Container size="wide">
        <header>
          <p>SUPPORT · GUIDE</p>
          <h1>제품 사용 가이드</h1>
          <p>
            기획 사양을 기준으로 한 데모 가이드입니다. 실제 출시 시 동봉
            설명서와 검증된 안전 지침을 우선합니다.
          </p>
        </header>
        <ol className="guide-steps">
          {guideSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside className="support-warning">
          <h2>사용 전 꼭 확인하세요</h2>
          <ul>
            <li>
              센서 알림만 믿지 말고 기본 흰지팡이 탐색과 주변 소리를 함께
              확인하세요.
            </li>
            <li>
              센서 창이 가려졌거나 비·눈·강한 빛 등 환경에서는 감지 성능이
              달라질 수 있습니다.
            </li>
            <li>
              낙상 의심 알림은 보호자 확인을 돕는 흐름이며 자동 신고나 구조를
              보장하지 않습니다.
            </li>
            <li>
              이상 발열, 손상, 배터리 팽창이 의심되면 사용과 충전을 중단하고
              지원에 문의하세요.
            </li>
          </ul>
          <Link href="/support/as">제품 A/S 데모 신청 →</Link>
        </aside>
      </Container>
    </main>
  );
}
