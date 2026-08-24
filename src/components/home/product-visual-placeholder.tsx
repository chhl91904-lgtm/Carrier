import { classNames } from "@/lib/ui/class-names";

type ProductVisualPlaceholderProps = {
  className?: string;
  compact?: boolean;
  idPrefix?: string;
};

export function ProductVisualPlaceholder({
  className,
  compact = false,
  idPrefix,
}: ProductVisualPlaceholderProps) {
  const visualId = idPrefix ?? (compact ? "compact-cane" : "hero-cane");
  const titleId = `${visualId}-title`;
  const descriptionId = `${visualId}-description`;

  return (
    <figure
      className={classNames("product-visual-placeholder", className)}
      data-compact={compact || undefined}
    >
      <svg
        viewBox="0 0 460 700"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>CANE MATE 스마트 흰지팡이 기획 형태</title>
        <desc id={descriptionId}>
          흰색 긴 지팡이 축, 검은색 ㄱ자형 스마트 손잡이, 손목 스트랩, 전면의
          작은 ToF 센서, 네 개의 접이식 구간과 검은색 팁을 표현한 제품
          시각화입니다.
        </desc>
        <defs>
          <linearGradient id={`${titleId}-halo`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="1" stopColor="#76bfff" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        <circle
          cx="230"
          cy="350"
          r="205"
          fill={`url(#${titleId}-halo)`}
          stroke="#8dc8ff"
          strokeOpacity="0.24"
        />
        <circle
          cx="230"
          cy="350"
          r="155"
          fill="none"
          stroke="#8dc8ff"
          strokeDasharray="3 13"
          strokeOpacity="0.22"
        />

        <g transform="rotate(10 230 350)">
          <path
            d="M191 126v74"
            stroke="#10151b"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M191 126h100"
            stroke="#10151b"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M290 127c32 0 43 28 25 48-12 13-30 10-30-5"
            fill="none"
            stroke="#10151b"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <rect x="175" y="164" width="34" height="42" rx="9" fill="#1d242c" />
          <circle cx="187" cy="179" r="4" fill="#77c0ff" />
          <circle cx="198" cy="179" r="4" fill="#77c0ff" />
          <circle cx="191" cy="145" r="4" fill="#a9d6ff" />

          <path
            d="M192 201 192 611"
            stroke="#f7fafc"
            strokeWidth="17"
            strokeLinecap="round"
          />
          {[295, 397, 499].map((y) => (
            <g key={y}>
              <rect
                x="181"
                y={y}
                width="22"
                height="14"
                rx="4"
                fill="#4d5966"
              />
              <path d={`M184 ${y + 3}h16`} stroke="#dfe7ee" strokeWidth="2" />
            </g>
          ))}
          <path
            d="M192 610v30"
            stroke="#10151b"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M178 642h28"
            stroke="#10151b"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </g>

        <g className="product-visual-callout" aria-hidden="true">
          <path d="M114 170h45" />
          <circle cx="107" cy="170" r="3" />
          <text x="26" y="164">
            SMART
          </text>
          <text x="26" y="181">
            HANDLE
          </text>

          <path d="M314 252h48" />
          <circle cx="307" cy="252" r="3" />
          <text x="368" y="247">
            ToF
          </text>
          <text x="368" y="264">
            SENSOR
          </text>

          <path d="M97 518h55" />
          <circle cx="159" cy="518" r="3" />
          <text x="27" y="513">
            4-STEP
          </text>
          <text x="27" y="530">
            FOLDING
          </text>
        </g>
      </svg>
      <figcaption>
        기획 형태 시각화 <span aria-hidden="true">·</span> 공식 제품 이미지 교체
        예정
      </figcaption>
    </figure>
  );
}
