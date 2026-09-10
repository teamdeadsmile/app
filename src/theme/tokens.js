import { Platform } from "react-native";

export const colors = {
  background: "#080808",
  surface: "#111111",
  surfaceContainer: "#171717",
  surfaceContainerHigh: "#202020",
  surfaceContainerHighest: "#2A2A2A",
  onSurface: "#F5F5F1",
  onSurfaceVariant: "#A9A9A3",
  outline: "#454541",
  outlineVariant: "#2B2B28",
  primary: "#FFCF02",
  onPrimary: "#211B00",
  primaryContainer: "#4B3D00",
  onPrimaryContainer: "#FFE16B",
  error: "#FFB4AB",
  success: "#8DDAA0",
  scrim: "rgba(0,0,0,.72)",
};

export const radius = { xs: 8, sm: 14, md: 20, lg: 28, xl: 36, full: 999 };
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48 };
export const type = {
  display: "SpaceGrotesk_700Bold",
  displayMedium: "SpaceGrotesk_600SemiBold",
  body: "Manrope_400Regular",
  bodyMedium: "Manrope_500Medium",
  bodyBold: "Manrope_700Bold",
};
export const shadow = Platform.select({
  web: { boxShadow: "0 18px 60px rgba(0,0,0,.30)" },
  default: {
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
});
export const layout = { maxWidth: 1180, contentPadding: 20, bottomNavHeight: 92 };
