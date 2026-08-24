"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { loginAction, signUpAction } from "@/app/auth-actions";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/form-controls";
import { initialAuthFormState } from "@/lib/auth/types";

type AuthFormProps = {
  mode: "login" | "signup";
  returnTo: string;
};

export function AuthForm({ mode, returnTo }: AuthFormProps) {
  const action = mode === "login" ? loginAction : signUpAction;
  const [state, formAction] = useActionState(action, initialAuthFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "error") {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );
      (firstInvalid ?? statusRef.current)?.focus();
      return;
    }

    if (state.status === "success" && state.redirectTo) {
      statusRef.current?.focus();
      const redirectTimer = window.setTimeout(() => {
        router.replace(state.redirectTo ?? "/mypage");
        router.refresh();
      }, 700);
      return () => window.clearTimeout(redirectTimer);
    }
  }, [router, state]);

  const isSignUp = mode === "signup";

  return (
    <form
      ref={formRef}
      className="auth-form"
      action={formAction}
      noValidate
      aria-labelledby="auth-form-title"
    >
      <input type="hidden" name="returnTo" value={returnTo} />

      <div
        ref={statusRef}
        className="auth-form-status"
        data-status={state.status}
        role={state.status === "error" ? "alert" : "status"}
        tabIndex={-1}
      >
        {state.status === "idle" ? (
          <>
            <strong>개인정보를 저장하지 않는 데모입니다.</strong>
            <p>
              실제 비밀번호, 실명, 개인 연락처 등 민감한 정보를 입력하지 마세요.
              입력값은 형식 확인 후 즉시 폐기됩니다.
            </p>
          </>
        ) : (
          <>
            <strong>
              {state.status === "error"
                ? "확인이 필요합니다."
                : "처리되었습니다."}
            </strong>
            <p>{state.message}</p>
            {state.status === "error" &&
            Object.keys(state.fieldErrors).length ? (
              <ul aria-label="입력 오류 요약">
                {Object.values(state.fieldErrors).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>

      <div className="auth-fields">
        {isSignUp ? (
          <TextField
            id="name"
            name="name"
            label="이름"
            type="text"
            autoComplete="name"
            required
            hint="데모 형식 확인용입니다. 실제 이름을 입력하지 마세요."
            error={state.fieldErrors.name}
          />
        ) : null}

        <TextField
          id="email"
          name="email"
          label="이메일"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="demo@example.test"
          hint={
            isSignUp
              ? "실제 연락에 사용하거나 저장하지 않습니다."
              : "데모에서는 계정 조회 없이 이메일 형식만 확인합니다."
          }
          error={state.fieldErrors.email}
        />

        <TextField
          id="password"
          name="password"
          label="비밀번호"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          hint={
            isSignUp
              ? "데모 검증 기준: 8자 이상, 영문과 숫자 포함. 운영 정책이 아닙니다."
              : "비밀번호를 저장하거나 실제 계정과 비교하지 않습니다."
          }
          error={state.fieldErrors.password}
        />

        {isSignUp ? (
          <>
            <TextField
              id="phone"
              name="phone"
              label="연락처"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="010-0000-0000"
              hint="숫자 10~11자리 형식만 확인하고 저장하지 않습니다."
              error={state.fieldErrors.phone}
            />

            <div className="auth-terms-field">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                aria-invalid={state.fieldErrors.terms ? true : undefined}
                aria-describedby={
                  state.fieldErrors.terms
                    ? "terms-description terms-error"
                    : "terms-description"
                }
              />
              <div>
                <label htmlFor="terms">필수 약관 동의 (데모)</label>
                <p id="terms-description">
                  실제 약관 원문이 제공되기 전 사용하는 기능 확인용 동의입니다.
                </p>
                {state.fieldErrors.terms ? (
                  <p id="terms-error" className="ui-field-error" role="alert">
                    오류: {state.fieldErrors.terms}
                  </p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <SubmitButton mode={mode} />

      <p className="auth-switch-link">
        {isSignUp
          ? "이미 데모 세션이 필요한가요?"
          : "가입 화면도 확인할 수 있습니다."}{" "}
        <Link href={isSignUp ? "/login" : "/signup"}>
          {isSignUp ? "로그인" : "회원가입"}
        </Link>
      </p>
    </form>
  );
}

function SubmitButton({ mode }: { mode: AuthFormProps["mode"] }) {
  const { pending } = useFormStatus();
  const label = mode === "login" ? "데모 로그인" : "데모 가입 완료";

  return (
    <Button
      className="auth-submit"
      type="submit"
      isLoading={pending}
      loadingLabel="데모 세션 확인 중"
    >
      {label}
    </Button>
  );
}
