import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "Emergent Spacetime | L'espace n'existe pas";
const description =
  "Une expérience interactive explorant comment l'espace-temps pourrait émerger de l'information quantique et de l'intrication.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Emergent Spacetime",
    description:
      "L'univers n'est pas fait de matière dans l'espace-temps. L'espace-temps est la façon dont l'information s'organise.",
    url: SITE_URL,
    siteName: "Emergent Spacetime",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Emergent Spacetime, L'espace n'existe pas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergent Spacetime",
    description:
      "L'espace-temps émerge de l'intrication quantique, expérience interactive.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Emergent Spacetime",
  description,
  inLanguage: ["fr", "en"],
  author: { "@type": "Person", name: "Teo Comyn" },
  about: "Emergent spacetime, holographic principle, ER=EPR",
  url: SITE_URL,
  datePublished: "2026-01-01",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`dark ${dmSans.variable} ${inter.variable}`}>
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
