import { demoCouponFixtures, type DemoCoupon } from "@/lib/coupon/types";

export function calculateCouponDiscount(
  subtotal: number,
  coupon?: Pick<DemoCoupon, "discountRate" | "status"> | null,
): number {
  if (!coupon || coupon.status !== "available" || subtotal <= 0) return 0;
  return Math.floor((subtotal * coupon.discountRate) / 100);
}
export function findApplicableCoupon(
  coupons: DemoCoupon[],
  couponId: string | null | undefined,
): DemoCoupon | null {
  if (!couponId) return null;
  return (
    coupons.find(
      (coupon) => coupon.id === couponId && coupon.status === "available",
    ) ?? null
  );
}
function normalizeCoupon(candidate: unknown): DemoCoupon | null {
  if (!candidate || typeof candidate !== "object") return null;
  const value = candidate as Partial<DemoCoupon>;
  const validStatus =
    value.status === "available" ||
    value.status === "used" ||
    value.status === "expired";
  const validSource =
    value.source === "checkout-fixture" ||
    value.source === "experience-feedback";
  if (
    typeof value.id !== "string" ||
    !/^[a-z0-9-]{4,80}$/.test(value.id) ||
    typeof value.name !== "string" ||
    value.discountRate !== 5 ||
    !validStatus ||
    !validSource ||
    value.isDemoFixture !== true
  )
    return null;
  return {
    id: value.id,
    name: value.name.slice(0, 50),
    discountRate: 5,
    status: value.status!,
    source: value.source!,
    isDemoFixture: true,
    feedbackSubmissionId:
      typeof value.feedbackSubmissionId === "string"
        ? value.feedbackSubmissionId.slice(0, 50)
        : undefined,
    orderId:
      typeof value.orderId === "string"
        ? value.orderId.slice(0, 40)
        : undefined,
  };
}
export function normalizeCouponWallet(value: unknown): DemoCoupon[] {
  const saved = Array.isArray(value)
    ? value
        .map(normalizeCoupon)
        .filter((coupon): coupon is DemoCoupon => Boolean(coupon))
    : [];
  const byId = new Map(saved.map((coupon) => [coupon.id, coupon]));
  const fixtures = demoCouponFixtures.map(
    (fixture) => byId.get(fixture.id) ?? { ...fixture },
  );
  const issued = saved.filter(
    (coupon) =>
      coupon.source === "experience-feedback" &&
      !demoCouponFixtures.some((fixture) => fixture.id === coupon.id),
  );
  return [...fixtures, ...issued].slice(0, 10);
}
export function issueExperienceCoupon(
  coupons: DemoCoupon[],
  feedbackSubmissionId: string,
) {
  const existing = coupons.find(
    (coupon) => coupon.source === "experience-feedback",
  );
  if (existing) return { coupons, coupon: existing, issued: false };
  const coupon: DemoCoupon = {
    id: `experience-feedback-${feedbackSubmissionId
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 20)}`,
    name: "체험 피드백 5% 쿠폰",
    discountRate: 5,
    status: "available",
    source: "experience-feedback",
    isDemoFixture: true,
    feedbackSubmissionId,
  };
  return { coupons: [...coupons, coupon], coupon, issued: true };
}
export function markCouponUsed(
  coupons: DemoCoupon[],
  couponId: string,
  orderId: string,
): DemoCoupon[] {
  return coupons.map((coupon) =>
    coupon.id === couponId && coupon.status === "available"
      ? { ...coupon, status: "used", orderId }
      : coupon,
  );
}
