import type { Metadata } from "next";
import Link from "next/link";
import { inquiryTypeOptions } from "@/config/support-content";
import { Container } from "@/components/ui/layout";
import { requireDemoSession } from "@/lib/auth/session";
import { createDemoInquiryRepository } from "@/lib/inquiry/repository";

export const metadata: Metadata = { title: "문의·A/S 내역" };
const typeLabels = Object.fromEntries(
  inquiryTypeOptions.map((item) => [item.value, item.label]),
);

export default async function MyInquiriesPage() {
  await requireDemoSession("/mypage/inquiries");
  const history = await createDemoInquiryRepository().read();
  const records = history.records
    .filter((record) => record.owner === "member")
    .reverse();
  return (
    <main className="mypage-detail" id="main-content">
      <Container>
        <header>
          <p>MY PAGE · INQUIRIES</p>
          <h1>문의·A/S 내역</h1>
          <p>
            현재 데모 회원으로 제출한 접수 유형과 처리 상태만 표시합니다.
            개인정보와 문의 원문은 저장하지 않습니다.
          </p>
        </header>
        {records.length ? (
          <ul className="mypage-record-list">
            {records.map((record) => (
              <li key={record.id}>
                <div>
                  <span>{typeLabels[record.type]}</span>
                  <h2>{record.status}</h2>
                  <p>{record.textStatus}</p>
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
            aria-labelledby="empty-inquiries-title"
          >
            <p>EMPTY · DEMO</p>
            <h2 id="empty-inquiries-title">회원으로 접수한 문의가 없습니다.</h2>
            <p>
              비회원으로 접수한 데모 문의는 로그인 후에도 회원 내역에 노출되지
              않습니다.
            </p>
            <Link href="/support/inquiry">새 문의 데모 접수 →</Link>
          </section>
        )}
      </Container>
    </main>
  );
}
