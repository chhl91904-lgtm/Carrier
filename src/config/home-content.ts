export const recyclingSteps = [
  {
    title: "폐에어컨 회수",
    description: "사용을 마친 제품에서 다시 활용할 수 있는 소재를 찾습니다.",
  },
  {
    title: "소재 분리·재생",
    description: "회수 가능한 소재를 분리하고 새로운 쓰임에 맞게 재생합니다.",
  },
  {
    title: "CANE MATE",
    description: "안전성 검증을 거쳐 이동을 보조하는 제품 소재로 활용합니다.",
  },
] as const;

export type HomeFeatureIconType =
  "sensor" | "haptic" | "voice" | "shelter" | "fall" | "climate" | "fold";

export const homeCoreFunctions: ReadonlyArray<{
  title: string;
  summary: string;
  icon: HomeFeatureIconType;
}> = [
  {
    title: "ToF 장애물 감지",
    summary: "전방의 높은 장애물을 보조 감지",
    icon: "sensor",
  },
  {
    title: "햅틱 위험 알림",
    summary: "손잡이 진동으로 위험 정보 전달",
    icon: "haptic",
  },
  {
    title: "음성 길 안내",
    summary: "스마트폰·이어폰을 통한 음성 중심 안내",
    icon: "voice",
  },
  {
    title: "가까운 쉼터 안내",
    summary: "동의 기반 위치정보로 쉼터 탐색 보조",
    icon: "shelter",
  },
  {
    title: "낙상 위험 감지",
    summary: "의심 상황을 감지해 보호자 확인 알림",
    icon: "fall",
  },
  {
    title: "여름 송풍 / 겨울 온열",
    summary: "가벼운 바람과 손잡이 온열로 불편 완화",
    icon: "climate",
  },
  {
    title: "4단 접이식",
    summary: "이동과 보관을 고려한 휴대 구조",
    icon: "fold",
  },
];
