"use client";

import { useState } from "react";

const views = [
  {
    id: "full",
    label: "전체 형태",
    description:
      "흰색 긴 shaft와 검은색 ㄱ자형 Smart Handle, Wrist Strap, 4단 연결부와 검은색 Cane Tip을 한눈에 확인합니다.",
  },
  {
    id: "handle",
    label: "스마트 손잡이",
    description:
      "전면 소형 Dual-Camera Style ToF Sensor, 조작 버튼, Wrist Strap과 USB-C 위치를 확대해 확인합니다.",
  },
  {
    id: "folded",
    label: "접이 구조",
    description:
      "네 구간의 흰색 shaft를 나란히 접어 휴대하는 기획 구조와 검은색 Cane Tip을 확인합니다.",
  },
] as const;

type ProductView = (typeof views)[number]["id"];

export function ProductViewer() {
  const [activeView, setActiveView] = useState<ProductView>("full");
  const selectedView = views.find((view) => view.id === activeView) ?? views[0];

  return (
    <div className="product-viewer">
      <div className="product-viewer-stage">
        <ProductArtwork view={activeView} />
        <p className="product-asset-status">
          기획 형태 시각화 <span aria-hidden="true">·</span> 공식 제품 자산 교체
          예정
        </p>
      </div>

      <div
        className="product-viewer-controls"
        role="group"
        aria-label="제품 보기 선택"
      >
        <p className="product-viewer-control-label">SELECT VIEW</p>
        <div className="product-viewer-buttons">
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              aria-pressed={activeView === view.id}
              onClick={() => setActiveView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>
        <p className="product-viewer-description">{selectedView.description}</p>
        <p className="visually-hidden" aria-live="polite">
          {selectedView.label} 보기 선택됨
        </p>
      </div>
    </div>
  );
}

function ProductArtwork({ view }: { view: ProductView }) {
  if (view === "handle") {
    return <HandleArtwork />;
  }

  if (view === "folded") {
    return <FoldedArtwork />;
  }

  return <FullCaneArtwork />;
}

function FullCaneArtwork() {
  return (
    <svg
      viewBox="0 0 620 760"
      role="img"
      aria-labelledby="full-view-title full-view-desc"
    >
      <title id="full-view-title">CANE MATE 전체 형태</title>
      <desc id="full-view-desc">
        검은색 ㄱ자형 스마트 손잡이와 손목 스트랩, 전면의 작은 이중 카메라 형태
        센서, 버튼, 네 개로 구분되는 흰색 축과 검은색 팁으로 구성된 스마트
        흰지팡이 기획 시각화입니다.
      </desc>
      <ProductBackdrop />
      <g transform="rotate(11 310 390)">
        <path d="M275 98v78" className="product-svg-handle" />
        <path d="M275 98h122" className="product-svg-handle" />
        <path
          d="M395 100c45 0 56 39 31 63-17 17-40 12-39-9"
          className="product-svg-strap"
        />
        <rect
          x="255"
          y="145"
          width="41"
          height="52"
          rx="11"
          className="product-svg-core"
        />
        <circle cx="268" cy="164" r="5" className="product-svg-sensor" />
        <circle cx="283" cy="164" r="5" className="product-svg-sensor" />
        <circle cx="276" cy="121" r="4" className="product-svg-button" />
        <path d="M276 194v455" className="product-svg-shaft" />
        {[305, 417, 529].map((y) => (
          <g key={y}>
            <rect
              x="264"
              y={y}
              width="24"
              height="14"
              rx="4"
              className="product-svg-joint"
            />
            <path d={`M267 ${y + 3}h18`} className="product-svg-joint-line" />
          </g>
        ))}
        <path d="M276 645v35" className="product-svg-tip" />
        <path d="M260 682h32" className="product-svg-tip-foot" />
      </g>
      <ProductCallout
        x1={188}
        y1={160}
        x2={244}
        label="SMART HANDLE"
        align="end"
      />
      <ProductCallout x1={365} y1={228} x2={430} label="ToF SENSOR" />
      <ProductCallout
        x1={186}
        y1={550}
        x2={246}
        label="4-STEP FOLDING"
        align="end"
      />
      <ProductCallout x1={358} y1={676} x2={425} label="CANE TIP" />
    </svg>
  );
}

function HandleArtwork() {
  return (
    <svg
      viewBox="0 0 620 760"
      role="img"
      aria-labelledby="handle-view-title handle-view-desc"
    >
      <title id="handle-view-title">스마트 손잡이 확대 형태</title>
      <desc id="handle-view-desc">
        검은색 ㄱ자형 손잡이에 전면 이중 카메라 형태의 ToF 센서, 조작 버튼, 손목
        스트랩, USB-C 포트와 송풍·온열 기획 위치를 표시한 확대 시각화입니다.
      </desc>
      <ProductBackdrop />
      <g transform="translate(4 60)">
        <path
          d="M170 220v178"
          className="product-svg-handle product-svg-handle-large"
        />
        <path
          d="M170 220h275"
          className="product-svg-handle product-svg-handle-large"
        />
        <path
          d="M440 224c90 0 104 78 58 117-31 26-70 14-67-27"
          className="product-svg-strap product-svg-strap-large"
        />
        <rect
          x="137"
          y="312"
          width="70"
          height="91"
          rx="18"
          className="product-svg-core"
        />
        <circle cx="159" cy="344" r="10" className="product-svg-sensor" />
        <circle cx="187" cy="344" r="10" className="product-svg-sensor" />
        <circle cx="171" cy="267" r="9" className="product-svg-button" />
        <rect
          x="233"
          y="244"
          width="38"
          height="10"
          rx="5"
          className="product-svg-port"
        />
        <path d="M171 398v208" className="product-svg-shaft" />
        <path
          d="M114 274c-31 12-41 37-42 65M110 297c-18 8-23 23-23 41"
          className="product-svg-air"
        />
        <path
          d="M287 274c23 14 31 36 29 59M305 251c38 25 50 56 46 91"
          className="product-svg-heat"
        />
      </g>
      <ProductCallout
        x1={63}
        y1={424}
        x2={135}
        label="DUAL ToF SENSOR"
        align="end"
      />
      <ProductCallout x1={274} y1={269} x2={370} label="USB-C" />
      <ProductCallout
        x1={72}
        y1={282}
        x2={143}
        label="MICRO AIRFLOW"
        align="end"
      />
      <ProductCallout x1={345} y1={341} x2={445} label="HEATING FILM" />
    </svg>
  );
}

function FoldedArtwork() {
  const segments = [164, 244, 324, 404];

  return (
    <svg
      viewBox="0 0 620 760"
      role="img"
      aria-labelledby="folded-view-title folded-view-desc"
    >
      <title id="folded-view-title">4단 접이 구조</title>
      <desc id="folded-view-desc">
        검은색 스마트 손잡이와 네 개의 흰색 축 구간을 나란히 접어 보관하는 구조,
        연결 밴드와 검은색 지팡이 팁을 표현한 기획 시각화입니다.
      </desc>
      <ProductBackdrop />
      <rect
        x="116"
        y="135"
        width="388"
        height="475"
        rx="44"
        className="product-svg-case"
      />
      {segments.map((x, index) => (
        <g key={x}>
          <path d={`M${x} 235v274`} className="product-svg-shaft" />
          <rect
            x={x - 12}
            y="351"
            width="24"
            height="15"
            rx="4"
            className="product-svg-joint"
          />
          <text
            x={x}
            y="552"
            textAnchor="middle"
            className="product-svg-segment-label"
          >
            0{index + 1}
          </text>
        </g>
      ))}
      <path d="M164 236V179h95" className="product-svg-handle" />
      <path
        d="M258 180c38 0 47 31 26 52-14 14-34 9-33-8"
        className="product-svg-strap"
      />
      <path d="M404 505v33" className="product-svg-tip" />
      <path d="M390 541h28" className="product-svg-tip-foot" />
      <path
        d="M172 293c52-38 173-38 224 0M172 438c52 39 173 39 224 0"
        className="product-svg-fold-cord"
      />
      <ProductCallout x1={98} y1={188} x2={148} label="HANDLE" align="end" />
      <ProductCallout x1={410} y1={536} x2={470} label="CANE TIP" />
      <text
        x="310"
        y="651"
        textAnchor="middle"
        className="product-svg-fold-label"
      >
        FOUR SECTIONS · PORTABLE STRUCTURE
      </text>
    </svg>
  );
}

function ProductBackdrop() {
  return (
    <>
      <circle cx="310" cy="380" r="260" className="product-svg-halo" />
      <circle cx="310" cy="380" r="200" className="product-svg-orbit" />
      <path d="M50 380h520M310 110v540" className="product-svg-axis" />
    </>
  );
}

function ProductCallout({
  x1,
  y1,
  x2,
  label,
  align = "start",
}: {
  x1: number;
  y1: number;
  x2: number;
  label: string;
  align?: "start" | "end";
}) {
  const textX = align === "end" ? x1 - 10 : x2 + 10;
  return (
    <g className="product-svg-callout" aria-hidden="true">
      <path d={`M${x1} ${y1}H${x2}`} />
      <circle cx={align === "end" ? x2 : x1} cy={y1} r="3" />
      <text x={textX} y={y1 - 4} textAnchor={align}>
        {label}
      </text>
    </g>
  );
}
