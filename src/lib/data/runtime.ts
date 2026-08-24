import { siteConfig, type AppMode } from "@/config/site";

export type DataRuntime = {
  mode: AppMode;
  persistsSensitiveData: boolean;
  processesPayments: boolean;
  tracksLocation: boolean;
};

const runtimeByMode: Record<AppMode, DataRuntime> = {
  demo: {
    mode: "demo",
    persistsSensitiveData: false,
    processesPayments: false,
    tracksLocation: false,
  },
  live: {
    mode: "live",
    persistsSensitiveData: true,
    processesPayments: false,
    tracksLocation: false,
  },
};

export function getDataRuntime(mode = siteConfig.mode): DataRuntime {
  return runtimeByMode[mode];
}
