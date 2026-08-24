"use server";
import { revalidatePath } from "next/cache";
import { readDemoSession } from "@/lib/auth/session";
import { createInquiryRecord, validateInquiry } from "@/lib/inquiry/domain";
import { createDemoInquiryRepository } from "@/lib/inquiry/repository";
import type { InquiryActionState } from "@/lib/inquiry/types";

export async function submitInquiryAction(
  _state: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const token = formData.get("submissionToken")?.toString() ?? "";
  if (!/^[a-f0-9-]{20,50}$/i.test(token))
    return {
      status: "error",
      message: "접수 화면이 만료되었습니다. 새로고침해 주세요.",
      fieldErrors: {},
    };
  const fieldErrors = validateInquiry(formData);
  if (Object.keys(fieldErrors).length)
    return {
      status: "error",
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  try {
    const repository = createDemoInquiryRepository();
    const history = await repository.read();
    if (history.records.some((record) => record.submissionToken === token))
      return {
        status: "success",
        message: "이미 처리된 같은 데모 접수입니다.",
        fieldErrors: {},
      };
    const session = await readDemoSession();
    const record = createInquiryRecord(
      formData,
      token,
      session ? "member" : "guest",
    );
    await repository.write({ records: [...history.records, record] });
    revalidatePath("/mypage/inquiries");
    return {
      status: "success",
      message: session
        ? "데모 문의를 접수했습니다. MY PAGE에서 상태를 확인할 수 있습니다."
        : "데모 문의를 접수했습니다. 비회원 접수는 별도 조회 기능을 제공하지 않습니다.",
      fieldErrors: {},
    };
  } catch {
    return {
      status: "error",
      message: "데모 문의를 저장하지 못했습니다. 다시 시도해 주세요.",
      fieldErrors: {},
    };
  }
}
