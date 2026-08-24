import type { AuthFieldErrors } from "@/lib/auth/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10,11}$/;

function textValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function validateLogin(formData: FormData): AuthFieldErrors {
  const errors: AuthFieldErrors = {};
  const email = textValue(formData, "email");
  const password = textValue(formData, "password");

  if (!email) errors.email = "이메일을 입력해 주세요.";
  else if (!emailPattern.test(email))
    errors.email = "이메일 형식을 확인해 주세요.";

  if (!password) errors.password = "비밀번호를 입력해 주세요.";
  return errors;
}

export function validateSignUp(formData: FormData): AuthFieldErrors {
  const errors = validateLogin(formData);
  const name = textValue(formData, "name");
  const phone = textValue(formData, "phone").replaceAll(/[^\d]/g, "");
  const password = textValue(formData, "password");

  if (name.length < 2) errors.name = "이름을 두 글자 이상 입력해 주세요.";
  if (!phonePattern.test(phone)) {
    errors.phone = "연락처는 숫자 10~11자리로 입력해 주세요.";
  }
  if (
    password &&
    (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
  ) {
    errors.password = "8자 이상이며 영문과 숫자를 포함해 주세요.";
  }
  if (formData.get("terms") !== "on") {
    errors.terms = "필수 약관 동의가 필요합니다.";
  }

  return errors;
}
