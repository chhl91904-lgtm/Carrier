import { inquiryTypeOptions } from "@/config/support-content";
import type {
  DemoInquiryHistory,
  DemoInquiryRecord,
  InquiryFieldErrors,
  InquiryType,
} from "@/lib/inquiry/types";

const types = new Set<string>(inquiryTypeOptions.map((item) => item.value));
const text = (data: FormData, name: string) =>
  data.get(name)?.toString().trim() ?? "";

export function validateInquiry(data: FormData): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};
  const name = text(data, "name");
  const email = text(data, "email");
  const phone = text(data, "phone");
  const type = text(data, "type");
  const title = text(data, "title");
  const body = text(data, "body");
  if (name.length < 2 || name.length > 40)
    errors.name = "이름을 2~40자로 입력해 주세요.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120)
    errors.email = "올바른 이메일 형식으로 입력해 주세요.";
  if (!/^[0-9+()\-\s]{8,20}$/.test(phone))
    errors.phone = "연락처를 숫자와 하이픈을 포함해 8~20자로 입력해 주세요.";
  if (!types.has(type)) errors.type = "문의 유형을 선택해 주세요.";
  if (title.length < 4 || title.length > 80)
    errors.title = "제목을 4~80자로 입력해 주세요.";
  if (body.length < 10 || body.length > 1000)
    errors.body = "문의 내용을 10~1,000자로 입력해 주세요.";
  return errors;
}

export function createInquiryRecord(
  data: FormData,
  token: string,
  owner: DemoInquiryRecord["owner"],
): DemoInquiryRecord {
  return {
    id: crypto.randomUUID(),
    submissionToken: token,
    type: text(data, "type") as InquiryType,
    status: "데모 접수 완료",
    owner,
    textStatus: "개인정보·문의 원문 미저장",
    createdAt: new Date().toISOString(),
  };
}

export function normalizeInquiryHistory(value: unknown): DemoInquiryHistory {
  if (
    !value ||
    typeof value !== "object" ||
    !("records" in value) ||
    !Array.isArray(value.records)
  )
    return { records: [] };
  const records = value.records.filter(
    (record): record is DemoInquiryRecord => {
      if (!record || typeof record !== "object") return false;
      const item = record as Partial<DemoInquiryRecord>;
      return (
        typeof item.id === "string" &&
        typeof item.submissionToken === "string" &&
        typeof item.type === "string" &&
        types.has(item.type) &&
        (item.owner === "member" || item.owner === "guest") &&
        item.status === "데모 접수 완료" &&
        item.textStatus === "개인정보·문의 원문 미저장" &&
        typeof item.createdAt === "string"
      );
    },
  );
  return { records: records.slice(-10) };
}
