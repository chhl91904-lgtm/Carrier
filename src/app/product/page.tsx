import type { Metadata } from "next";
import Image from "next/image";

import { HomeFeatureIcon } from "@/components/home/home-icons";
import { AppModeShowcase } from "@/components/product/app-mode-showcase";
import { ExplodedView } from "@/components/product/exploded-view";
import { ProductViewer } from "@/components/product/product-viewer";
import { Container } from "@/components/ui/layout";
import {
  productDesignDetails,
  productFeatures,
  productPlanningSpecs,
  type ProductFeature,
} from "@/config/product-content";

export const metadata: Metadata = {
  title: "제품과 스마트 기능",
  description:
    "CANE MATE의 제품 형태와 장애물 보조 감지, 햅틱·음성 안내, 동의 기반 안전 기능을 소개합니다.",
};

export default function ProductPage() {
  return (
    <main className="product-page" id="main-content">
      <section className="product-intro" aria-labelledby="product-title">
        <Container size="wide">
          <div className="product-intro-heading">
            <p className="product-eyebrow">PRODUCT · CONCEPT DESIGN</p>
            <h1 id="product-title">이동을 이해하는 스마트 흰지팡이.</h1>
            <p>
              CANE MATE는 기존 흰지팡이의 사용 방식을 존중하면서, 일반
              흰지팡이가 놓치기 쉬운 위험과 이동 정보를 기술로 보조하도록
              기획했습니다.
            </p>
          </div>

          <div
            className="product-status-row"
            role="group"
            aria-label="제품 상태"
          >
            <span>스마트 흰지팡이</span>
            <span>기획 콘셉트</span>
            <span>이동 보조 제품</span>
          </div>

          <ProductViewer />

          <div
            className="product-design-summary"
            role="region"
            aria-labelledby="design-summary-title"
          >
            <div>
              <p className="product-section-index">DESIGN LANGUAGE</p>
              <h2 id="design-summary-title">익숙한 형태, 필요한 기술.</h2>
            </div>
            <ul>
              {productDesignDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="product-sensing" aria-labelledby="sensing-title">
        <Container size="wide">
          <div className="product-section-heading">
            <p className="product-section-index">01 · SENSE &amp; ALERT</p>
            <h2 id="sensing-title">놓치기 쉬운 높이까지, 위험을 보조 감지.</h2>
            <p>
              사용자가 자연스럽게 지팡이를 짚는 약 40~45° 상황을 고려해 전방의
              높은 장애물을 살피고, 위험 정보는 손에 닿는 진동으로 전달하는
              구조입니다.
            </p>
          </div>

          <div className="product-sensing-layout">
            <UsageAngleDiagram />
            <div className="product-feature-stack">
              {productFeatures.slice(0, 2).map((feature) => (
                <ProductFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="product-guidance" aria-labelledby="guidance-title">
        <Container size="wide">
          <div className="product-section-heading product-section-heading-light">
            <p className="product-section-index">02 · GUIDE &amp; CONSENT</p>
            <h2 id="guidance-title">길 안내는 음성으로, 위치정보는 동의로.</h2>
            <p>
              길 안내와 쉼터 탐색, 낙상 의심 상황의 보호자 확인 흐름을 서로
              구분하고 이용자 통제권을 중심에 둡니다.
            </p>
          </div>

          <ConnectionFlow />

          <div className="product-feature-grid product-feature-grid-dark">
            {productFeatures.slice(2, 5).map((feature) => (
              <ProductFeatureCard key={feature.id} feature={feature} dark />
            ))}
          </div>

          <div
            className="guardian-confirmation-flow"
            role="region"
            aria-labelledby="guardian-flow-title"
          >
            <div>
              <p className="product-section-index">FALL-RISK CHECK FLOW</p>
              <h3 id="guardian-flow-title">
                낙상 의심은 신고가 아닌 확인의 시작입니다.
              </h3>
            </div>
            <ol>
              <li>
                <span>01</span>
                <strong>IMU 낙상 위험 감지</strong>
                <p>비정상적인 충격·기울기 신호를 살핍니다.</p>
              </li>
              <li>
                <span>02</span>
                <strong>보호자 확인 알림</strong>
                <p>즉시 자동 신고가 아닌 상황 확인 알림을 보냅니다.</p>
              </li>
              <li>
                <span>03</span>
                <strong>동의 기반 위치 확인</strong>
                <p>이용자와 보호자 양측이 동의한 경우에만 확인합니다.</p>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      <section className="product-comfort" aria-labelledby="comfort-title">
        <Container size="wide">
          <div className="product-section-heading">
            <p className="product-section-index">
              03 · COMFORT &amp; PORTABILITY
            </p>
            <h2 id="comfort-title">계절의 불편은 덜고, 휴대는 간결하게.</h2>
            <p>
              손잡이의 가벼운 송풍과 온열, 4단 접이 구조와 USB-C 충전으로
              일상에서의 사용과 보관을 고려했습니다.
            </p>
          </div>

          <div className="product-feature-grid product-feature-grid-two">
            {productFeatures.slice(5).map((feature) => (
              <ProductFeatureCard key={feature.id} feature={feature} />
            ))}
          </div>

          <aside
            className="product-limitations"
            aria-labelledby="limitations-title"
          >
            <p className="product-section-index">IMPORTANT</p>
            <h2 id="limitations-title">제품 기능과 현재 단계 안내</h2>
            <ul>
              <li>CANE MATE는 안전한 이동을 보조하는 스마트 흰지팡이입니다.</li>
              <li>
                소개된 기능은 환경과 사용 방식에 따라 결과가 달라질 수 있습니다.
              </li>
              <li>
                현재 프로젝트 기획 내용으로, 검증된 상용 제품 확정 기능이
                아닙니다.
              </li>
              <li>
                공식 제품 렌더와 다각도 자산을 제공받으면 현재 시각화를
                교체합니다.
              </li>
            </ul>
          </aside>
        </Container>
      </section>

      <section className="product-internals" aria-labelledby="internals-title">
        <Container size="wide">
          <div className="product-section-heading">
            <p className="product-section-index">04 · INTERNAL STRUCTURE</p>
            <h2 id="internals-title">
              작은 손잡이 안에서 이어지는 아홉 가지 역할.
            </h2>
            <p>
              센서가 위험을 살피고, Smart Core가 정보를 처리하며, 진동과 앱
              연결로 전달하는 흐름을 부품별로 풀어냈습니다.
            </p>
          </div>

          <ExplodedView />
        </Container>
      </section>

      <section className="product-spec" aria-labelledby="spec-title">
        <Container size="wide">
          <div className="product-spec-heading">
            <div className="product-section-heading product-section-heading-light">
              <p className="product-section-index">05 · PLANNING SPEC</p>
              <h2 id="spec-title">휴대와 사용을 고려한 기획 기준.</h2>
              <p>
                길이, 접이 구조, 충전 방식과 무게를 일상의 이동과 보관 흐름에
                맞춰 설정한 현재 프로젝트의 목표치입니다.
              </p>
            </div>
            <p className="product-spec-disclosure">
              현재 프로젝트 기획 목표치이며 검증된 상용 제품 확정 사양이
              아닙니다.
            </p>
          </div>

          <dl className="product-spec-grid">
            {productPlanningSpecs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="product-battery-note">
            배터리 사용 시간은 현재 제공된 기준이 없어 표시하지 않습니다.
          </p>
        </Container>
      </section>

      <section className="product-app" aria-labelledby="app-title">
        <Container size="wide">
          <div className="product-section-heading">
            <p className="product-section-index">06 · APP CONNECTION CONCEPT</p>
            <h2 id="app-title">음성 안내는 단순하게, 정보 권한은 분명하게.</h2>
            <p>
              CANE MATE와 스마트폰, 이어폰이 연결되는 흐름을 이용자와 보호자
              모드로 나누어 보여 주는 기획 화면입니다.
            </p>
          </div>

          <AppModeShowcase />

          <div className="app-scope-notice" role="note">
            <strong>연동 범위 안내</strong>
            <p>
              이 화면은 웹사이트에서 제품의 앱 연동 방향을 설명하는
              콘셉트입니다. 실제 companion app, BLE 통신, 위치 추적 기능은 현재
              구현되어 있지 않습니다.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ProductFeatureCard({
  feature,
  dark = false,
}: {
  feature: ProductFeature;
  dark?: boolean;
}) {
  return (
    <article
      className="product-feature-card"
      data-dark={dark || undefined}
      id={feature.id}
    >
      <div className="product-feature-card-heading">
        <span className="product-feature-card-icon" aria-hidden="true">
          <HomeFeatureIcon type={feature.icon} />
        </span>
        <span className="product-feature-card-number">{feature.number}</span>
      </div>
      <h3>{feature.title}</h3>
      <p className="product-feature-summary">{feature.summary}</p>
      <p className="product-feature-detail">{feature.detail}</p>
      <p className="product-feature-notice">
        <span aria-hidden="true">i</span>
        {feature.notice}
      </p>
    </article>
  );
}

function UsageAngleDiagram() {
  return (
    <figure className="usage-angle-diagram">
      <Image
        className="usage-angle-image"
        src="/assets/cane-mate-sensor-angle.png"
        alt="CANE MATE 사용 각도와 ToF 센서 감지 방향"
        width={390}
        height={426}
        sizes="(min-width: 64rem) 50vw, 100vw"
      />
      <figcaption>
        <strong>센서 각도 구조</strong>
        <span>
          자연스러운 사용 각도를 고려한 기획 구조이며, 실제 감지 성능과 범위는
          검증 전입니다.
        </span>
      </figcaption>
    </figure>
  );
}

function ConnectionFlow() {
  return (
    <div
      className="product-connection"
      role="region"
      aria-labelledby="connection-title"
    >
      <h3 id="connection-title" className="visually-hidden">
        음성 길 안내 연결 구조
      </h3>
      <ol>
        <li>
          <span className="product-connection-index">01</span>
          <strong>CANE MATE</strong>
          <span>감지·버튼 입력</span>
        </li>
        <li>
          <span className="product-connection-index">02</span>
          <strong>SMARTPHONE</strong>
          <span>경로·쉼터 정보 연결</span>
        </li>
        <li>
          <span className="product-connection-index">03</span>
          <strong>EARPHONE</strong>
          <span>음성 중심 길 안내</span>
        </li>
      </ol>
      <p>기기 연결과 앱 화면은 현재 제품 연동 콘셉트입니다.</p>
    </div>
  );
}
