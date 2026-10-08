"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import ReadingLevelToggle from "@/components/topic/ReadingLevelToggle";
import { useApp } from "@/context/AppContext";
import { PAGES, REFERENCE_KEYS, TOOL_KEYS, TOPIC_KEYS, pagePath, type PageKey } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function TopicHeader() {
  const { locale } = useApp();
  const t = ui(locale);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  const group = (title: string, keys: readonly PageKey[]) => (
    <div>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">{title}</p>
      <ul className="space-y-0.5">
        {keys.map((key) => {
          const href = pagePath(key, locale);
          const current = pathname === href;
          return (
            <li key={key}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-[40px] items-center rounded-lg px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                  current ? "bg-accent-blue/15 text-accent-cyan" : "text-text-secondary hover:bg-white/5 hover:text-white"
                }`}
              >
                {PAGES[key].navLabel[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <header className="sticky top-0 z-[120] border-b border-white/[0.06] bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href={pagePath("home", locale)}
          className="mr-auto flex items-center gap-2.5 rounded-full font-sans text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent-blue bg-black"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(60,160,255,0.9)]" />
          </span>
          <span className="hidden sm:inline">Emergent Spacetime</span>
        </Link>

        <div className="hidden md:block">
          <ReadingLevelToggle />
        </div>

        <LanguageToggle className="relative" />

        <details ref={menuRef} className="relative">
          <summary className="flex min-h-[36px] cursor-pointer list-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[11px] font-semibold uppercase tracking-widest text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan [&::-webkit-details-marker]:hidden">
            {t.menu}
            <span aria-hidden="true">☰</span>
          </summary>
          <nav
            aria-label={t.menu}
            className="absolute right-0 top-[calc(100%+10px)] grid w-[min(92vw,560px)] gap-5 rounded-2xl border border-white/10 bg-bg-secondary/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:grid-cols-3"
          >
            {group(t.groupTopics, TOPIC_KEYS)}
            {group(t.groupTools, TOOL_KEYS)}
            {group(t.groupReference, REFERENCE_KEYS)}
            <div className="sm:col-span-3 md:hidden">
              <ReadingLevelToggle />
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
