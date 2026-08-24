export const caneMateProduct = {
  id: "cane-mate",
  name: "CANE MATE",
  unitPrice: 149_000,
  status: "기획 제품 · 데모 구매",
  features: [
    "ToF 높은 장애물 보조 감지",
    "햅틱 위험 알림과 음성 중심 길 안내",
    "4단 접이식 · USB-C 충전 기획",
  ],
} as const;

export const demoCartPolicy = {
  minimumQuantity: 1,
  maximumTotalQuantity: 10,
  persistence: "browser-session-cookie",
} as const;
