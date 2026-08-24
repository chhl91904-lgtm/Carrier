import type { Metadata } from "next";
import Link from "next/link";
import { randomUUID } from "node:crypto";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { readDemoSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "일반 제품 후기와 체험 개선 의견을 구분해 제출하는 CANE MATE 데모 피드백",
};
export default async function ExperienceFeedbackPage() {
  const session = await readDemoSession();
  return (
    <main className="feedback-page" id="main-content">
      <Container size="wide">
        <header className="feedback-heading">
          <p>EXPERIENCE · FEEDBACK</p>
          <h1>
            당신의 경험이
            <br />
            다음 CANE MATE를 만듭니다.
          </h1>
          <p>
            일반 제품 후기와 체험존 개선 의견은 목적과 저장 모델이 다릅니다.
            아래에서 유형을 확인해 제출해 주세요.
          </p>
        </header>
        {!session ? (
          <section
            className="feedback-login"
            aria-labelledby="feedback-login-title"
          >
            <p>LOGIN REQUIRED · DEMO</p>
            <h2 id="feedback-login-title">
              피드백과 쿠폰을 데모 회원 내역에 연결합니다.
            </h2>
            <p>
              로그인 후 이 페이지로 돌아옵니다. 실제 계정이나 개인정보는
              저장하지 않으며 체험 피드백을 제출하면 5% 데모 쿠폰 발급 여부를
              확인할 수 있습니다.
            </p>
            <ButtonLink href="/login?returnTo=%2Fexperience%2Ffeedback">
              데모 로그인 후 계속
            </ButtonLink>
          </section>
        ) : (
          <div className="feedback-type-grid">
            <section
              className="feedback-type-card"
              aria-labelledby="review-title"
            >
              <span>TYPE A · PRODUCT REVIEW</span>
              <h2 id="review-title">일반 제품 후기</h2>
              <p>
                별점, 후기와 선택 사진을 확인합니다. 체험 피드백 쿠폰은 발급하지
                않습니다.
              </p>
              <FeedbackForm
                type="product-review"
                submissionToken={randomUUID()}
              />
            </section>
            <section
              className="feedback-type-card"
              aria-labelledby="experience-feedback-title"
            >
              <span>TYPE B · EXPERIENCE IMPROVEMENT</span>
              <h2 id="experience-feedback-title">체험 개선 의견</h2>
              <p>
                무게·그립감·햅틱·버튼·만족도와 개선 의견을 남깁니다. 회원당 데모
                체험 쿠폰은 한 번만 발급합니다.
              </p>
              <FeedbackForm
                type="experience-feedback"
                submissionToken={randomUUID()}
              />
            </section>
          </div>
        )}
        <p className="feedback-policy-note">
          제출 내역은 <Link href="/mypage/reviews">MY PAGE의 후기·피드백</Link>
          에서 유형별로 확인할 수 있습니다.
        </p>
      </Container>
    </main>
  );
}
