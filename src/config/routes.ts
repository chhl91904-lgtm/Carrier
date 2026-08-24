export const primaryNavigation = [
  { label: "PRODUCT", href: "/product" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "ESG", href: "/esg" },
  { label: "BUY", href: "/buy" },
  { label: "SUPPORT", href: "/support" },
] as const;

export const siteRoutes = [
  "/",
  "/product",
  "/experience",
  "/experience/feedback",
  "/esg",
  "/buy",
  "/cart",
  "/checkout",
  "/checkout/demo-result",
  "/support",
  "/support/guide",
  "/support/faq",
  "/support/inquiry",
  "/support/as",
  "/login",
  "/signup",
  "/mypage",
  "/mypage/orders",
  "/mypage/coupons",
  "/mypage/reviews",
  "/mypage/inquiries",
] as const;

export type SiteRoute = (typeof siteRoutes)[number];
