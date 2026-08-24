import { cookies } from "next/headers";
import { normalizeInquiryHistory } from "@/lib/inquiry/domain";
import type { DemoInquiryHistory } from "@/lib/inquiry/types";
import { signJsonValue, verifyJsonValue } from "@/lib/security/signed-value";

const cookieName = "cane_mate_demo_inquiries";
export function createDemoInquiryRepository() {
  return {
    async read(): Promise<DemoInquiryHistory> {
      const store = await cookies();
      return normalizeInquiryHistory(
        await verifyJsonValue(store.get(cookieName)?.value),
      );
    },
    async write(history: DemoInquiryHistory) {
      const store = await cookies();
      store.set(
        cookieName,
        await signJsonValue(normalizeInquiryHistory(history)),
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
