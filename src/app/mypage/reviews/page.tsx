import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { requireDemoSession } from "@/lib/auth/session";
import { createDemoFeedbackRepository } from "@/lib/feedback/repository";

export const metadata: Metadata = { title: "후기·피드백" };
export default async function MyReviewsPage() {
  await requireDemoSession("/mypage/reviews");
  const history = await createDemoFeedbackRepository().read();
  const records = [...history.records].reverse();
  return (
    <main className="mypage-detail" id="main-content">
      <Container>
        <header>
          <p>MY PAGE · REVIEWS</p>
          <h1>후기·피드백</h1>
          <p>
            일반 제품 후기와 체험 개선 의견을 유형별로 구분합니다. 서술 원문과
            사진 파일은 표시하거나 저장하지 않습니다.
          </p>
        </header>
        {records.length ? (
          <ul className="mypage-record-list">
            {records.map((record) => (
              <li key={record.id}>
                <div>
                  <span>
                    {record.type === "product-review"
                      ? "일반 제품 후기"
                      : "체험 개선 의견"}
                  </span>
                  <h2>
                    {record.type === "product-review"
                      ? `${record.rating}점 후기 · 데모 제출 완료`
                      : `종합 만족도 ${record.evaluation?.satisfaction}점 · 데모 제출 완료`}
                  </h2>
                  <p>
                    {record.textStatus}
                    {record.photoStatus ? ` · 사진 ${record.photoStatus}` : ""}
                    {record.couponIssuedId ? " · 5% 체험 쿠폰 연결" : ""}
                  </p>
                </div>
                <time dateTime={record.createdAt}>
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(record.createdAt))}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <section
            className="mypage-empty"
            aria-labelledby="empty-reviews-title"
          >
            <p>EMPTY · DEMO</p>
            <h2 id="empty-reviews-title">작성한 후기나 피드백이 없습니다.</h2>
            <p>
              두 제출 유형은 목적과 평가 항목이 다르며 회원 데모 내역에만
              연결됩니다.
            </p>
            <Link href="/experience/feedback">후기·체험 피드백 작성 →</Link>
          </section>
        )}
      </Container>
    </main>
  );
}
