"use client";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiryAction } from "@/app/inquiry-actions";
import { inquiryTypeOptions } from "@/config/support-content";
import { Button } from "@/components/ui/button";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/form-controls";
import {
  initialInquiryActionState,
  type InquiryType,
} from "@/lib/inquiry/types";

export function InquiryForm({
  submissionToken,
  fixedType,
}: {
  submissionToken: string;
  fixedType?: InquiryType;
}) {
  const [state, action] = useActionState(
    submitInquiryAction,
    initialInquiryActionState,
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
  return (
    <form ref={formRef} className="inquiry-form" action={action} noValidate>
      <input type="hidden" name="submissionToken" value={submissionToken} />
      <div
        ref={statusRef}
        className="inquiry-status"
        data-status={state.status}
        role={state.status === "error" ? "alert" : "status"}
        tabIndex={-1}
      >
        <strong>
          {state.status === "idle"
            ? "데모 개인정보 입력 안내"
            : state.status === "error"
              ? "확인이 필요합니다."
              : "접수 결과"}
        </strong>
        <p>
          {state.status === "idle"
            ? "실제 이름·연락처·주소나 민감정보를 입력하지 마세요. 입력값과 문의 원문은 저장하지 않고 접수 유형과 상태만 서명된 데모 쿠키에 보관합니다."
            : state.message}
        </p>
        {state.status === "error" && Object.keys(state.fieldErrors).length ? (
          <ul aria-label="문의 입력 오류 요약">
            {Object.values(state.fieldErrors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
        {state.status === "success" ? (
          <Link href="/mypage/inquiries">회원 문의 내역 확인</Link>
        ) : null}
      </div>
      <div className="inquiry-field-grid">
        <TextField
          id="inquiry-name"
          name="name"
          label="이름"
          required
          autoComplete="name"
          minLength={2}
          maxLength={40}
          error={state.fieldErrors.name}
        />
        <TextField
          id="inquiry-email"
          name="email"
          label="이메일"
          type="email"
          required
          autoComplete="email"
          maxLength={120}
          error={state.fieldErrors.email}
        />
        <TextField
          id="inquiry-phone"
          name="phone"
          label="연락처"
          type="tel"
          required
          autoComplete="tel"
          minLength={8}
          maxLength={20}
          hint="숫자와 하이픈을 사용할 수 있습니다."
          error={state.fieldErrors.phone}
        />
        {fixedType ? (
          <div className="ui-field">
            <label className="ui-field-label" htmlFor="inquiry-type-fixed">
              문의 유형
            </label>
            <input
              className="ui-control"
              id="inquiry-type-fixed"
              value="제품 A/S 신청"
              readOnly
            />
            <input type="hidden" name="type" value={fixedType} />
          </div>
        ) : (
          <SelectField
            id="inquiry-type"
            name="type"
            label="문의 유형"
            required
            defaultValue=""
            error={state.fieldErrors.type}
          >
            <option value="" disabled>
              유형 선택
            </option>
            {inquiryTypeOptions
              .filter((option) => option.value !== "after-service")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </SelectField>
        )}
      </div>
      <TextField
        id="inquiry-title"
        name="title"
        label="제목"
        required
        minLength={4}
        maxLength={80}
        error={state.fieldErrors.title}
      />
      <TextAreaField
        id="inquiry-body"
        name="body"
        label={fixedType ? "점검이 필요한 증상" : "문의 내용"}
        required
        minLength={10}
        maxLength={1000}
        rows={7}
        hint="10~1,000자. 실명 외 개인정보, 주소, 결제정보는 작성하지 마세요."
        error={state.fieldErrors.body}
      />
      <InquirySubmitButton afterService={Boolean(fixedType)} />
    </form>
  );
}

function InquirySubmitButton({ afterService }: { afterService: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending} loadingLabel="데모 접수 처리 중">
      {afterService ? "A/S 데모 접수" : "문의 데모 접수"}
    </Button>
  );
}
