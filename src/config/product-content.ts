import type { HomeFeatureIconType } from "@/config/home-content";

export type ProductFeature = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  notice: string;
  icon: HomeFeatureIconType;
};

export const productFeatures: ReadonlyArray<ProductFeature> = [
  {
    id: "tof-detection",
    number: "01",
    title: "ToF 높은 장애물 보조 감지",
    summary: "일반 흰지팡이가 놓치기 쉬운 전방의 높은 장애물을 살핍니다.",
    detail:
      "전면의 작은 Dual-Camera Style ToF Sensor가 사용자의 진행 방향 앞쪽을 보조적으로 감지하도록 기획했습니다.",
    notice:
      "보조 기능 · 사용 환경에 따라 감지 범위와 결과가 달라질 수 있습니다.",
    icon: "sensor",
  },
  {
    id: "haptic-alert",
    number: "02",
    title: "햅틱 위험 알림",
    summary: "장애물 위험 정보는 손잡이 진동으로 빠르게 전달합니다.",
    detail:
      "길 안내 신호와 혼동하지 않도록 햅틱은 주로 장애물 위험 알림에 사용하고, 경로 안내는 음성을 중심으로 구성합니다.",
    notice:
      "위험 회피를 보장하지 않으며 기존 흰지팡이 사용법을 대신하지 않습니다.",
    icon: "haptic",
  },
  {
    id: "voice-guidance",
    number: "03",
    title: "음성 중심 길 안내",
    summary: "스마트폰과 이어폰을 연결해 경로 정보를 음성으로 안내합니다.",
    detail:
      "CANE MATE와 스마트폰은 기기 상태와 입력을 연결하고, 길 안내 정보는 사용자가 익숙한 이어폰을 통해 전달하는 흐름입니다.",
    notice:
      "앱·연결 기능은 현재 기획 콘셉트이며 실제 연동 범위는 확정 전입니다.",
    icon: "voice",
  },
  {
    id: "shelter-guidance",
    number: "04",
    title: "쉼 버튼과 가까운 쉼터 안내",
    summary: "손잡이의 쉼 버튼으로 가까운 쉼터 탐색을 시작합니다.",
    detail:
      "위치정보 이용에 동의한 경우 스마트폰의 음성 안내를 통해 외부 협업 서비스의 가까운 쉼터로 이동을 보조합니다.",
    notice:
      "위치정보는 명시적 동의가 있을 때만 사용하며 웹사이트에서 추적하지 않습니다.",
    icon: "shelter",
  },
  {
    id: "fall-risk",
    number: "05",
    title: "낙상 위험 감지와 확인 알림",
    summary: "비정상적인 충격과 기울기를 감지해 보호자의 확인을 돕습니다.",
    detail:
      "IMU 기반 낙상 의심 신호가 감지되면 보호자에게 확인 알림을 보내는 흐름이며, 즉시 신고가 실행되는 구조가 아닙니다.",
    notice:
      "감지는 100% 정확하지 않으며 위치 확인은 이용자·보호자 양측 동의가 필요합니다.",
    icon: "fall",
  },
  {
    id: "climate-comfort",
    number: "06",
    title: "여름 송풍 / 겨울 온열",
    summary: "계절에 따른 손의 불편을 줄이는 손잡이 기능입니다.",
    detail:
      "내부 소형 팬은 가벼운 바람을 제공하고, 온열 필름은 추운 날 손잡이의 차가운 감촉을 완화하도록 기획했습니다.",
    notice: "송풍은 냉방장치가 아니며 온열 성능은 검증 전 기획 내용입니다.",
    icon: "climate",
  },
  {
    id: "fold-and-charge",
    number: "07",
    title: "4단 접이식 / USB-C",
    summary: "이동과 보관, 일상적인 충전을 고려한 구조입니다.",
    detail:
      "네 구간으로 접을 수 있는 흰색 shaft와 검은색 Cane Tip을 사용하고, 손잡이의 USB-C 포트로 충전하는 구상입니다.",
    notice: "구조와 충전 방식은 현재 프로젝트의 기획 기준입니다.",
    icon: "fold",
  },
];

export const productDesignDetails = [
  "흰색 긴 shaft",
  "검은색 ㄱ자형 Smart Handle",
  "Wrist Strap",
  "4단 접이식",
  "검은색 Cane Tip",
  "전면 소형 Dual-Camera Style ToF Sensor",
  "조작 버튼",
  "내부 Smart Core와 송풍·온열 구조",
] as const;

export const explodedParts = [
  {
    id: "sensor-window",
    number: "01",
    name: "Sensor Window",
    description:
      "손잡이 앞쪽에서 센서를 보호하면서 감지 방향을 열어 두는 작은 창입니다.",
  },
  {
    id: "tof-sensor",
    number: "02",
    name: "ToF Sensor",
    description:
      "일반 흰지팡이로 놓치기 쉬운 전방의 높은 장애물을 보조 감지하도록 기획한 센서입니다.",
  },
  {
    id: "imu",
    number: "03",
    name: "IMU",
    description:
      "지팡이의 충격과 기울기 변화를 살펴 낙상 의심 상황의 확인 흐름을 돕습니다.",
  },
  {
    id: "haptic-motor",
    number: "04",
    name: "Haptic Motor",
    description:
      "장애물 위험 정보를 손잡이 진동으로 전달해 사용자가 빠르게 알아차리도록 돕습니다.",
  },
  {
    id: "ble-mcu",
    number: "05",
    name: "BLE / MCU",
    description:
      "센서와 버튼 입력을 처리하고 스마트폰 연결을 관리하는 Smart Core의 중심 부품입니다.",
  },
  {
    id: "battery",
    number: "06",
    name: "Battery",
    description:
      "센서와 진동, 연결 기능에 전원을 공급하는 3,000mAh·약 11.1Wh 기획 배터리입니다.",
  },
  {
    id: "usb-c",
    number: "07",
    name: "USB-C",
    description:
      "익숙한 케이블로 제품을 충전할 수 있도록 고려한 손잡이 충전 단자입니다.",
  },
  {
    id: "micro-blower",
    number: "08",
    name: "Micro Blower",
    description:
      "강한 냉방이 아닌 가벼운 바람을 손에 전달하도록 기획한 소형 팬입니다.",
  },
  {
    id: "heating-film",
    number: "09",
    name: "Heating Film",
    description:
      "추운 날 손잡이의 차가운 감촉으로 인한 불편을 덜도록 기획한 온열 필름입니다.",
  },
] as const;

export const productPlanningSpecs = [
  { label: "전체 길이", value: "약 125cm" },
  { label: "구조", value: "4단 접이식" },
  { label: "접은 길이", value: "약 33cm" },
  { label: "충전", value: "USB-C" },
  { label: "배터리", value: "3,000mAh · 약 11.1Wh" },
  { label: "무게", value: "경량 설계 목표 약 350g" },
  { label: "가격", value: "목표 판매가 149,000원" },
] as const;

export const userAppFeatures = [
  "CANE MATE 연결 상태",
  "배터리 상태",
  "쉼터 안내",
  "음성 길 안내",
  "보호자 연결 관리",
  "위치 공유 동의",
  "제품 상태",
  "고객지원",
] as const;

export const guardianAppFeatures = [
  "이용자 연결",
  "낙상 위험 알림",
  "동의 기반 위치 확인",
  "CANE MATE 배터리 상태",
  "제품 상태",
  "긴급 상황 확인",
] as const;
