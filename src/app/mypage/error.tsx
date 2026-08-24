"use client";
import { Button } from "@/components/ui/button";

export default function MyPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mypage-detail" id="main-content">
      <div className="ui-container">
        <section className="mypage-empty" role="alert">
          <p>ERROR · MY PAGE</p>
          <h1>내역을 불러오지 못했습니다.</h1>
          <p>
            데모 쿠키 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          <Button onClick={reset}>다시 시도</Button>
        </section>
      </div>
    </main>
  );
}
