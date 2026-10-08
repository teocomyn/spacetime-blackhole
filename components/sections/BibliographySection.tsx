"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { BIBLIOGRAPHY } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import { ui } from "@/lib/ui";

const HOME_SOURCES = [
  "bekenstein-1973",
  "hawking-1974",
  "maldacena-1997",
  "ryu-takayanagi-2006",
  "van-raamsdonk-2010",
  "maldacena-susskind-2013",
  "penington-2019",
];

export default function BibliographySection() {
  const { locale } = useApp();
  const t = useTranslation(locale);

  return (
    <section
      id="bibliography"
      className="relative w-full bg-bg-primary py-32 px-6 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            {t.bibliography.title}
          </h2>
          <p className="font-sans text-text-secondary">{t.bibliography.subtitle}</p>
        </div>

        <ul className="space-y-4">
          {BIBLIOGRAPHY.filter((item) => HOME_SOURCES.includes(item.id)).map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/5 bg-bg-secondary/40 p-5 backdrop-blur-sm transition-colors hover:border-accent-blue/30 hover:bg-accent-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="font-sans text-xl text-accent-blue">{item.year}</span>
                  <span className="font-sans text-xs text-text-muted uppercase tracking-wider">
                    {item.authors}
                  </span>
                </div>
                <p className="font-sans text-white group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </p>
                <p className="mt-1 font-sans text-[11px] text-text-dim">{item.venue}</p>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link
            href={pagePath("sources", locale)}
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 text-sm text-text-secondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {ui(locale).seeAllSources} →
          </Link>
        </p>
      </div>
    </section>
  );
}
