import type { HomeFeatureIconType } from "@/config/home-content";

type IconProps = {
  className?: string;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
};

export function RecyclingIcon({ step }: { step: number }) {
  if (step === 0) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...iconProps}>
        <rect x="9" y="8" width="30" height="30" rx="4" />
        <path d="M15 16h18M17 24h14M19 32h10" />
        <path d="m30 11 5 5-5 5" />
      </svg>
    );
  }

  if (step === 1) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...iconProps}>
        <path d="M24 8a16 16 0 0 1 14 8M40 18l-2-2-3 4" />
        <path d="M38 30a16 16 0 0 1-14 10M22 40l2-1-2-4" />
        <path d="M10 30a16 16 0 0 1 0-14M8 14l2 2 4-2" />
        <path d="M24 16v16M16 24h16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...iconProps}>
      <path d="M17 10h14v8H20v22" />
      <path d="M20 19 14 38M20 32l-6 6M17 24h6" />
      <circle cx="24" cy="15" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HomeFeatureIcon({
  type,
  className,
}: IconProps & { type: HomeFeatureIconType }) {
  const paths: Record<HomeFeatureIconType, React.ReactNode> = {
    sensor: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M3 12h3M18 12h3M12 3v3M12 18v3M17 7l2-2M5 19l2-2" />
      </>
    ),
    haptic: (
      <>
        <path d="M9 7h6v10H9zM5 9l-2 3 2 3M19 9l2 3-2 3" />
        <path d="m2 6-2 6 2 6M22 6l2 6-2 6" />
      </>
    ),
    voice: (
      <>
        <path d="M4 10v4h4l5 4V6L8 10H4z" />
        <path d="M17 9a5 5 0 0 1 0 6M20 6a9 9 0 0 1 0 12" />
      </>
    ),
    shelter: (
      <>
        <path d="m3 11 9-7 9 7M6 10v10h12V10" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
    fall: (
      <>
        <circle cx="9" cy="5" r="2" />
        <path d="m10 8 3 4 4 2M12 11l-4 4-3 5M12 15l4 5" />
      </>
    ),
    climate: (
      <>
        <path d="M8 4v10a4 4 0 1 0 8 0V4a4 4 0 0 0-8 0z" />
        <path d="M12 7v9M3 7h2M2 11h3M19 7h2M19 11h3" />
      </>
    ),
    fold: (
      <>
        <path d="M5 4h4v16H5zM15 4h4v16h-4z" />
        <path d="M9 8h6M9 16h6" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...iconProps}
    >
      {paths[type]}
    </svg>
  );
}
