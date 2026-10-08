import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SkipLink from "@/components/SkipLink";
import SiteNav from "@/components/navigation/SiteNav";
import LanguageToggle from "@/components/LanguageToggle";
import StarfieldParallax from "@/components/effects/StarfieldParallax";
import { AppProvider } from "@/context/AppContext";
import { SITE_URL } from "@/lib/constants";
import { BIBLIOGRAPHY } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "L'espace n'existe pas : trous noirs et espace-temps émergent";
const description =
  "Une expérience interactive sur les trous noirs, le rayonnement de Hawking et l'idée que l'espace-temps émerge de l'intrication quantique.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Emergent Spacetime",
  authors: [{ name: "Teo Comyn", url: "https://teocomyn.com/" }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description:
      "L'univers n'est pas fait de matière dans l'espace-temps. L'espace-temps est la façon dont l'information s'organise.",
    url: "/",
    siteName: "Emergent Spacetime",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Trous noirs, intrication et espace-temps émergent : une expérience interactive.",
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#050610",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Emergent Spacetime",
  headline: title,
  description,
  url: SITE_URL,
  inLanguage: ["fr", "en"],
  datePublished: "2026-03-15",
  author: { "@type": "Person", name: "Teo Comyn", url: "https://teocomyn.com/" },
  about: [
    { "@type": "Thing", name: "Trou noir", sameAs: "https://fr.wikipedia.org/wiki/Trou_noir" },
    {
      "@type": "Thing",
      name: "Rayonnement de Hawking",
      sameAs: "https://fr.wikipedia.org/wiki/Rayonnement_de_Hawking",
    },
    {
      "@type": "Thing",
      name: "Principe holographique",
      sameAs: "https://fr.wikipedia.org/wiki/Principe_holographique",
    },
    {
      "@type": "Thing",
      name: "Intrication quantique",
      sameAs: "https://fr.wikipedia.org/wiki/Intrication_quantique",
    },
  ],
  citation: BIBLIOGRAPHY.map((item) => ({
    "@type": "ScholarlyArticle",
    name: item.title,
    author: item.authors,
    datePublished: item.year,
    url: item.url,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`dark ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden bg-bg-primary font-sans text-text-primary antialiased">
        <AppProvider>
          <StarfieldParallax />
          <SkipLink />
          <LanguageToggle />
          <ScrollProgress />
          <GrainOverlay />
          <CustomCursor />
          <SiteNav />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
