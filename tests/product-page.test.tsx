import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ProductPage from "../src/app/product/page";
import { ProductViewer } from "../src/components/product/product-viewer";
import {
  productDesignDetails,
  productFeatures,
} from "../src/config/product-content";

describe("PRODUCT visual and core functions", () => {
  it("keeps the complete approved product design language", () => {
    const html = renderToStaticMarkup(<ProductPage />);

    for (const detail of productDesignDetails) {
      expect(html).toContain(detail);
    }
    expect(html).toContain("공식 제품 렌더와 다각도 자산");
    expect(html).toContain("공식 제품 자산 교체 예정");
  });

  it("provides a keyboard-operable three-view alternative with static descriptions", () => {
    const html = renderToStaticMarkup(<ProductViewer />);

    expect(html).toContain('type="button"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("전체 형태");
    expect(html).toContain("스마트 손잡이");
    expect(html).toContain("접이 구조");
    expect(html).toContain("CANE MATE 전체 형태");
  });

  it("covers all seven feature groups and states their limits", () => {
    const html = renderToStaticMarkup(<ProductPage />);

    expect(productFeatures).toHaveLength(7);
    for (const feature of productFeatures) {
      expect(html).toContain(feature.title);
      expect(html).toContain(feature.notice);
    }
    expect(html).toContain("약 40~45°");
    expect(html).toContain("CANE MATE");
    expect(html).toContain("SMARTPHONE");
    expect(html).toContain("EARPHONE");
  });

  it("avoids unsafe product claims and clearly negates automatic reporting", () => {
    const html = renderToStaticMarkup(<ProductPage />);

    expect(html).not.toContain("의료기기");
    expect(html).not.toContain("안내견의 완전한 대체");
    expect(html).not.toContain("자율주행 지팡이");
    expect(html).toContain("즉시 자동 신고가 아닌");
    expect(html).toContain("감지는 100% 정확하지 않으며");
    expect(html).toContain("송풍은 냉방장치가 아니며");
    expect(html).toContain("양측 동의");
  });
});
