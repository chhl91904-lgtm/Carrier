import type { Metadata } from "next";
import Link from "next/link";

import { HomeFeatureIcon, RecyclingIcon } from "@/components/home/home-icons";
import { ProductVisualPlaceholder } from "@/components/home/product-visual-placeholder";
import { Container } from "@/components/ui/layout";
import { homeCoreFunctions, recyclingSteps } from "@/config/home-content";

export const metadata: Metadata = {
  title: "더 안전한 이동, 더 나은 일상",
  description:
    "재생 소재와 스마트 기술로 시각장애인의 독립적인 이동을 보조하는 스마트 흰지팡이 CANE MATE를 소개합니다.",
};

export default function HomePage() {
  return (
    <main className="home-page" id="main-content">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero-pattern" aria-hidden="true" />
        <Container className="home-hero-grid" size="wide">
          <div className="home-hero-copy">
            <p className="home-hero-kicker">SMART MOBILITY · CIRCULAR DESIGN</p>
            <h1 id="home-hero-title">CANE MATE</h1>
            <p className="home-hero-slogan">더 안전한 이동, 더 나은 일상.</p>
            <p className="home-hero-description">
              기술과 배려를 더해 누구나 안전하게 이동할 수 있도록.
              <br />
              버려지는 자원에 새로운 가치를 더합니다.
            </p>
            <Link
              className="home-text-link home-text-link-light"
              href="/product"
            >
              CANE MATE 알아보기 <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ProductVisualPlaceholder className="home-hero-product" />
        </Container>
        <a className="home-scroll-cue" href="#recycling-story">
          <span>SCROLL</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section
        className="home-recycling-section"
        id="recycling-story"
        aria-labelledby="recycling-title"
      >
        <Container size="wide">
          <div className="home-section-heading home-section-heading-centered">
            <p className="home-section-eyebrow">RECYCLING STORY</p>
            <h2 id="recycling-title">
              버려진 자원이 더 안전한 이동을 위한 새로운 가치로.
            </h2>
            <p>
              폐에어컨에서 회수 가능한 소재를 분리·재생하고 안전성을 검증해 CANE
              MATE의 소재로 활용하는 순환 과정을 기획하고 있습니다.
            </p>
          </div>

          <ol className="recycling-flow" aria-label="소재 순환 과정">
            {recyclingSteps.map((step, index) => (
              <li key={step.title}>
                <div className="recycling-icon" aria-hidden="true">
                  <RecyclingIcon step={index} />
                </div>
                <span className="recycling-step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="home-section-link-row">
            <Link className="home-text-link" href="/esg">
              ESG STORY <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section
        className="home-functions-section"
        aria-labelledby="functions-title"
      >
        <Container size="wide">
          <div className="home-functions-intro">
            <div className="home-section-heading">
              <p className="home-section-eyebrow">CORE FUNCTIONS</p>
              <h2 id="functions-title">SMART CANE, BETTER MOBILITY</h2>
              <p>
                장애물 감지부터 쉼터 안내까지, 이동에 필요한 기술을 하나의
                지팡이에.
              </p>
            </div>
            <p className="home-planning-note">
              소개된 기능은 현재 프로젝트 기획 기준이며, 안전한 이동을 보조하는
              기능입니다.
            </p>
          </div>

          <div className="home-functions-layout">
            <ProductVisualPlaceholder
              className="home-functions-product"
              compact
            />

            <ol className="home-function-list">
              {homeCoreFunctions.map((feature, index) => (
                <li key={feature.title}>
                  <span className="home-function-icon" aria-hidden="true">
                    <HomeFeatureIcon type={feature.icon} />
                  </span>
                  <span className="home-function-copy">
                    <span className="home-function-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{feature.title}</strong>
                    <span>{feature.summary}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="home-section-link-row home-section-link-row-end">
            <Link className="home-text-link" href="/product">
              DISCOVER CANE MATE <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
