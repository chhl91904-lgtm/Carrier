"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { guardianAppFeatures, userAppFeatures } from "@/config/product-content";

type AppMode = "user" | "guardian";

const modes = [
  { id: "user" as const, label: "이용자 모드", count: userAppFeatures.length },
  {
    id: "guardian" as const,
    label: "보호자 모드",
    count: guardianAppFeatures.length,
  },
];

export function AppModeShowcase() {
  const [activeMode, setActiveMode] = useState<AppMode>("user");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const features =
    activeMode === "user" ? userAppFeatures : guardianAppFeatures;

  function selectTab(index: number) {
    const mode = modes[index];
    if (!mode) return;
    setActiveMode(mode.id);
    tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectTab((index + 1) % modes.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab((index - 1 + modes.length) % modes.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(modes.length - 1);
    }
  }

  return (
    <div className="app-showcase">
      <div className="app-mode-copy">
        <div className="app-concept-badge">앱 연동 콘셉트 · 실제 연동 아님</div>
        <div className="app-mode-tabs" role="tablist" aria-label="앱 모드 선택">
          {modes.map((mode, index) => (
            <button
              key={mode.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${mode.id}-mode-tab`}
              aria-selected={activeMode === mode.id}
              aria-controls={`${mode.id}-mode-panel`}
              tabIndex={activeMode === mode.id ? 0 : -1}
              onClick={() => setActiveMode(mode.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>{mode.label}</span>
              <small>{mode.count}개 기능</small>
            </button>
          ))}
        </div>

        <div
          className="app-mode-panel"
          role="tabpanel"
          id={`${activeMode}-mode-panel`}
          aria-labelledby={`${activeMode}-mode-tab`}
        >
          <p className="app-mode-kicker">
            {activeMode === "user" ? "USER MODE" : "GUARDIAN MODE"}
          </p>
          <h3>
            {activeMode === "user"
              ? "사용자가 연결과 동의를 직접 관리합니다."
              : "보호자는 동의된 범위에서만 상황을 확인합니다."}
          </h3>
          <ul>
            {features.map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <aside className="app-consent-notice" aria-labelledby="consent-title">
          <strong id="consent-title">
            위치 공유는 선택이며 철회할 수 있습니다.
          </strong>
          <p>
            위치정보는 이용자와 보호자가 명시적으로 동의한 경우에만 확인하며,
            이용자는 언제든 앱 설정에서 동의를 철회할 수 있도록 기획합니다.
          </p>
        </aside>
      </div>

      <div
        className="app-phone"
        role="img"
        aria-label={`${modes.find((mode) => mode.id === activeMode)?.label} 화면 목업`}
      >
        <div className="app-phone-top" aria-hidden="true">
          <span />
        </div>
        <div className="app-phone-header">
          <div>
            <span>CANE MATE</span>
            <strong>
              {activeMode === "user" ? "안녕하세요" : "연결된 이용자"}
            </strong>
          </div>
          <span className="app-connection-state">
            {activeMode === "user" ? "기기 연결됨" : "동의 확인됨"}
          </span>
        </div>

        {activeMode === "user" ? (
          <div className="app-voice-card">
            <span style={{ color: "#8fc9ff" }}>VOICE GUIDE</span>
            <strong>음성 길 안내</strong>
            <p>이어폰을 통해 다음 이동 정보를 안내하는 화면입니다.</p>
            <div role="status" aria-label="안내 상태: 음성 안내 준비">
              <i aria-hidden="true" />
              음성 안내 준비
            </div>
          </div>
        ) : (
          <div className="app-alert-card">
            <span style={{ color: "#8fc9ff" }}>SAFETY CHECK</span>
            <strong>확인이 필요한 알림 없음</strong>
            <p>
              낙상 의심 알림은 자동 신고가 아닌 상황 확인을 위한 정보입니다.
            </p>
          </div>
        )}

        <div className="app-phone-status-grid">
          <div>
            <span>BATTERY</span>
            <strong>상태 확인</strong>
          </div>
          <div>
            <span>LOCATION</span>
            <strong>{activeMode === "user" ? "공유 관리" : "동의 기반"}</strong>
          </div>
        </div>
        <p className="app-mockup-caption">기능 이해를 위한 기획 UI 목업</p>
      </div>
    </div>
  );
}
