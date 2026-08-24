"use client";

import { useEffect, useState } from "react";

import { IconButton } from "@/components/ui/icon-button";

function VoiceGuideIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 9v6h3l4 3V6L8 9H5Z" />
      {isPlaying ? (
        <>
          <path d="M16 9.2a4 4 0 0 1 0 5.6" />
          <path d="M18.8 6.5a7.8 7.8 0 0 1 0 11" />
        </>
      ) : (
        <path d="M16 10v4M18.5 8v8" />
      )}
    </svg>
  );
}

export function VoiceGuideButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function handleVoiceGuide() {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setAnnouncement("이 브라우저에서는 음성 안내를 지원하지 않습니다.");
      return;
    }

    const speechSynthesis = window.speechSynthesis;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setAnnouncement("음성 안내를 중지했습니다.");
      return;
    }

    const mainContent = document.querySelector<HTMLElement>("main");
    const pageText = mainContent?.innerText.replace(/\s+/g, " ").trim();

    if (!pageText) {
      setAnnouncement("읽을 수 있는 페이지 내용이 없습니다.");
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${document.title}. ${pageText}`,
    );
    const koreanVoice = speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith("ko"));

    utterance.lang = "ko-KR";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setAnnouncement("음성 안내가 끝났습니다.");
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setAnnouncement("음성 안내를 재생하지 못했습니다.");
    };

    setIsPlaying(true);
    setAnnouncement("현재 페이지의 음성 안내를 시작합니다.");
    speechSynthesis.speak(utterance);
  }

  const label = isPlaying ? "음성 안내 중지" : "현재 페이지 음성 안내 듣기";

  return (
    <>
      <IconButton
        className="voice-guide-button"
        label={label}
        aria-pressed={isPlaying}
        data-playing={isPlaying}
        title={label}
        onClick={handleVoiceGuide}
      >
        <VoiceGuideIcon isPlaying={isPlaying} />
      </IconButton>
      <span className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </span>
    </>
  );
}
