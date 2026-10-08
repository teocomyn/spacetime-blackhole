import type { Metadata } from "next";
import type { Locale } from "@/context/AppContext";
import { SITE_URL } from "@/lib/constants";
import { PAGES, pagePath, type PageKey } from "@/lib/routes";

export const SITE_NAME = "Emergent Spacetime";
export const DATE_PUBLISHED = "2026-03-15";
export const DATE_MODIFIED = "2026-10-08";

export function socialImagePath(locale: Locale): string {
  return `/social/${locale}`;
}

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function pageMetadata(key: PageKey, locale: Locale): Metadata {
  const page = PAGES[key];
  const path = pagePath(key, locale);
  const title = page.title[locale];
  const description = page.description[locale];
  const image = {
    url: socialImagePath(locale),
    width: 1200,
    height: 630,
    type: "image/png",
    alt: locale === "fr" ? "Emergent Spacetime, l'espace n'existe pas" : "Emergent Spacetime, space does not exist",
  };

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        fr: page.path.fr,
        en: page.path.en,
        "x-default": page.path.fr,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: key === "home" ? "website" : "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

const AUTHOR = { "@type": "Person", name: "Teo Comyn", url: "https://teocomyn.com/" } as const;

export function articleJsonLd(key: PageKey, locale: Locale) {
  const page = PAGES[key];
  return {
    "@context": "https://schema.org",
    "@type": key === "calculator" || key === "scale" || key === "quiz" ? "WebApplication" : "Article",
    headline: page.title[locale],
    name: page.title[locale],
    description: page.description[locale],
    inLanguage: locale,
    url: absoluteUrl(pagePath(key, locale)),
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: AUTHOR,
    publisher: AUTHOR,
    image: absoluteUrl(socialImagePath(locale)),
    ...(key === "calculator" || key === "scale" || key === "quiz"
      ? { applicationCategory: "EducationalApplication", operatingSystem: "Web", isAccessibleForFree: true }
      : { isAccessibleForFree: true }),
  };
}

export function breadcrumbJsonLd(key: PageKey, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: PAGES.home.navLabel[locale],
        item: absoluteUrl(pagePath("home", locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: PAGES[key].navLabel[locale],
        item: absoluteUrl(pagePath(key, locale)),
      },
    ],
  };
}

export type Faq = { q: string; a: string };

export function faqJsonLd(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
