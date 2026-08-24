export const guideSteps = [
  {
    title: "펼치고 잠금 확인",
    body: "4단 shaft를 펼쳐 각 연결부가 단단히 고정됐는지 확인합니다.",
  },
  {
    title: "손목 스트랩 착용",
    body: "검은색 ㄱ자형 Smart Handle의 스트랩을 손목에 맞게 착용합니다.",
  },
  {
    title: "기본 탐색 유지",
    body: "일반 흰지팡이처럼 지면과 주변을 직접 탐색하며 약 40~45° 사용 각도를 참고합니다.",
  },
  {
    title: "높은 장애물 알림 확인",
    body: "전면 ToF 센서가 보조 감지한 위험은 손잡이 햅틱으로 확인합니다.",
  },
  {
    title: "음성 안내는 이어폰으로",
    body: "길 안내는 스마트폰과 이어폰의 음성을 중심으로 듣고 주변 소리도 함께 확인합니다.",
  },
  {
    title: "사용 후 접고 충전",
    body: "안전한 장소에서 4단으로 접고 USB-C 충전부와 Cane Tip 상태를 확인합니다.",
  },
] as const;

export const frequentlyAskedQuestions = [
  {
    question: "CANE MATE가 스스로 길을 찾아 주나요?",
    answer:
      "아닙니다. CANE MATE는 자율주행 지팡이가 아니며 사용자의 기본적인 흰지팡이 탐색을 보조합니다.",
  },
  {
    question: "ToF 센서가 모든 장애물을 감지하나요?",
    answer:
      "아닙니다. 일반 흰지팡이로 놓치기 쉬운 전방의 높은 장애물을 보조 감지하도록 기획했으며 환경과 소재에 따라 감지 한계가 있습니다.",
  },
  {
    question: "낙상이 의심되면 자동으로 신고되나요?",
    answer:
      "즉시 자동 신고를 보장하지 않습니다. 기획 흐름은 보호자에게 확인 알림을 보내고 사용자가 후속 대응을 선택하는 방식입니다.",
  },
  {
    question: "보호자가 언제나 위치를 볼 수 있나요?",
    answer:
      "아닙니다. 위치 확인은 이용자와 보호자의 명시적 동의가 있고 필요한 경우에만 제공하는 것을 원칙으로 합니다.",
  },
  {
    question: "손잡이에서 차가운 바람이 나오나요?",
    answer:
      "소형 팬의 가벼운 바람으로 손의 불편을 줄이는 기능이며 에어컨 같은 강력한 냉방 기능은 아닙니다.",
  },
  {
    question: "현재 바로 구매하고 결제할 수 있나요?",
    answer:
      "현재 사이트의 주문은 실제 결제와 배송이 없는 데모입니다. 149,000원은 기획 목표 판매가입니다.",
  },
] as const;

export const inquiryTypeOptions = [
  { value: "product", label: "제품 문의" },
  { value: "experience", label: "체험존 문의" },
  { value: "app", label: "앱 연결·사용 문의" },
  { value: "customer", label: "고객센터 문의" },
  { value: "after-service", label: "제품 A/S 신청" },
] as const;
