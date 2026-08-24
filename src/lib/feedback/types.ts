export type FeedbackType = "product-review" | "experience-feedback";
export type FeedbackFieldErrors = Partial<
  Record<
    | "rating"
    | "body"
    | "photo"
    | "weight"
    | "grip"
    | "hapticRecognition"
    | "buttonUsability"
    | "satisfaction"
    | "improvement",
    string
  >
>;
export type FeedbackActionState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: FeedbackFieldErrors;
  couponIssued?: boolean;
};
export const initialFeedbackActionState: FeedbackActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
export type DemoFeedbackRecord = {
  id: string;
  submissionToken: string;
  type: FeedbackType;
  rating?: number;
  evaluation?: {
    weight: number;
    grip: number;
    hapticRecognition: number;
    buttonUsability: number;
    satisfaction: number;
  };
  textStatus: "원문 미저장 · 데모 제출 완료";
  photoStatus?: "검증 후 폐기 · 저장되지 않음";
  couponIssuedId?: string;
  createdAt: string;
};
export type DemoFeedbackHistory = { records: DemoFeedbackRecord[] };
