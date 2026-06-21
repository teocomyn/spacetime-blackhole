"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { SECTIONS } from "@/lib/constants";

export default function SiteNav() {
  const { locale, reducedEffects, setReducedEffects } = useApp();
  const t = useTranslation(locale);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const label = (id: (typeof SECTIONS)[number]["id"]) => {
    const section = SECTIONS.find((s) => s.id === id);
    return locale === "fr" ? section?.labelFr : section?.labelEn;
  };

  return (
    <nav
      aria-label={t.navAria}
      className="fixed bottom-4 left-1/2 z-[120] max-w-[95vw] -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-bg-panel/90 px-2 py-1.5 backdrop-blur-xl shadow-glow-blue scrollbar-none">
        {SECTIONS.map(({ id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                activeId === id
                  ? "bg-accent-blue/20 text-accent-cyan"
                  : "text-text-muted hover:text-text-secondary"
              }`}
              aria-current={activeId === id ? "true" : undefined}
            >
              {label(id)}
            </a>
          </li>
        ))}
        <li className="ml-1 border-l border-white/10 pl-1">
          <button
            type="button"
            onClick={() => setReducedEffects(!reducedEffects)}
            aria-pressed={reducedEffects}
            className="rounded-full px-2 py-1.5 font-mono text-[10px] text-text-muted hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            title={t.reduceEffects}
          >
            {reducedEffects ? "FX−" : "FX+"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
