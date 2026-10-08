"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { SECTIONS } from "@/lib/constants";

export default function SiteNav() {
  const { locale, reducedEffects, setReducedEffects } = useApp();
  const t = useTranslation(locale);
  const [activeId, setActiveId] = useState("hero");
  const listRef = useRef<HTMLUListElement>(null);

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

  // Sur mobile la barre défile horizontalement : on garde la section active visible.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [activeId]);

  const label = (id: (typeof SECTIONS)[number]["id"]) => {
    const section = SECTIONS.find((s) => s.id === id);
    return locale === "fr" ? section?.labelFr : section?.labelEn;
  };

  return (
    <nav
      aria-label={t.navAria}
      className="fixed bottom-4 left-1/2 z-[120] max-w-[95vw] -translate-x-1/2"
    >
      <ul
        ref={listRef}
        className="flex items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-bg-panel/90 px-2 py-1.5 backdrop-blur-xl shadow-glow-blue scrollbar-none"
      >
        {SECTIONS.map(({ id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              data-section={id}
              className={`flex min-h-[32px] items-center whitespace-nowrap rounded-full px-3 font-sans text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
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
            aria-label={t.reduceEffects}
            className="flex min-h-[32px] items-center rounded-full px-2.5 font-sans text-[11px] text-text-muted hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            title={t.reduceEffects}
          >
            {reducedEffects ? "FX−" : "FX+"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
