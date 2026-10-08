"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "fr" | "en";
export type ReadingLevel = "discover" | "deep";

interface AppContextValue {
  locale: Locale;
  reducedEffects: boolean;
  setReducedEffects: (value: boolean) => void;
  reducedMotion: boolean;
  saveData: boolean;
  readingLevel: ReadingLevel;
  setReadingLevel: (value: ReadingLevel) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Stockage indisponible (navigation privée) : la préférence reste en mémoire.
  }
}

export function AppProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [reducedEffects, setReducedEffects] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [readingLevel, setReadingLevelState] = useState<ReadingLevel>("discover");

  useEffect(() => {
    if (readStorage("reducedEffects") === "true") setReducedEffects(true);
    if (readStorage("readingLevel") === "deep") setReadingLevelState("deep");

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData || connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") {
      setSaveData(true);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const setReducedEffectsPersist = useCallback((value: boolean) => {
    setReducedEffects(value);
    writeStorage("reducedEffects", String(value));
  }, []);

  const setReadingLevel = useCallback((value: ReadingLevel) => {
    setReadingLevelState(value);
    writeStorage("readingLevel", value);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      reducedEffects,
      setReducedEffects: setReducedEffectsPersist,
      reducedMotion,
      saveData,
      readingLevel,
      setReadingLevel,
    }),
    [locale, reducedEffects, setReducedEffectsPersist, reducedMotion, saveData, readingLevel, setReadingLevel]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
