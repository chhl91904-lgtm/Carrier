"use client";

import { useFormStatus } from "react-dom";

import { logoutAction } from "@/app/auth-actions";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form
      action={logoutAction}
      className={compact ? "logout-form compact" : "logout-form"}
    >
      <LogoutSubmit compact={compact} />
    </form>
  );
}

function LogoutSubmit({ compact }: { compact: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={compact ? "header-logout-button" : "mypage-logout-button"}
      disabled={pending}
      aria-busy={pending || undefined}
    >
      {pending ? "로그아웃 중" : "로그아웃"}
    </button>
  );
}
