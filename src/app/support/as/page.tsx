import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import { InquiryForm } from "@/components/support/inquiry-form";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "제품 A/S 신청",
  description: "CANE MATE 제품 점검과 A/S 데모 접수",
};
export default function AfterServicePage() {
  return (
    <main className="support-form-page" id="main-content">
      <Container size="narrow">
        <header>
          <p>SUPPORT · A/S</p>
          <h1>제품 A/S 신청</h1>
          <p>
            제품 이상 증상과 점검 필요 사항을 데모로 접수합니다. 실제 접수 번호,
            택배 수거 또는 수리 절차가 생성되지 않습니다.
          </p>
        </header>
        <aside className="support-warning compact">
          <strong>안전 안내</strong>
          <p>
            이상 발열·파손·배터리 팽창이 의심되면 즉시 사용과 충전을 중단하세요.
            긴급 상황에서는 이 데모 양식이 아닌 지역 긴급 연락 수단을
            이용하세요.
          </p>
        </aside>
        <InquiryForm submissionToken={randomUUID()} fixedType="after-service" />
      </Container>
    </main>
  );
}
