export type CouponStatus = "available" | "used" | "expired";
export type DemoCoupon = {
  id: string;
  name: string;
  discountRate: 5;
  status: CouponStatus;
  source: "checkout-fixture" | "experience-feedback";
  isDemoFixture: true;
  feedbackSubmissionId?: string;
  orderId?: string;
};
export const demoCouponFixtures: DemoCoupon[] = [
  {
    id: "checkout-demo-available",
    name: "Checkout 상태 검증 5% 쿠폰",
    discountRate: 5,
    status: "available",
    source: "checkout-fixture",
    isDemoFixture: true,
  },
  {
    id: "checkout-demo-used",
    name: "Checkout 상태 검증 5% 쿠폰",
    discountRate: 5,
    status: "used",
    source: "checkout-fixture",
    isDemoFixture: true,
    orderId: "CM-DEMO-SAMPLE",
  },
  {
    id: "checkout-demo-expired",
    name: "Checkout 상태 검증 5% 쿠폰",
    discountRate: 5,
    status: "expired",
    source: "checkout-fixture",
    isDemoFixture: true,
  },
];
export const couponStatusLabels: Record<CouponStatus, string> = {
  available: "사용 가능",
  used: "사용 완료",
  expired: "기간 만료",
};
