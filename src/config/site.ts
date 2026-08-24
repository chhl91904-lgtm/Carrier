export type AppMode = "demo" | "live";

export type ContactPlaceholder = {
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
};

export function resolveAppMode(value?: string): AppMode {
  return value === "live" ? "live" : "demo";
}

function optionalValue(value?: string): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export const verifiedShelterMapUrl = "https://coolingcare.vercel.app/";

export const siteConfig = {
  name: "CANE MATE",
  mode: resolveAppMode(process.env.NEXT_PUBLIC_APP_MODE),
  shelterMapUrl:
    optionalValue(process.env.NEXT_PUBLIC_SHELTER_MAP_URL) ??
    verifiedShelterMapUrl,
  organizations: [
    {
      name: "광주인력개발원",
      address: optionalValue(process.env.NEXT_PUBLIC_GJHRD_ADDRESS),
      phone: optionalValue(process.env.NEXT_PUBLIC_GJHRD_PHONE),
      email: optionalValue(process.env.NEXT_PUBLIC_GJHRD_EMAIL),
    },
    {
      name: "오텍캐리어",
      address: optionalValue(process.env.NEXT_PUBLIC_CARRIER_ADDRESS),
      phone: optionalValue(process.env.NEXT_PUBLIC_CARRIER_PHONE),
      email: optionalValue(process.env.NEXT_PUBLIC_CARRIER_EMAIL),
    },
  ] satisfies ContactPlaceholder[],
} as const;
