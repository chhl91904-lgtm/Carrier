import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ProductPage from "../src/app/product/page";
import { AppModeShowcase } from "../src/components/product/app-mode-showcase";
import { ExplodedView } from "../src/components/product/exploded-view";
import {
  explodedParts,
  guardianAppFeatures,
  productPlanningSpecs,
  userAppFeatures,
} from "../src/config/product-content";

describe("PRODUCT internal structure, spec, and app concept", () => {
  it("exposes all nine internal parts without hover-only interaction", () => {
    const html = renderToStaticMarkup(<ExplodedView />);

    expect(explodedParts).toHaveLength(9);
    for (const part of explodedParts) {
      expect(html).toContain(part.name);
      expect(html).toContain(part.description);
    }
    expect(html).toContain('role="img"');
    expect(html).toContain("CANE MATE Smart Handle 내부 구조도");
    expect(html).toContain("각 번호의 부품 설명은 그림 옆 목록에서도");
    expect(html).not.toContain("onMouseEnter");
  });

  it("shows only the approved planning specifications and labels their status", () => {
    const html = renderToStaticMarkup(<ProductPage />);

    expect(productPlanningSpecs).toHaveLength(7);
    for (const spec of productPlanningSpecs) {
      expect(html).toContain(spec.label);
      expect(html).toContain(spec.value);
    }
    expect(html).toContain(
      "현재 프로젝트 기획 목표치이며 검증된 상용 제품 확정 사양이 아닙니다.",
    );
    expect(html).toContain(
      "배터리 사용 시간은 현재 제공된 기준이 없어 표시하지 않습니다.",
    );
    expect(html).not.toMatch(/배터리[^<]{0,30}\d+\s*시간/);
  });

  it("keeps the exact user and guardian mode feature sets", () => {
    expect(userAppFeatures).toHaveLength(8);
    expect(userAppFeatures).toEqual([
      "CANE MATE 연결 상태",
      "배터리 상태",
      "쉼터 안내",
      "음성 길 안내",
      "보호자 연결 관리",
      "위치 공유 동의",
      "제품 상태",
      "고객지원",
    ]);
    expect(guardianAppFeatures).toHaveLength(6);
    expect(guardianAppFeatures).toEqual([
      "이용자 연결",
      "낙상 위험 알림",
      "동의 기반 위치 확인",
      "CANE MATE 배터리 상태",
      "제품 상태",
      "긴급 상황 확인",
    ]);
  });

  it("renders an accessible app concept with consent withdrawal and scope disclosure", () => {
    const showcaseHtml = renderToStaticMarkup(<AppModeShowcase />);
    const pageHtml = renderToStaticMarkup(<ProductPage />);

    expect(showcaseHtml).toContain('role="tablist"');
    expect(showcaseHtml).toContain('role="tab"');
    expect(showcaseHtml).toContain('aria-selected="true"');
    expect(showcaseHtml).toContain("이용자 모드");
    expect(showcaseHtml).toContain("보호자 모드");
    expect(showcaseHtml).toContain("음성 길 안내");
    expect(showcaseHtml).toContain("언제든 앱 설정에서 동의를 철회");
    expect(showcaseHtml).toContain("앱 연동 콘셉트 · 실제 연동 아님");
    expect(pageHtml).toContain(
      "실제 companion app, BLE 통신, 위치 추적 기능은",
    );
  });
});
