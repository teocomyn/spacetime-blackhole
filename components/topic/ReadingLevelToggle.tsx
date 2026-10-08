"use client";

import { useApp } from "@/context/AppContext";
import { ui } from "@/lib/ui";

export default function ReadingLevelToggle() {
  const { locale, readingLevel, setReadingLevel } = useApp();
  const t = ui(locale);

  return (
    <div
      role="radiogroup"
      aria-label={t.readingLevel}
      className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[11px] font-semibold uppercase tracking-wider"
    >
      {(["discover", "deep"] as const).map((level) => {
        const active = readingLevel === level;
        return (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setReadingLevel(level)}
            className={`min-h-[32px] rounded-full px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
              active ? "bg-accent-blue/20 text-accent-cyan" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {level === "discover" ? t.discover : t.deep}
          </button>
        );
      })}
    </div>
  );
}
