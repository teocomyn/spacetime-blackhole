"use client";

import { useApp } from "@/context/AppContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useApp();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="fixed top-6 left-6 z-[120] rounded-full border border-white/10 bg-bg-panel/80 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-text-secondary backdrop-blur-md transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
