import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ExperiencePage from "../src/app/experience/page";
import { experiencePrograms } from "../src/config/experience-content";

describe("EXPERIENCE", () => {
  it("renders all six programs with respectful, limitation-aware language", () => {
    const html = renderToStaticMarkup(<ExperiencePage />);
    expect(experiencePrograms).toHaveLength(6);
    for (const program of experiencePrograms) {
      expect(html).toContain(program.number);
      expect(html).toContain(program.title);
    }
    expect(html).toContain("누군가의 어려움을 재현하는 대신");
    expect(html).toContain("모든 장애물을 감지하거나 안전을 보장하지 않는다는");
    expect(html).not.toContain("시각장애인이 얼마나 불편한지 체험");
  });

  it("identifies Shelter MAP as an external collaboration and does not invent locations", () => {
    const html = renderToStaticMarkup(<ExperiencePage />);
    expect(html).toContain("외부 협업 서비스");
    expect(html).toContain("쉼터MAP에서 체험존 위치를 확인하세요");
    expect(html).toContain('href="https://coolingcare.vercel.app/"');
    expect(html).toContain("체험존 위치 확인하기");
    expect(html).toContain("실제 위치와 운영 여부");
    expect(html).toContain("CANE MATE /experience");
    expect(html).not.toContain("○○동 CANE MATE 체험존");
  });
});
