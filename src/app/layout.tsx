import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/ui/skip-link";
import { readDemoSession } from "@/lib/auth/session";
import { getCartItemCount } from "@/lib/cart/domain";
import { readDemoCart } from "@/lib/cart/repository";

import "@fontsource-variable/inter/wght.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CANE MATE",
    template: "%s | CANE MATE",
  },
  description:
    "재생 소재와 스마트 기술로 시각장애인의 독립적인 이동을 보조하는 CANE MATE 프로젝트",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [session, cart] = await Promise.all([
    readDemoSession(),
    readDemoCart(),
  ]);

  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <SkipLink />
        <SiteHeader
          isAuthenticated={Boolean(session)}
          cartItemCount={getCartItemCount(cart)}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
