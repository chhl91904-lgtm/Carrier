export const brandColors = {
  white: "#ffffff",
  charcoal: "#15191e",
  navy: "#071f3d",
  carrierBlue: "#005eb8",
  carrierBlueHover: "#004b93",
  textMuted: "#4b5968",
  error: "#b42318",
  success: "#176b3a",
  warning: "#8a4b08",
} as const;

export const layoutTokens = {
  containerNarrow: "45rem",
  containerDefault: "75rem",
  containerWide: "90rem",
  controlMinimumSize: "2.75rem",
  breakpoints: {
    mobile: "40rem",
    tablet: "48rem",
    desktop: "64rem",
    wide: "80rem",
  },
} as const;
