"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { SECTIONS } from "@/lib/constants";
import { ui } from "@/lib/ui";

export const LAST_SECTION_KEY = "lastSection";

export default function ResumeReading() {
  const { locale } = useApp();
  const t = ui(locale);
  const [target, setTarget] = useState<(typeof SECTIONS)[number] | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LAST_SECTION_KEY);
    } catch {
      return;
    }
    const section = SECTIONS.find((s) => s.id === stored);
    if (!section || section.id === "hero" || window.location.hash || window.scrollY > 200) return;
    setTarget(section);

    const onScroll = () => {
      if (window.scrollY > window.innerHeight) setTarget(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!target) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-[121] flex -translate-x-1/2 items-center gap-1 rounded-full border border-accent-blue/30 bg-bg-panel/95 p-1 pl-1 shadow-glow-blue backdrop-blur-xl">
      <button
        type="button"
        onClick={() => {
          document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
          setTarget(null);
        }}
        className="min-h-[36px] rounded-full px-4 font-sans text-xs text-white transition-colors hover:bg-accent-blue/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      >
        {t.resumeLabel}
        {locale === "fr" ? " : " : ": "}
        <span className="text-accent-cyan">{locale === "fr" ? target.labelFr : target.labelEn}</span> →
      </button>
      <button
        type="button"
        onClick={() => setTarget(null)}
        aria-label={t.resumeDismiss}
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      >
        ×
      </button>
    </div>
  );
}
