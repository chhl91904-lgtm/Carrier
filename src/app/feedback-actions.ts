"use server";
import { revalidatePath } from "next/cache";
import { requireDemoSession } from "@/lib/auth/session";
import { issueExperienceCoupon } from "@/lib/coupon/domain";
import { createDemoCouponRepository } from "@/lib/coupon/repository";
import { createFeedbackRecord, validateFeedback } from "@/lib/feedback/domain";
import { createDemoFeedbackRepository } from "@/lib/feedback/repository";
import type { FeedbackActionState, FeedbackType } from "@/lib/feedback/types";

export async function submitFeedbackAction(
  _state: FeedbackActionState,
  formData: FormData,
): Promise<FeedbackActionState> {
  await requireDemoSession("/experience/feedback");
  const type = formData.get("type");
  const token = formData.get("submissionToken")?.toString() ?? "";
  if (
    (type !== "product-review" && type !== "experience-feedback") ||
    !/^[a-f0-9-]{20,50}$/i.test(token)
  )
    return {
      status: "error",
      message: "제출 화면이 만료되었습니다. 새로고침해 주세요.",
      fieldErrors: {},
    };
  const feedbackType = type as FeedbackType;
  const errors = validateFeedback(formData, feedbackType);
  if (Object.keys(errors).length)
    return {
      status: "error",
      message: "입력 내용을 확인해 주세요.",
      fieldErrors: errors,
    };
  const repository = createDemoFeedbackRepository();
  const history = await repository.read();
  const existing = history.records.find(
    (record) => record.submissionToken === token,
  );
  if (existing)
    return {
      status: "success",
      message: "이미 처리된 같은 데모 제출입니다.",
      fieldErrors: {},
      couponIssued: Boolean(existing.couponIssuedId),
    };
  const record = createFeedbackRecord(formData, feedbackType, token);
  try {
    if (feedbackType === "experience-feedback") {
      const couponRepository = createDemoCouponRepository();
      const wallet = await couponRepository.read();
      const issued = issueExperienceCoupon(wallet, record.id);
      record.couponIssuedId = issued.coupon.id;
      await couponRepository.write(issued.coupons);
      await repository.write({ records: [...history.records, record] });
      revalidatePath("/mypage/coupons");
      revalidatePath("/mypage/reviews");
      return {
        status: "success",
        message: issued.issued
          ? "체험 피드백을 반영하고 5% 데모 쿠폰을 발급했습니다."
          : "체험 피드백을 반영했습니다. 기존 체험 쿠폰은 중복 발급하지 않았습니다.",
        fieldErrors: {},
        couponIssued: issued.issued,
      };
    }
    await repository.write({ records: [...history.records, record] });
    revalidatePath("/mypage/reviews");
    return {
      status: "success",
      message:
        "일반 제품 후기를 데모 내역에 기록했습니다. 입력 원문과 사진은 저장하지 않았습니다.",
      fieldErrors: {},
    };
  } catch {
    return {
      status: "error",
      message: "데모 피드백을 저장하지 못했습니다. 다시 시도해 주세요.",
      fieldErrors: {},
    };
  }
}
