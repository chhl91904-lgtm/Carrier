import { cookies } from "next/headers";
import { normalizeFeedbackHistory } from "@/lib/feedback/domain";
import type { DemoFeedbackHistory } from "@/lib/feedback/types";
import { signJsonValue, verifyJsonValue } from "@/lib/security/signed-value";
const cookieName = "cane_mate_demo_feedback";
export function createDemoFeedbackRepository() {
  return {
    async read(): Promise<DemoFeedbackHistory> {
      const store = await cookies();
      return normalizeFeedbackHistory(
        await verifyJsonValue(store.get(cookieName)?.value),
      );
    },
    async write(history: DemoFeedbackHistory) {
      const store = await cookies();
      store.set(
        cookieName,
        await signJsonValue(normalizeFeedbackHistory(history)),
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
