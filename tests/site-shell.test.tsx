import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { FloatingShelterButton } from "../src/components/floating-shelter-button";
import { SiteFooter } from "../src/components/site-footer";
import { SiteHeader } from "../src/components/site-header";
import { isActiveRoute } from "../src/lib/navigation/is-active-route";

vi.mock("next/navigation", () => ({
  usePathname: () => "/product",
}));

describe("global site shell", () => {
  it("keeps nested routes and the checkout flow connected to their primary item", () => {
    expect(isActiveRoute("/product", "/product")).toBe(true);
    expect(isActiveRoute("/experience/feedback", "/experience")).toBe(true);
    expect(isActiveRoute("/checkout/demo-result", "/buy")).toBe(true);
    expect(isActiveRoute("/esg", "/buy")).toBe(false);
  });

  it("renders the approved navigation order and signed-out cart state", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const productIndex = html.indexOf("PRODUCT");
    const experienceIndex = html.indexOf("EXPERIENCE");
    const esgIndex = html.indexOf("ESG");
    const buyIndex = html.indexOf("BUY");
    const supportIndex = html.indexOf("SUPPORT");

    expect(productIndex).toBeLessThan(experienceIndex);
    expect(experienceIndex).toBeLessThan(esgIndex);
    expect(esgIndex).toBeLessThan(buyIndex);
    expect(buyIndex).toBeLessThan(supportIndex);
    expect(html).toContain('src="/carrier-logo.svg"');
    expect(html).toContain('alt="Carrier"');
    expect(html).not.toContain("Carrier 로고 placeholder");
    expect(html).toContain("LOGIN");
    expect(html).toContain("비로그인 상태");
    expect(html).toContain('aria-label="장바구니, 상품 0개"');
    expect(html).toContain('aria-current="page"');
  });

  it("renders signed-in status and a visible cart badge", () => {
    const html = renderToStaticMarkup(
      <SiteHeader isAuthenticated cartItemCount={3} />,
    );

    expect(html).toContain("MY PAGE");
    expect(html).toContain("로그인 상태");
    expect(html).toContain('aria-label="장바구니, 상품 3개"');
    expect(html).toContain('class="cart-count"');
  });

  it("keeps unverified contacts as placeholders and links the verified shelter map", () => {
    const footerHtml = renderToStaticMarkup(<SiteFooter />);
    const floatingHtml = renderToStaticMarkup(<FloatingShelterButton />);

    expect(footerHtml).toContain("광주인력개발원");
    expect(footerHtml).toContain("오텍캐리어");
    expect(footerHtml).toContain("정보 확인 중");
    expect(footerHtml).toContain('href="https://coolingcare.vercel.app/"');
    expect(footerHtml).toContain("체험존 찾기");
    expect(floatingHtml).toContain('href="https://coolingcare.vercel.app/"');
    expect(floatingHtml).toContain('target="_blank"');
  });

  it("labels a configured shelter link as an external new-window destination", () => {
    const html = renderToStaticMarkup(
      <FloatingShelterButton shelterMapUrl="https://example.com/shelter-map" />,
    );

    expect(html).toContain('href="https://example.com/shelter-map"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("외부 사이트, 새 창");
  });
});
