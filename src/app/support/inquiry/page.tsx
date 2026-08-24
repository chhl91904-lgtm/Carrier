import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import { InquiryForm } from "@/components/support/inquiry-form";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "문의하기",
  description: "제품, 체험존, 앱 연결과 고객센터 데모 문의",
};
export default function InquiryPage() {
  return (
    <main className="support-form-page" id="main-content">
      <Container size="narrow">
        <header>
          <p>SUPPORT · INQUIRY</p>
          <h1>문의하기</h1>
          <p>
            제품, 체험존, 앱 연결·사용 또는 고객센터 문의 유형을 선택해 주세요.
            실제 담당자에게 전송되지 않는 데모입니다.
          </p>
        </header>
        <InquiryForm submissionToken={randomUUID()} />
      </Container>
    </main>
  );
}
