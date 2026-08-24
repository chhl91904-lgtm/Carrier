import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { brandColors, layoutTokens } from "../src/config/design-tokens";
import { contrastRatio } from "../src/lib/accessibility/contrast";

describe("design tokens", () => {
  it("meets AA contrast for primary text combinations", () => {
    expect(
      contrastRatio(brandColors.charcoal, brandColors.white),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(brandColors.textMuted, brandColors.white),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(brandColors.carrierBlue, brandColors.white),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(brandColors.white, brandColors.navy),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(brandColors.white, brandColors.error),
    ).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#8fc9ff", "#071f3d")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#d8e7f5", brandColors.navy)).toBeGreaterThanOrEqual(
      4.5,
    );
    expect(contrastRatio("#d4e1ed", brandColors.navy)).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  it("uses a 44px minimum control target", () => {
    expect(layoutTokens.controlMinimumSize).toBe("2.75rem");
  });

  it("defines responsive breakpoints from mobile through wide desktop", () => {
    expect(layoutTokens.breakpoints).toEqual({
      mobile: "40rem",
      tablet: "48rem",
      desktop: "64rem",
      wide: "80rem",
    });
  });

  it("includes focus, reduced-motion, and screen-reader CSS policies", () => {
    const css = readFileSync("src/app/components.css", "utf8");
    const globalCss = readFileSync("src/app/globals.css", "utf8");

    expect(css).toContain(".visually-hidden");
    expect(css).toContain(".skip-link:focus-visible");
    expect(css).toContain("min-height: var(--control-min-size)");
    expect(globalCss).toContain(":focus-visible");
    expect(globalCss).toContain("prefers-reduced-motion: reduce");
  });
});
