"use client";

import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { BIBLIOGRAPHY } from "@/lib/content";

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
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            {t.bibliography.title}
          </h2>
          <p className="font-sans text-text-secondary">{t.bibliography.subtitle}</p>
        </div>

        <ul className="space-y-4">
          {BIBLIOGRAPHY.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/5 bg-bg-secondary/40 p-5 backdrop-blur-sm transition-colors hover:border-accent-blue/30 hover:bg-accent-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="font-serif text-xl text-accent-blue">{item.year}</span>
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    {item.authors}
                  </span>
                </div>
                <p className="font-sans text-white group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </p>
                <p className="mt-1 font-mono text-[11px] text-text-dim">{item.venue}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
