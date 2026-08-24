import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SupportPage from "../src/app/support/page";
import GuidePage from "../src/app/support/guide/page";
import FaqPage from "../src/app/support/faq/page";
import {
  createInquiryRecord,
  normalizeInquiryHistory,
  validateInquiry,
} from "../src/lib/inquiry/domain";

function validInquiry() {
  const data = new FormData();
  data.set("name", "데모 사용자");
  data.set("email", "demo@example.com");
  data.set("phone", "010-0000-0000");
  data.set("type", "product");
  data.set("title", "제품 기능 문의");
  data.set("body", "제품 기능의 범위와 사용 방법을 확인합니다.");
  return data;
}

describe("SUPPORT", () => {
  it("links the full hub and clearly states product limitations", () => {
    const html = renderToStaticMarkup(<SupportPage />);
    for (const href of [
      "/support/guide",
      "/support/faq",
      "/support/inquiry",
      "/support/as",
    ])
      expect(html).toContain(`href="${href}"`);
    expect(html).toContain("의료기기");
    expect(html).toContain("100% 감지하지 않으며");
    expect(html).toContain("실제 고객센터 전송이 없는 데모");
  });

  it("provides a six-step guide and six accessible FAQ disclosures", () => {
    const guide = renderToStaticMarkup(<GuidePage />);
    const faq = renderToStaticMarkup(<FaqPage />);
    expect(guide.match(/<li>/g) ?? []).toHaveLength(10);
    expect(faq.match(/<details>/g) ?? []).toHaveLength(6);
    expect(faq).toContain("자율주행 지팡이가 아니며");
  });

  it("validates all common inquiry fields and stores only a sanitized status", () => {
    const empty = new FormData();
    expect(Object.keys(validateInquiry(empty))).toEqual([
      "name",
      "email",
      "phone",
      "type",
      "title",
      "body",
    ]);
    const valid = validInquiry();
    expect(validateInquiry(valid)).toEqual({});
    const record = createInquiryRecord(
      valid,
      "12345678-1234-1234-1234-123456789012",
      "member",
    );
    expect(record.textStatus).toBe("개인정보·문의 원문 미저장");
    expect(record).not.toHaveProperty("name");
    expect(record).not.toHaveProperty("body");
    expect(normalizeInquiryHistory({ records: [record] }).records).toHaveLength(
      1,
    );
  });
});
