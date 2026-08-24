import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { FeedbackForm } from "../src/components/feedback/feedback-form";
import {
  issueExperienceCoupon,
  normalizeCouponWallet,
} from "../src/lib/coupon/domain";
import { createFeedbackId, validateFeedback } from "../src/lib/feedback/domain";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));

describe("feedback domain", () => {
  it("validates review and experience models independently", () => {
    const empty = new FormData();
    expect(validateFeedback(empty, "product-review")).toMatchObject({
      rating: expect.any(String),
      body: expect.any(String),
    });
    expect(validateFeedback(empty, "experience-feedback")).toMatchObject({
      weight: expect.any(String),
      grip: expect.any(String),
      hapticRecognition: expect.any(String),
      buttonUsability: expect.any(String),
      satisfaction: expect.any(String),
      improvement: expect.any(String),
    });
    const review = new FormData();
    review.set("rating", "5");
    review.set("body", "개인정보 없는 충분한 길이의 데모 후기입니다.");
    expect(validateFeedback(review, "product-review")).toEqual({});
  });
  it("issues one experience coupon and prevents duplicate issuance", () => {
    const wallet = normalizeCouponWallet(null);
    const first = issueExperienceCoupon(wallet, "FB-DEMO-ABC123");
    expect(first.issued).toBe(true);
    expect(first.coupon).toMatchObject({
      discountRate: 5,
      status: "available",
      source: "experience-feedback",
    });
    const second = issueExperienceCoupon(first.coupons, "FB-DEMO-OTHER");
    expect(second.issued).toBe(false);
    expect(second.coupons).toHaveLength(first.coupons.length);
  });
  it("creates a stable non-sensitive submission id", () => {
    const token = "12345678-1234-1234-1234-123456789abc";
    expect(createFeedbackId(token)).toBe("FB-DEMO-1234567812");
  });
});

describe("feedback presentation", () => {
  it("renders accessible review rating and demo photo safeguards", () => {
    const html = renderToStaticMarkup(
      <FeedbackForm
        type="product-review"
        submissionToken="12345678-1234-1234-1234-123456789abc"
      />,
    );
    expect(html).toContain('name="rating"');
    expect(html).toContain('type="file"');
    expect(html).toContain("JPG·PNG·WEBP");
    expect(html).toContain("서술 원문과 사진 파일은 저장하지 않습니다");
  });
  it("renders every distinct experience evaluation field", () => {
    const html = renderToStaticMarkup(
      <FeedbackForm
        type="experience-feedback"
        submissionToken="12345678-1234-1234-1234-123456789abc"
      />,
    );
    for (const name of [
      "weight",
      "grip",
      "hapticRecognition",
      "buttonUsability",
      "satisfaction",
      "improvement",
    ])
      expect(html).toContain(`name="${name}"`);
    expect(html).toContain("체험 피드백 제출 및 쿠폰 확인");
  });
});
