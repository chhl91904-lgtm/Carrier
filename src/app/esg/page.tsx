import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/layout";
import { circularSteps, esgPillars, socialValues } from "@/config/esg-content";

export const metadata: Metadata = {
  title: "ESG",
  description:
    "폐에어컨 회수 소재와 접근 가능한 이동 보조 제품을 연결하는 CANE MATE의 ESG 기획 원칙",
};
export default function EsgPage() {
  return (
    <main className="esg-page" id="main-content">
      <section className="esg-hero" aria-labelledby="esg-title">
        <Container size="wide">
          <p>ESG · CIRCULAR VALUE</p>
          <h1 id="esg-title">
            폐에어컨에서
            <br />
            CANE MATE까지.
          </h1>
          <p className="esg-hero-copy">
            소재를 회수하고 분리·재생한 뒤 품질과 안전성을 검증해 이동 보조
            제품으로 연결하는 기획입니다. 실제 상용 성과나 검증 완료를 의미하지
            않습니다.
          </p>
          <ol aria-label="CANE MATE 소재 기획 흐름">
            <li>폐에어컨 회수</li>
            <li>소재 분리</li>
            <li>재생</li>
            <li>품질·안전성 검증</li>
            <li>CANE MATE</li>
          </ol>
        </Container>
      </section>
      <section className="esg-pillars" aria-labelledby="esg-pillars-title">
        <Container size="wide">
          <header>
            <p>E · S · G PRINCIPLES</p>
            <h2 id="esg-pillars-title">가능성과 책임을 함께 설명합니다.</h2>
          </header>
          <div className="esg-pillar-list">
            {esgPillars.map((pillar) => (
              <article key={pillar.key}>
                <span>{pillar.key}</span>
                <p>{pillar.label}</p>
                <h3>{pillar.title}</h3>
                <ul>
                  {pillar.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div>
                  <strong>현재 상태</strong>
                  <p>{pillar.disclaimer}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="esg-carrier" aria-labelledby="carrier-value-title">
        <Container size="wide">
          <div>
            <p>CARRIER VALUE · PLANNING</p>
            <h2 id="carrier-value-title">
              자원순환과 이동 환경을 연결하는 새로운 접점.
            </h2>
            <p>
              회수 폐에어컨 소재의 활용처를 탐색하고, 자원순환 활동을 제품으로
              확인할 수 있는 접점을 만들며, 복지시설·지역사회·체험존과 함께
              기후와 이동 환경을 고민합니다.
            </p>
          </div>
          <ul className="esg-social-values">
            {socialValues.map((value, index) => (
              <li key={value}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="esg-circular" aria-labelledby="circular-title">
        <Container size="wide">
          <header>
            <p>CIRCULAR DESIGN · 7 STEPS</p>
            <h2 id="circular-title">
              한 번의 재생을 넘어, 개선이 이어지는 구조.
            </h2>
          </header>
          <div
            className="circular-visual"
            role="img"
            tabIndex={0}
            aria-labelledby="circular-title circular-description"
          >
            {circularSteps.map((step, index) => (
              <div
                key={step}
                style={{ "--circular-index": index } as CSSProperties}
              >
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <p id="circular-description" className="circular-linear-description">
            순서: {circularSteps.join(" → ")}. 마지막 단계의 경험과 검증 결과는
            다시 소재 선택과 제품 기획에 반영됩니다.
          </p>
        </Container>
      </section>
      <section className="esg-closing" aria-label="CANE MATE ESG 메시지">
        <Container size="wide">
          <p>
            버려지는 자원에는 새로운 가치를,
            <br />
            <strong>이동이 필요한 사람에게는 더 안전한 길을.</strong>
          </p>
          <span>
            정량 환경 성과와 상용 사양은 향후 검증 결과에 따라 공개합니다.
          </span>
        </Container>
      </section>
    </main>
  );
}
