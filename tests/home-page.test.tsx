import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "../src/app/page";
import { homeCoreFunctions } from "../src/config/home-content";

describe("HOME page", () => {
  it("renders the approved hero message and meaningful product fallback", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("CANE MATE");
    expect(html).toContain("더 안전한 이동, 더 나은 일상.");
    expect(html).toContain("버려지는 자원에 새로운 가치를 더합니다.");
    expect(html).toContain("CANE MATE 스마트 흰지팡이 기획 형태");
    expect(html).toContain("공식 제품 이미지 교체 예정");
  });

  it("keeps the recycling story and both detail routes connected", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("폐에어컨 회수");
    expect(html).toContain("소재 분리·재생");
    expect(html).toContain('href="/esg"');
    expect(html).toContain('href="/product"');
  });

  it("summarizes exactly seven core functions without unsafe claims", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(homeCoreFunctions).toHaveLength(7);
    for (const feature of homeCoreFunctions) {
      expect(html).toContain(feature.title);
    }
    expect(html).toContain("기획 기준");
    expect(html).toContain("보조하는 기능");
    expect(html).not.toContain("100% 정확");
    expect(html).not.toContain("자동 신고");
  });
});
