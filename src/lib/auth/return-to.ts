import { siteRoutes } from "@/config/routes";

const defaultReturnTo = "/mypage";

export function normalizeReturnTo(value?: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return defaultReturnTo;
  }

  try {
    const url = new URL(value, "https://canemate.local");
    const isKnownRoute = siteRoutes.some((route) => route === url.pathname);
    const isAuthRoute = url.pathname === "/login" || url.pathname === "/signup";

    if (
      url.origin !== "https://canemate.local" ||
      !isKnownRoute ||
      isAuthRoute
    ) {
      return defaultReturnTo;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return defaultReturnTo;
  }
}
