import { describe, expect, it } from "vitest";

import { primaryNavigation, siteRoutes } from "../src/config/routes";
import { resolveAppMode } from "../src/config/site";
import { getDataRuntime } from "../src/lib/data/runtime";

describe("CANE MATE project configuration", () => {
  it("keeps the approved primary navigation order", () => {
    expect(primaryNavigation.map(({ label }) => label)).toEqual([
      "PRODUCT",
      "EXPERIENCE",
      "ESG",
      "BUY",
      "SUPPORT",
    ]);
  });

  it("registers every route required by the site specification", () => {
    expect(siteRoutes).toContain("/");
    expect(siteRoutes).toContain("/checkout/demo-result");
    expect(siteRoutes).toContain("/experience/feedback");
    expect(siteRoutes).toContain("/mypage/inquiries");
  });

  it("defaults unknown runtime values to demo mode", () => {
    expect(resolveAppMode()).toBe("demo");
    expect(resolveAppMode("unexpected")).toBe("demo");
    expect(resolveAppMode("live")).toBe("live");
  });

  it("keeps demo mode free of payments, tracking, and sensitive persistence", () => {
    expect(getDataRuntime("demo")).toEqual({
      mode: "demo",
      persistsSensitiveData: false,
      processesPayments: false,
      tracksLocation: false,
    });
  });
});
