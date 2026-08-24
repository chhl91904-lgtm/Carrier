"use client";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedbackAction } from "@/app/feedback-actions";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField } from "@/components/ui/form-controls";
import {
  initialFeedbackActionState,
  type FeedbackType,
} from "@/lib/feedback/types";

type Props = { type: FeedbackType; submissionToken: string };
const evaluationFields = [
  ["weight", "무게"],
  ["grip", "그립감"],
  ["hapticRecognition", "햅틱 인식"],
  ["buttonUsability", "버튼 사용성"],
  ["satisfaction", "기능 만족도"],
] as const;

export function FeedbackForm({ type, submissionToken }: Props) {
  const [state, action] = useActionState(
    submitFeedbackAction,
    initialFeedbackActionState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status === "error")
      (
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]') ??
        statusRef.current
      )?.focus();
    if (state.status === "success") {
      statusRef.current?.focus();
      formRef.current?.reset();
    }
  }, [state]);
  const review = type === "product-review";
  return (
    <form
      ref={formRef}
      className="feedback-form"
      action={action}
      noValidate
      aria-label={review ? "일반 제품 후기 작성" : "체험 개선 의견 작성"}
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="submissionToken" value={submissionToken} />
      <div
        ref={statusRef}
        className="feedback-status"
        data-status={state.status}
        role={state.status === "error" ? "alert" : "status"}
        tabIndex={-1}
      >
        <strong>
          {state.status === "idle"
            ? "개인정보를 저장하지 않는 데모입니다."
            : state.status === "error"
              ? "확인이 필요합니다."
              : "제출이 처리되었습니다."}
        </strong>
        <p>
          {state.status === "idle"
            ? "실명·연락처·얼굴 사진 등 개인정보를 입력하지 마세요. 서술 원문과 사진 파일은 저장하지 않습니다."
            : state.message}
        </p>
        {state.status === "error" && Object.keys(state.fieldErrors).length ? (
          <ul aria-label="피드백 입력 오류 요약">
            {Object.values(state.fieldErrors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
        {state.status === "success" && state.couponIssued ? (
          <Link href="/mypage/coupons">발급 쿠폰 확인하기</Link>
        ) : null}
      </div>
      {review ? (
        <>
          <fieldset
            className="rating-fieldset"
            data-invalid={state.fieldErrors.rating ? "true" : undefined}
          >
            <legend>
              별점 <span aria-hidden="true">*</span>
            </legend>
            <p id="rating-hint">
              1점에서 5점 사이를 키보드 방향키로 선택할 수 있습니다.
            </p>
            <div>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    required
                    aria-describedby={
                      state.fieldErrors.rating
                        ? "rating-hint rating-error"
                        : "rating-hint"
                    }
                  />
                  <span>{rating}점</span>
                </label>
              ))}
            </div>
            {state.fieldErrors.rating ? (
              <p className="ui-field-error" id="rating-error" role="alert">
                오류: {state.fieldErrors.rating}
              </p>
            ) : null}
          </fieldset>
          <TextAreaField
            id="review-body"
            name="body"
            label="제품 후기"
            required
            minLength={10}
            maxLength={500}
            hint="10~500자. 원문은 저장하지 않고 제출 완료 상태만 기록합니다."
            error={state.fieldErrors.body}
          />
          <div className="ui-field">
            <label className="ui-field-label" htmlFor="review-photo">
              후기 사진 (선택)
            </label>
            <input
              className="ui-control"
              id="review-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              aria-describedby="review-photo-hint"
              aria-invalid={state.fieldErrors.photo ? true : undefined}
            />
            <p className="ui-field-hint" id="review-photo-hint">
              JPG·PNG·WEBP, 최대 2MB. 데모 검증 후 즉시 폐기하며 미리보기나
              업로드를 저장하지 않습니다.
            </p>
            {state.fieldErrors.photo ? (
              <p className="ui-field-error" role="alert">
                오류: {state.fieldErrors.photo}
              </p>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="feedback-evaluation-grid">
            {evaluationFields.map(([name, label]) => (
              <SelectField
                key={name}
                id={`feedback-${name}`}
                name={name}
                label={label}
                required
                defaultValue=""
                error={state.fieldErrors[name]}
              >
                <option value="" disabled>
                  선택
                </option>
                {[1, 2, 3, 4, 5].map((score) => (
                  <option key={score} value={score}>
                    {score}점
                  </option>
                ))}
              </SelectField>
            ))}
          </div>
          <TextAreaField
            id="feedback-improvement"
            name="improvement"
            label="개선 의견"
            required
            minLength={10}
            maxLength={500}
            hint="제품 개선에 필요한 구체적인 의견을 10~500자로 적어 주세요. 원문은 저장하지 않습니다."
            error={state.fieldErrors.improvement}
          />
        </>
      )}
      <FeedbackSubmitButton review={review} />
    </form>
  );
}
function FeedbackSubmitButton({ review }: { review: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="feedback-submit"
      type="submit"
      isLoading={pending}
      loadingLabel="데모 제출 처리 중"
    >
      {review ? "제품 후기 제출" : "체험 피드백 제출 및 쿠폰 확인"}
    </Button>
  );
}
