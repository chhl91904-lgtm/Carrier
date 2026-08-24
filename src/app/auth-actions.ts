"use server";

import { redirect } from "next/navigation";

import { normalizeReturnTo } from "@/lib/auth/return-to";
import { clearDemoSession, createDemoSession } from "@/lib/auth/session";
import type { AuthFormState } from "@/lib/auth/types";
import { validateLogin, validateSignUp } from "@/lib/auth/validation";

function errorState(
  message: string,
  fieldErrors: AuthFormState["fieldErrors"] = {},
): AuthFormState {
  return { status: "error", message, fieldErrors };
}

export async function loginAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const fieldErrors = validateLogin(formData);
  if (Object.keys(fieldErrors).length) {
    return errorState("입력한 내용을 확인해 주세요.", fieldErrors);
  }

  try {
    await createDemoSession();
    return {
      status: "success",
      message: "데모 로그인에 성공했습니다. 요청한 페이지로 이동합니다.",
      fieldErrors: {},
      redirectTo: normalizeReturnTo(formData.get("returnTo")?.toString()),
    };
  } catch {
    return errorState(
      "데모 세션을 만들지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
  }
}

export async function signUpAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const fieldErrors = validateSignUp(formData);
  if (Object.keys(fieldErrors).length) {
    return errorState("필수 입력과 동의 항목을 확인해 주세요.", fieldErrors);
  }

  try {
    await createDemoSession();
    return {
      status: "success",
      message:
        "데모 가입 흐름을 완료했습니다. 입력값은 저장하지 않았으며 마이페이지로 이동합니다.",
      fieldErrors: {},
      redirectTo: normalizeReturnTo(formData.get("returnTo")?.toString()),
    };
  } catch {
    return errorState(
      "데모 세션을 만들지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
  }
}

export async function logoutAction() {
  await clearDemoSession();
  redirect("/");
}
