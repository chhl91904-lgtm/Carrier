import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { frequentlyAskedQuestions } from "@/config/support-content";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "CANE MATE 기능, 구매, 체험과 지원 FAQ",
};
export default function FaqPage() {
  return (
    <main className="support-detail" id="main-content">
      <Container size="wide">
        <header>
          <p>SUPPORT · FAQ</p>
          <h1>자주 묻는 질문</h1>
          <p>기능의 목적과 한계를 분명하게 확인할 수 있도록 답변했습니다.</p>
        </header>
        <div className="faq-list">
          {frequentlyAskedQuestions.map((item, index) => (
            <details key={item.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.question}
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="support-next">
          원하는 답변이 없나요?{" "}
          <Link href="/support/inquiry">
            문의 유형을 선택해 데모 접수하기 →
          </Link>
        </p>
      </Container>
    </main>
  );
}
