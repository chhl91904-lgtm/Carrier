import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { loginAction } from "../src/app/auth-actions";
import { AuthForm } from "../src/components/auth/auth-form";
import { SiteHeader } from "../src/components/site-header";
import { normalizeReturnTo } from "../src/lib/auth/return-to";
import {
  createSessionToken,
  verifySessionToken,
} from "../src/lib/auth/session-token";
import { validateLogin, validateSignUp } from "../src/lib/auth/validation";

const { cookieSet } = vi.hoisted(() => ({ cookieSet: vi.fn() }));

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: vi.fn(), set: cookieSet }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/login",
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));

describe("demo authentication", () => {
  it("allows only known internal return destinations", () => {
    expect(normalizeReturnTo("/mypage/orders?filter=demo")).toBe(
      "/mypage/orders?filter=demo",
    );
    expect(normalizeReturnTo("https://example.com")).toBe("/mypage");
    expect(normalizeReturnTo("//example.com/path")).toBe("/mypage");
    expect(normalizeReturnTo("/unknown")).toBe("/mypage");
    expect(normalizeReturnTo("/login")).toBe("/mypage");
  });

  it("signs a non-sensitive demo session and rejects tampering", async () => {
    const token = await createSessionToken();
    const session = await verifySessionToken(token);

    expect(session).toMatchObject({
      subject: "demo-user",
      displayName: "데모 회원",
      mode: "demo",
    });
    expect(token).not.toContain("password");
    expect(token).not.toContain("email");
    expect(await verifySessionToken(`${token}tampered`)).toBeNull();
  });

  it("validates every required signup field without retaining its values", () => {
    const empty = new FormData();
    expect(validateSignUp(empty)).toEqual({
      email: "이메일을 입력해 주세요.",
      password: "비밀번호를 입력해 주세요.",
      name: "이름을 두 글자 이상 입력해 주세요.",
      phone: "연락처는 숫자 10~11자리로 입력해 주세요.",
      terms: "필수 약관 동의가 필요합니다.",
    });

    const valid = new FormData();
    valid.set("name", "테스트");
    valid.set("email", "demo@example.test");
    valid.set("password", "Example123");
    valid.set("phone", "010-0000-0000");
    valid.set("terms", "on");
    expect(validateSignUp(valid)).toEqual({});
    expect(validateLogin(valid)).toEqual({});
  });

  it("creates a signed cookie through the login server action", async () => {
    cookieSet.mockClear();
    const formData = new FormData();
    formData.set("email", "demo@example.test");
    formData.set("password", "NotStored123");
    formData.set("returnTo", "/mypage/orders");

    const result = await loginAction(
      { status: "idle", message: "", fieldErrors: {} },
      formData,
    );
    const [cookieName, token, options] = cookieSet.mock.calls.at(-1) ?? [];

    expect(result).toMatchObject({
      status: "success",
      redirectTo: "/mypage/orders",
    });
    expect(cookieName).toBe("cane_mate_demo_session");
    expect(options).toMatchObject({
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    expect(await verifySessionToken(token)).not.toBeNull();
    expect(token).not.toContain("NotStored123");
    expect(token).not.toContain("demo@example.test");
  });

  it("renders labeled, required demo fields and explicit privacy warnings", () => {
    const html = renderToStaticMarkup(
      <AuthForm mode="signup" returnTo="/mypage" />,
    );

    for (const field of ["name", "email", "password", "phone", "terms"]) {
      expect(html).toContain(`name="${field}"`);
    }
    expect(html).toContain('type="password"');
    expect(html).toContain("required");
    expect(html).toContain("실제 비밀번호, 실명, 개인 연락처");
    expect(html).toContain("입력값은 형식 확인 후 즉시 폐기됩니다");
    expect(html).not.toContain("localStorage");
  });

  it("synchronizes signed-in header state and exposes logout", () => {
    const html = renderToStaticMarkup(<SiteHeader isAuthenticated />);

    expect(html).toContain("MY PAGE");
    expect(html).toContain("로그인 상태");
    expect(html).toContain("로그아웃");
    expect(html).not.toContain(">LOGIN<");
  });
});
