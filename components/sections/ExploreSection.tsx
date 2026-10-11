"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PAGES, REFERENCE_KEYS, TOOL_KEYS, TOPIC_KEYS, pagePath, type PageKey } from "@/lib/routes";
import { ui } from "@/lib/ui";
import { useTilt } from "@/hooks/useTilt";

export default function ExploreSection() {
  const { locale } = useApp();
  const t = ui(locale);
  const tilt = useTilt(9);

  const group = (title: string, keys: readonly PageKey[], featured = false) => (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{title}</h3>
      <ul className={`grid gap-3 ${featured ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3"}`}>
        {keys.map((key) => (
          <li key={key} className="reveal-3d">
            <Link
              href={pagePath(key, locale)}
              {...tilt}
              className="tilt group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-accent-blue/40 hover:bg-accent-blue/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              <span className="font-sans text-lg font-light text-white group-hover:text-accent-cyan">
                {PAGES[key].navLabel[locale]}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {PAGES[key].description[locale]}
              </span>
              <span aria-hidden="true" className="mt-4 text-accent-cyan/70 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      id="explore"
      className="relative z-[70] border-t border-white/[0.06] bg-[#050608] px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/70">
          {t.exploreKicker}
        </p>
        <h2 className="font-sans text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
          {t.exploreTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-text-secondary">{t.exploreSubtitle}</p>

        <div className="mt-14 space-y-12">
          {group(t.groupTopics, TOPIC_KEYS, true)}
          {group(t.groupTools, TOOL_KEYS)}
          {group(t.groupReference, REFERENCE_KEYS)}
        </div>
      </div>
    </section>
  );
}
