import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/topic/Faq";
import TopicHeader from "@/components/topic/TopicHeader";
import type { Locale } from "@/context/AppContext";
import { BIBLIOGRAPHY } from "@/lib/content";
import { PAGES, REFERENCE_KEYS, TOOL_KEYS, TOPIC_KEYS, pagePath, type PageKey } from "@/lib/routes";
import {
  DATE_MODIFIED,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  type Faq as FaqItem,
} from "@/lib/seo";
import { ISSUES_URL, formatDate, ui } from "@/lib/ui";

type BibliographyId = (typeof BIBLIOGRAPHY)[number]["id"];

export type ExternalSource = { label: string; url: string };

interface Props {
  pageKey: PageKey;
  locale: Locale;
  kicker: string;
  intro: ReactNode;
  readingMinutes?: number;
  faqs?: readonly FaqItem[];
  sources?: readonly BibliographyId[];
  externalSources?: readonly ExternalSource[];
  related?: readonly PageKey[];
  wide?: boolean;
  children: ReactNode;
}

export default function TopicLayout({
  pageKey,
  locale,
  kicker,
  intro,
  readingMinutes,
  faqs,
  sources,
  externalSources,
  related,
  wide = false,
  children,
}: Props) {
  const t = ui(locale);
  const page = PAGES[pageKey];
  const bibliography = sources ? BIBLIOGRAPHY.filter((item) => sources.includes(item.id)) : [];
  const jsonLd: object[] = [articleJsonLd(pageKey, locale), breadcrumbJsonLd(pageKey, locale)];
  if (faqs?.length) jsonLd.push(faqJsonLd(faqs));

  const footerGroup = (title: string, keys: readonly PageKey[]) => (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">{title}</p>
      <ul className="space-y-2">
        {keys.map((key) => (
          <li key={key}>
            <Link
              href={pagePath(key, locale)}
              className="text-sm text-text-secondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              {PAGES[key].navLabel[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <TopicHeader />
      <main id="main-content" className="relative z-[2] px-4 pb-24 pt-10 sm:px-6">
        <div className={`mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={pagePath("home", locale)} className="hover:text-white">
                  {t.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text-secondary">
                {page.navLabel[locale]}
              </li>
            </ol>
          </nav>

          <header className="mb-12">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/80">{kicker}</p>
            <h1 className="font-sans text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
              {page.title[locale]}
            </h1>
            <div className="mt-6 max-w-2xl font-sans text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-text-secondary">
              {intro}
            </div>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
              {readingMinutes && <span>{t.readingTime(readingMinutes)}</span>}
              <span>
                {t.updated} {formatDate(DATE_MODIFIED, locale)}
              </span>
            </p>
          </header>

          <div className="prose-space">{children}</div>

          {faqs?.length ? <Faq title={t.faqTitle} items={faqs} /> : null}

          {(bibliography.length > 0 || externalSources?.length) && (
            <section aria-labelledby="sources-title" className="mt-20">
              <h2 id="sources-title" className="mb-5 font-sans text-xl font-light text-white">
                {t.sourcesTitle}
              </h2>
              <ul className="space-y-2 text-sm">
                {bibliography.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary underline decoration-white/15 underline-offset-4 hover:text-accent-cyan"
                    >
                      {item.authors} ({item.year}), <em>{item.title}</em>
                    </a>
                    <span className="text-text-muted">, {item.venue}</span>
                  </li>
                ))}
                {externalSources?.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary underline decoration-white/15 underline-offset-4 hover:text-accent-cyan"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related?.length ? (
            <section aria-labelledby="related-title" className="mt-20">
              <h2 id="related-title" className="mb-5 font-sans text-xl font-light text-white">
                {t.relatedTitle}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((key) => (
                  <li key={key}>
                    <Link
                      href={pagePath(key, locale)}
                      className="group block h-full rounded-2xl border border-white/10 bg-bg-secondary/40 p-5 transition-colors hover:border-accent-blue/40 hover:bg-accent-blue/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                    >
                      <span className="block font-sans text-base text-white group-hover:text-accent-cyan">
                        {PAGES[key].navLabel[locale]} →
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-text-secondary">
                        {PAGES[key].description[locale]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>

      <footer className="relative z-[2] border-t border-white/[0.06] bg-bg-primary px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroup(t.groupTopics, TOPIC_KEYS)}
          {footerGroup(t.groupTools, TOOL_KEYS)}
          {footerGroup(t.groupReference, REFERENCE_KEYS)}
          <div className="text-sm text-text-secondary">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {t.reportError}
            </p>
            <p className="leading-relaxed">{t.reportErrorHint}</p>
            <a
              href={ISSUES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-accent-cyan underline decoration-accent-cyan/30 underline-offset-4 hover:text-white"
            >
              GitHub →
            </a>
            <p className="mt-8 text-xs text-text-muted">
              {t.credits}{" "}
              <a href="https://teocomyn.com/" className="underline decoration-white/20 underline-offset-4 hover:text-white">
                Teo Comyn
              </a>
              {" - "}
              <a href="https://experaise.com/" className="underline decoration-white/20 underline-offset-4 hover:text-white">
                Experaise
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
