import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import SkipLink from "@/components/SkipLink";
import StarfieldParallax from "@/components/effects/StarfieldParallax";
import JsonLd from "@/components/JsonLd";
import { AppProvider, type Locale } from "@/context/AppContext";
import { SITE_URL } from "@/lib/constants";
import { SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function rootMetadata(locale: Locale): Metadata {
  const verification = process.env.GOOGLE_SITE_VERIFICATION;
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: "Teo Comyn", url: "https://teocomyn.com/" }],
    robots: { index: true, follow: true },
    manifest: "/site.webmanifest",
    icons: {
      icon: [{ url: "/brand/icon", sizes: "48x48", type: "image/png" }],
      apple: [{ url: "/brand/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    ...(verification ? { verification: { google: verification } } : {}),
    other: { "content-language": locale },
  };
}

export const rootViewport: Viewport = {
  themeColor: "#050610",
  colorScheme: "dark",
};

export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: locale === "fr" ? SITE_URL : `${SITE_URL}/en`,
    inLanguage: locale,
    author: { "@type": "Person", name: "Teo Comyn", url: "https://teocomyn.com/" },
  };

  return (
    <html lang={locale} className={`dark ${inter.variable}`}>
      <body className="overflow-x-hidden bg-bg-primary font-sans text-text-primary antialiased">
        <JsonLd data={websiteLd} />
        <AppProvider locale={locale}>
          <StarfieldParallax />
          <SkipLink />
          <GrainOverlay />
          <CustomCursor />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
