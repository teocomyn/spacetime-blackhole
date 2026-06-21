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

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  reducedEffects: boolean;
  setReducedEffects: (value: boolean) => void;
  reducedMotion: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [reducedEffects, setReducedEffects] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("locale") as Locale | null;
    if (stored === "fr" || stored === "en") setLocaleState(stored);

    const effects = window.localStorage.getItem("reducedEffects");
    if (effects === "true") setReducedEffects(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("locale", next);
    document.documentElement.lang = next;
  }, []);

  const setReducedEffectsPersist = useCallback((value: boolean) => {
    setReducedEffects(value);
    window.localStorage.setItem("reducedEffects", String(value));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      reducedEffects,
      setReducedEffects: setReducedEffectsPersist,
      reducedMotion,
    }),
    [locale, setLocale, reducedEffects, setReducedEffectsPersist, reducedMotion]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
