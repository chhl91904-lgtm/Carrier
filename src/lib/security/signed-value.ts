const encoder = new TextEncoder();
const demoFallbackSecret = "cane-mate-local-demo-session-only";

function encodeBase64Url(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

function decodeBase64Url(value: string): Uint8Array {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

function toArrayBuffer(value: Uint8Array): ArrayBuffer {
  return value.slice().buffer as ArrayBuffer;
}

async function createKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function getSigningSecret(): string {
  const configuredSecret = process.env.AUTH_SESSION_SECRET?.trim();
  if (configuredSecret) return configuredSecret;

  if (process.env.NEXT_PUBLIC_APP_MODE === "live") {
    throw new Error("AUTH_SESSION_SECRET is required in live mode.");
  }

  return demoFallbackSecret;
}

export async function signJsonValue(value: unknown): Promise<string> {
  const payload = encodeBase64Url(encoder.encode(JSON.stringify(value)));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await createKey(getSigningSecret()),
    encoder.encode(payload),
  );
  return `${payload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyJsonValue(
  token?: string | null,
): Promise<unknown | null> {
  if (!token) return null;

  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return null;

    const isValid = await crypto.subtle.verify(
      "HMAC",
      await createKey(getSigningSecret()),
      toArrayBuffer(decodeBase64Url(signature)),
      encoder.encode(payload),
    );
    if (!isValid) return null;

    const decoded = new TextDecoder().decode(decodeBase64Url(payload));
    return JSON.parse(decoded) as unknown;
  } catch {
    return null;
  }
}
