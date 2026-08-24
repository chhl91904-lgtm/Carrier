import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Badge } from "../src/components/ui/badge";
import { Button, ButtonLink } from "../src/components/ui/button";
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
} from "../src/components/ui/form-controls";
import { IconButton } from "../src/components/ui/icon-button";
import { SkipLink } from "../src/components/ui/skip-link";

describe("accessible UI primitives", () => {
  it("renders loading buttons as disabled and busy", () => {
    const html = renderToStaticMarkup(
      <Button isLoading loadingLabel="저장 중">
        저장
      </Button>,
    );

    expect(html).toContain("disabled");
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain("저장 중");
  });

  it("renders descriptive links, icon labels, and text badges", () => {
    const html = renderToStaticMarkup(
      <>
        <ButtonLink href="/product">제품 보기</ButtonLink>
        <IconButton label="장바구니 열기">C</IconButton>
        <Badge tone="success">사용 가능</Badge>
      </>,
    );

    expect(html).toContain('href="/product"');
    expect(html).toContain('aria-label="장바구니 열기"');
    expect(html).toContain("사용 가능");
  });

  it("associates labels, hints, errors, and required state with form controls", () => {
    const html = renderToStaticMarkup(
      <>
        <TextField
          id="email"
          label="이메일"
          hint="연락 가능한 이메일을 입력하세요."
          error="이메일 형식을 확인하세요."
          required
        />
        <TextAreaField id="message" label="문의 내용" />
        <SelectField id="type" label="문의 유형">
          <option>제품 문의</option>
        </SelectField>
        <CheckboxField id="terms" label="필수 약관 동의" />
      </>,
    );

    expect(html).toContain('for="email"');
    expect(html).toContain('aria-describedby="email-hint email-error"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('type="checkbox"');
  });

  it("provides a skip link to the main content", () => {
    const html = renderToStaticMarkup(<SkipLink />);
    expect(html).toContain('href="#main-content"');
    expect(html).toContain("본문 바로가기");
  });
});
