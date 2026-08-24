import { explodedParts } from "@/config/product-content";

export function ExplodedView() {
  return (
    <div className="exploded-view-layout">
      <figure className="exploded-view-figure">
        <svg
          viewBox="0 0 720 780"
          role="img"
          aria-labelledby="exploded-title exploded-desc"
        >
          <title id="exploded-title">CANE MATE Smart Handle 내부 구조도</title>
          <desc id="exploded-desc">
            검은색 손잡이 외형에서 센서 창, ToF 센서, IMU, 햅틱 모터, BLE와 MCU,
            배터리, USB-C 단자, 소형 송풍기, 온열 필름을 순서대로 분리해 보여
            주는 기획 구조도입니다. 각 번호의 부품 설명은 그림 옆 목록에서도
            확인할 수 있습니다.
          </desc>

          <path d="M360 82v632" className="exploded-axis" />
          <path
            d="M245 63h186c36 0 65 29 65 65v86H245z"
            className="exploded-shell"
          />
          <path
            d="M245 601h251v66c0 36-29 65-65 65H245z"
            className="exploded-shell"
          />
          <text x="371" y="42" className="exploded-shell-label">
            SMART HANDLE · CONCEPT
          </text>

          <ExplodedPart y={128} width={108} number="01" variant="window" />
          <ExplodedPart y={200} width={146} number="02" variant="sensor" />
          <ExplodedPart y={272} width={126} number="03" variant="board" />
          <ExplodedPart y={344} width={104} number="04" variant="motor" />
          <ExplodedPart y={416} width={180} number="05" variant="board" />
          <ExplodedPart y={488} width={154} number="06" variant="battery" />
          <ExplodedPart y={560} width={90} number="07" variant="port" />
          <ExplodedPart y={632} width={120} number="08" variant="fan" />
          <ExplodedPart y={704} width={172} number="09" variant="heat" />
        </svg>
        <figcaption>
          내부 배치는 부품 간 역할을 이해하기 위한 기획 도해이며, 실제 양산
          설계나 확정된 조립 순서를 나타내지 않습니다.
        </figcaption>
      </figure>

      <ol className="exploded-parts-list" aria-label="내부 부품 설명">
        {explodedParts.map((part) => (
          <li key={part.id}>
            <span aria-hidden="true">{part.number}</span>
            <div>
              <h3>{part.name}</h3>
              <p>{part.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ExplodedPart({
  y,
  width,
  number,
  variant,
}: {
  y: number;
  width: number;
  number: string;
  variant:
    | "window"
    | "sensor"
    | "board"
    | "motor"
    | "battery"
    | "port"
    | "fan"
    | "heat";
}) {
  const x = 360 - width / 2;

  return (
    <g className={`exploded-part exploded-part-${variant}`}>
      <path d={`M${x - 72} ${y}h44M${x + width + 28} ${y}h44`} />
      <rect x={x} y={y - 22} width={width} height="44" rx="12" />
      <circle cx={x - 90} cy={y} r="18" />
      <text x={x - 90} y={y + 4} textAnchor="middle">
        {number}
      </text>
      {variant === "sensor" && (
        <>
          <circle cx={360 - 27} cy={y} r="9" />
          <circle cx={360 + 27} cy={y} r="9" />
        </>
      )}
      {variant === "board" && (
        <path d={`M${x + 18} ${y}h${width - 36}M360 ${y - 13}v26`} />
      )}
      {variant === "motor" && <circle cx="360" cy={y} r="13" />}
      {variant === "battery" && (
        <path d={`M${x + 19} ${y - 11}v22M${x + width - 19} ${y - 11}v22`} />
      )}
      {variant === "port" && (
        <rect x="341" y={y - 7} width="38" height="14" rx="7" />
      )}
      {variant === "fan" && (
        <path
          d={`M360 ${y}m-13 0a13 13 0 1 0 26 0a13 13 0 1 0-26 0m13-13v26m-13-13h26`}
        />
      )}
      {variant === "heat" && (
        <path d={`M${x + 18} ${y}c12-19 25 19 37 0s25 19 37 0 25 19 37 0`} />
      )}
    </g>
  );
}
