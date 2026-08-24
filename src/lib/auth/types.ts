export type AuthFieldErrors = Partial<
  Record<"name" | "email" | "password" | "phone" | "terms", string>
>;

export type AuthFormState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: AuthFieldErrors;
  redirectTo?: string;
};

export const initialAuthFormState: AuthFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export type DemoSession = {
  subject: "demo-user";
  displayName: "데모 회원";
  mode: "demo";
  expiresAt: number;
};
