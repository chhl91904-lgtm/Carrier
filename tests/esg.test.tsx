import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EsgPage from "../src/app/esg/page";
import {
  circularSteps,
  esgPillars,
  socialValues,
} from "../src/config/esg-content";

describe("ESG", () => {
  it("renders the full E, S, G principles without claiming unverified results", () => {
    const html = renderToStaticMarkup(<EsgPage />);
    expect(esgPillars).toHaveLength(3);
    for (const pillar of esgPillars) {
      expect(html).toContain(pillar.key);
      expect(html).toContain(pillar.title);
      expect(html).toContain(pillar.disclaimer);
    }
    expect(html).toContain("가능성");
    expect(html).toContain("기획");
    expect(html).toContain("검증되지 않았습니다");
    expect(html).not.toContain("탄소 중립을 달성");
  });

  it("provides six social values and a linear alternative for all circular steps", () => {
    const html = renderToStaticMarkup(<EsgPage />);
    expect(socialValues).toHaveLength(6);
    expect(circularSteps).toHaveLength(7);
    for (const value of socialValues) expect(html).toContain(value);
    expect(html).toContain(circularSteps.join(" → "));
    expect(html).toContain("버려지는 자원에는 새로운 가치를,");
    expect(html).toContain("이동이 필요한 사람에게는 더 안전한 길을.");
  });
});
