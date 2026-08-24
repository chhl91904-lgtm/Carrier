import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { Container } from "@/components/ui/layout";
import { normalizeReturnTo } from "@/lib/auth/return-to";

export const metadata: Metadata = {
  title: "회원가입",
  description: "입력정보를 저장하지 않는 CANE MATE 데모 회원가입 화면입니다.",
};

type SignUpPageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { returnTo } = await searchParams;
  const safeReturnTo = normalizeReturnTo(returnTo);

  return (
    <main className="auth-page" id="main-content">
      <Container>
        <div className="auth-layout">
          <section className="auth-intro" aria-labelledby="page-title">
            <p className="auth-eyebrow">ACCOUNT · DEMO MODE</p>
            <h1 id="page-title">회원가입</h1>
            <p>
              이름, 이메일, 비밀번호, 연락처와 필수 동의가 있는 가입 흐름을
              검증합니다. 입력값은 데모 세션 생성 후 모두 폐기합니다.
            </p>
            <div className="auth-live-notice">
              <strong>운영 전환 시 필요한 항목</strong>
              <p>
                검증된 약관·개인정보 정책, 안전한 인증 제공자, 비밀번호 해시,
                계정 인증·재설정, 보존·삭제 정책이 별도로 필요합니다.
              </p>
            </div>
          </section>
          <section className="auth-card" aria-labelledby="auth-form-title">
            <p className="auth-card-kicker">SIGN UP</p>
            <h2 id="auth-form-title">데모 가입 흐름</h2>
            <AuthForm mode="signup" returnTo={safeReturnTo} />
          </section>
        </div>
      </Container>
    </main>
  );
}
