import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { Container } from "@/components/ui/layout";
import { normalizeReturnTo } from "@/lib/auth/return-to";

export const metadata: Metadata = {
  title: "로그인",
  description: "개인정보를 저장하지 않는 CANE MATE 데모 로그인 화면입니다.",
};

type LoginPageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { returnTo } = await searchParams;
  const safeReturnTo = normalizeReturnTo(returnTo);

  return (
    <main className="auth-page" id="main-content">
      <Container>
        <div className="auth-layout">
          <section className="auth-intro" aria-labelledby="page-title">
            <p className="auth-eyebrow">ACCOUNT · DEMO MODE</p>
            <h1 id="page-title">로그인</h1>
            <p>
              회원 전용 화면과 인증 상태를 확인하기 위한 데모입니다. 실제 계정을
              조회하거나 비밀번호를 저장하지 않습니다.
            </p>
            <ul>
              <li>서버가 검증하는 서명된 HttpOnly 데모 세션</li>
              <li>브라우저를 닫으면 종료되는 세션 쿠키</li>
              <li>원래 요청한 내부 페이지로 안전하게 복귀</li>
            </ul>
          </section>
          <section className="auth-card" aria-labelledby="auth-form-title">
            <p className="auth-card-kicker">SIGN IN</p>
            <h2 id="auth-form-title">데모 세션 시작</h2>
            <AuthForm mode="login" returnTo={safeReturnTo} />
          </section>
        </div>
      </Container>
    </main>
  );
}
