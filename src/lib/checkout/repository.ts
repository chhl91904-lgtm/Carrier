import { cookies } from "next/headers";

import type { DemoOrder } from "@/lib/checkout/types";
import { signJsonValue, verifyJsonValue } from "@/lib/security/signed-value";

const demoOrderCookieName = "cane_mate_demo_order";

function normalizeDemoOrder(value: unknown): DemoOrder | null {
  if (!value || typeof value !== "object") return null;
  const order = value as Partial<DemoOrder>;
  if (
    typeof order.id !== "string" ||
    typeof order.checkoutToken !== "string" ||
    order.mode !== "demo" ||
    order.status !== "demo-created" ||
    !Array.isArray(order.items) ||
    !Number.isSafeInteger(order.subtotal) ||
    !Number.isSafeInteger(order.discount) ||
    !Number.isSafeInteger(order.total) ||
    order.total !== Number(order.subtotal) - Number(order.discount) ||
    typeof order.createdAt !== "string"
  ) {
    return null;
  }
  return order as DemoOrder;
}

export function createDemoOrderRepository() {
  return {
    async read(): Promise<DemoOrder | null> {
      const cookieStore = await cookies();
      return normalizeDemoOrder(
        await verifyJsonValue(cookieStore.get(demoOrderCookieName)?.value),
      );
    },
    async write(order: DemoOrder) {
      const cookieStore = await cookies();
      cookieStore.set(demoOrderCookieName, await signJsonValue(order), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    },
  };
}
