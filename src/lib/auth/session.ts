import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { normalizeReturnTo } from "@/lib/auth/return-to";
import {
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth/session-token";

export const demoSessionCookieName = "cane_mate_demo_session";

export async function readDemoSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(demoSessionCookieName)?.value);
}

export async function createDemoSession() {
  const cookieStore = await cookies();
  cookieStore.set(demoSessionCookieName, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearDemoSession() {
  const cookieStore = await cookies();
  cookieStore.set(demoSessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function requireDemoSession(returnTo: string) {
  const session = await readDemoSession();
  if (!session) {
    redirect(
      `/login?returnTo=${encodeURIComponent(normalizeReturnTo(returnTo))}`,
    );
  }
  return session;
}
