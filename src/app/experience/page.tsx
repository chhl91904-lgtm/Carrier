import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { experiencePrograms } from "@/config/experience-content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "EXPERIENCE",
  description:
    "CANE MATE 기획 체험존과 접근성 프로그램, 사용 교육, 사용자 피드백 안내",
};

export default function ExperiencePage() {
  return (
    <main className="experience-page" id="main-content">
      <section className="experience-hero" aria-labelledby="experience-title">
        <Container size="wide">
          <p className="experience-eyebrow">EXPERIENCE · PLANNING CONCEPT</p>
          <h1 id="experience-title">
            직접 경험하고,
            <br />
            함께 개선합니다.
          </h1>
          <div className="experience-hero-copy">
            <p>
              CANE MATE 체험존은 복지시설과 관련 기관에 시제품을 배치해 제품을
              경험하고 사용 방법을 안내받는 공간으로 기획하고 있습니다.
            </p>
            <p>
              현재 실제 운영 위치와 일정은 확정되지 않았습니다. 검증된 장소
              정보가 제공되기 전에는 임의의 체험존을 표시하지 않습니다.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="experience-purpose"
        aria-labelledby="experience-purpose-title"
      >
        <Container size="wide">
          <div className="experience-section-heading">
            <p>WHY EXPERIENCE</p>
            <h2 id="experience-purpose-title">
              제품 설명을 넘어, 올바른 사용과 개선으로.
            </h2>
          </div>
          <div className="experience-purpose-grid">
            <article>
              <span aria-hidden="true">A</span>
              <h3>안전한 제품 이해</h3>
              <p>
                센서와 알림이 보조하는 범위, 사용 방법, 기능 한계를 함께
                안내합니다.
              </p>
            </article>
            <article>
              <span aria-hidden="true">B</span>
              <h3>존중하는 접근성 학습</h3>
              <p>
                누군가의 어려움을 재현하는 대신 누구나 이동하기 좋은 환경을 함께
                살펴봅니다.
              </p>
            </article>
            <article>
              <span aria-hidden="true">C</span>
              <h3>사용자 중심 개선</h3>
              <p>
                실제 사용 경험과 구체적인 의견이 다음 설계와 검증에 반영되도록
                연결합니다.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section
        className="experience-programs"
        aria-labelledby="experience-programs-title"
      >
        <Container size="wide">
          <div className="experience-section-heading">
            <p>PROGRAM 01—06</p>
            <h2 id="experience-programs-title">여섯 단계의 체험 프로그램</h2>
          </div>
          <ol className="experience-program-list">
            {experiencePrograms.map((program) => (
              <li key={program.number}>
                <span>{program.number}</span>
                <div>
                  <h3>{program.title}</h3>
                  <p>{program.summary}</p>
                  <small>{program.detail}</small>
                </div>
              </li>
            ))}
          </ol>
          <div className="experience-feedback-cta">
            <div>
              <p>YOUR VOICE, NEXT CANE MATE</p>
              <h2>당신의 경험이 다음 CANE MATE를 만듭니다.</h2>
              <span>
                체험 피드백은 STEP 11에서 로그인 회원용 데모 제출·쿠폰 발급
                흐름으로 연결됩니다.
              </span>
            </div>
            <ButtonLink href="/experience/feedback">
              체험 피드백 남기기
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section
        className="experience-map"
        aria-labelledby="experience-map-title"
      >
        <Container size="wide">
          <p>EXTERNAL COLLABORATION</p>
          <h2 id="experience-map-title">
            쉼터MAP에서 체험존 위치를 확인하세요.
          </h2>
          <p className="experience-map-description">
            쉼터MAP은 CANE MATE가 운영하는 자체 서비스가 아닌 외부 협업
            서비스입니다. 외부 지도에서 냉방 쉼터와 CANE MATE 연계 정보를 확인할
            수 있으며, 실제 위치와 운영 여부는 외부 서비스의 최신 안내를
            확인해주세요.
          </p>
          <div
            className="experience-map-legend"
            role="group"
            aria-label="향후 지도 구분 예시"
          >
            <span>
              <i aria-hidden="true">S</i>일반 쉼터
            </span>
            <span>
              <i aria-hidden="true">C</i>CANE MATE 체험존 · 제품 체험/사용 교육
            </span>
          </div>
          {siteConfig.shelterMapUrl ? (
            <a
              className="experience-map-link"
              href={siteConfig.shelterMapUrl}
              rel="noreferrer"
              target="_blank"
            >
              체험존 위치 확인하기 <span>새 창</span>
            </a>
          ) : (
            <div className="experience-map-unavailable" role="status">
              <strong>외부 쉼터MAP URL 준비 중</strong>
              <p>
                현재 연결할 검증 URL이 없습니다. 체험존 문의는 고객지원에서 남길
                수 있습니다.
              </p>
              <ButtonLink href="/support/inquiry" variant="secondary">
                체험존 문의하기
              </ButtonLink>
            </div>
          )}
          <p className="experience-return-note">
            외부 서비스에서 돌아오는 공식 경로:{" "}
            <Link href="/experience">CANE MATE /experience</Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
