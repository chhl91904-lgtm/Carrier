import { cookies } from "next/headers";

import { normalizeCart } from "@/lib/cart/domain";
import { emptyCart, type DemoCart } from "@/lib/cart/types";
import { signJsonValue, verifyJsonValue } from "@/lib/security/signed-value";

const demoCartCookieName = "cane_mate_demo_cart";

export type CartRepository = {
  read(): Promise<DemoCart>;
  write(cart: DemoCart): Promise<void>;
  clear(): Promise<void>;
};

export function createDemoCartRepository(): CartRepository {
  return {
    async read() {
      const cookieStore = await cookies();
      const value = await verifyJsonValue(
        cookieStore.get(demoCartCookieName)?.value,
      );
      return normalizeCart(value);
    },
    async write(cart) {
      const cookieStore = await cookies();
      cookieStore.set(
        demoCartCookieName,
        await signJsonValue(normalizeCart(cart)),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        },
      );
    },
    async clear() {
      const cookieStore = await cookies();
      cookieStore.set(demoCartCookieName, "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
      });
    },
  };
}

export async function readDemoCart(): Promise<DemoCart> {
  try {
    return await createDemoCartRepository().read();
  } catch {
    return emptyCart;
  }
}
