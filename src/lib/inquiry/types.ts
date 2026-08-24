export type InquiryType =
  "product" | "experience" | "app" | "customer" | "after-service";
export type InquiryFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "type" | "title" | "body", string>
>;
export type InquiryActionState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: InquiryFieldErrors;
};
export const initialInquiryActionState: InquiryActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
export type DemoInquiryRecord = {
  id: string;
  submissionToken: string;
  type: InquiryType;
  status: "데모 접수 완료";
  owner: "member" | "guest";
  textStatus: "개인정보·문의 원문 미저장";
  createdAt: string;
};
export type DemoInquiryHistory = { records: DemoInquiryRecord[] };
