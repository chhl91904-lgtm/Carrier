import type { DemoSession } from "@/lib/auth/types";
import { signJsonValue, verifyJsonValue } from "@/lib/security/signed-value";

const sessionLifetimeMs = 12 * 60 * 60 * 1000;

export async function createSessionToken(): Promise<string> {
  const session: DemoSession = {
    subject: "demo-user",
    displayName: "데모 회원",
    mode: "demo",
    expiresAt: Date.now() + sessionLifetimeMs,
  };
  return signJsonValue(session);
}

export async function verifySessionToken(
  token?: string | null,
): Promise<DemoSession | null> {
  if (!token) return null;

  try {
    const session = (await verifyJsonValue(
      token,
    )) as Partial<DemoSession> | null;
    if (
      !session ||
      session.subject !== "demo-user" ||
      session.displayName !== "데모 회원" ||
      session.mode !== "demo" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }

    return session as DemoSession;
  } catch {
    return null;
  }
}
