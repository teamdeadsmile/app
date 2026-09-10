import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

const SettingsContext = createContext(null);
const STORAGE_KEY = "Deadsmile.app.settings.v1";

const defaults = {
  accent: "yellow",
  compact: false,
  animations: true,
  contentDensity: "comfortable",
};

const accents = {
  yellow: { primary: "#FFCF02", onPrimary: "#211B00", container: "#4B3D00" },
  red: { primary: "#FF4D4D", onPrimary: "#260000", container: "#5C1515" },
  white: { primary: "#F4F4F1", onPrimary: "#171715", container: "#343430" },
};

function readStored() {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return defaults;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return { ...defaults, ...(parsed || {}) };
  } catch {
    return defaults;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(readStored);

  useEffect(() => {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
    }
  }, [settings]);

  const update = (patch) => setSettings((current) => ({ ...current, ...patch }));
  const reset = () => setSettings(defaults);
  const accent = accents[settings.accent] || accents.yellow;

  const value = useMemo(
    () => ({ settings, update, reset, accent }),
    [settings, accent]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => {
  const value = useContext(SettingsContext);
  if (!value) throw new Error("useSettings must be used inside SettingsProvider");
  return value;
};
