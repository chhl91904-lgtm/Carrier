import { cookies } from "next/headers";

import { normalizeCouponWallet } from "@/lib/coupon/domain";
import type { DemoCoupon } from "@/lib/coupon/types";
import { signJsonValue, verifyJsonValue } from "@/lib/security/signed-value";

const demoCouponCookieName = "cane_mate_demo_coupons";

export type CouponRepository = {
  read(): Promise<DemoCoupon[]>;
  write(coupons: DemoCoupon[]): Promise<void>;
};

export function createDemoCouponRepository(): CouponRepository {
  return {
    async read() {
      const cookieStore = await cookies();
      const value = await verifyJsonValue(
        cookieStore.get(demoCouponCookieName)?.value,
      );
      return normalizeCouponWallet(value);
    },
    async write(coupons) {
      const cookieStore = await cookies();
      cookieStore.set(
        demoCouponCookieName,
        await signJsonValue(normalizeCouponWallet(coupons)),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        },
      );
    },
  };
}
