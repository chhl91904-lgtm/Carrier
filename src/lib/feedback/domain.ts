import type {
  DemoFeedbackRecord,
  FeedbackFieldErrors,
  FeedbackType,
} from "@/lib/feedback/types";

function value(formData: FormData, name: string) {
  const entry = formData.get(name);
  return typeof entry === "string" ? entry.trim() : "";
}
function score(formData: FormData, name: string) {
  const parsed = Number(value(formData, name));
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 5 ? parsed : null;
}
export function validateFeedback(
  formData: FormData,
  type: FeedbackType,
): FeedbackFieldErrors {
  const errors: FeedbackFieldErrors = {};
  if (type === "product-review") {
    if (!score(formData, "rating"))
      errors.rating = "별점을 1점에서 5점 사이로 선택해 주세요.";
    const body = value(formData, "body");
    if (body.length < 10 || body.length > 500)
      errors.body = "후기는 10자 이상 500자 이내로 입력해 주세요.";
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > 0) {
      if (photo.size > 2 * 1024 * 1024)
        errors.photo = "데모 사진은 2MB 이하만 확인할 수 있습니다.";
      else if (
        !new Set(["image/jpeg", "image/png", "image/webp"]).has(photo.type)
      )
        errors.photo = "JPG, PNG, WEBP 형식만 선택해 주세요.";
    }
  } else {
    for (const field of [
      "weight",
      "grip",
      "hapticRecognition",
      "buttonUsability",
      "satisfaction",
    ] as const)
      if (!score(formData, field))
        errors[field] = "1점에서 5점 사이로 선택해 주세요.";
    const improvement = value(formData, "improvement");
    if (improvement.length < 10 || improvement.length > 500)
      errors.improvement = "개선 의견은 10자 이상 500자 이내로 입력해 주세요.";
  }
  return errors;
}
export function createFeedbackId(token: string) {
  return `FB-DEMO-${token
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 10)
    .toUpperCase()}`;
}
export function createFeedbackRecord(
  formData: FormData,
  type: FeedbackType,
  token: string,
): DemoFeedbackRecord {
  const photo = formData.get("photo");
  const base = {
    id: createFeedbackId(token),
    submissionToken: token,
    type,
    textStatus: "원문 미저장 · 데모 제출 완료" as const,
    createdAt: new Date().toISOString(),
  };
  if (type === "product-review")
    return {
      ...base,
      rating: score(formData, "rating")!,
      photoStatus:
        photo instanceof File && photo.size > 0
          ? "검증 후 폐기 · 저장되지 않음"
          : undefined,
    };
  return {
    ...base,
    evaluation: {
      weight: score(formData, "weight")!,
      grip: score(formData, "grip")!,
      hapticRecognition: score(formData, "hapticRecognition")!,
      buttonUsability: score(formData, "buttonUsability")!,
      satisfaction: score(formData, "satisfaction")!,
    },
  };
}
export function normalizeFeedbackHistory(value: unknown): {
  records: DemoFeedbackRecord[];
} {
  if (
    !value ||
    typeof value !== "object" ||
    !("records" in value) ||
    !Array.isArray((value as { records?: unknown }).records)
  )
    return { records: [] };
  const records = (value as { records: unknown[] }).records
    .filter((item): item is DemoFeedbackRecord =>
      Boolean(
        item &&
        typeof item === "object" &&
        "id" in item &&
        "submissionToken" in item &&
        "type" in item &&
        ((item as DemoFeedbackRecord).type === "product-review" ||
          (item as DemoFeedbackRecord).type === "experience-feedback"),
      ),
    )
    .slice(-10);
  return { records };
}
