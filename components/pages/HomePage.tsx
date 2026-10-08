import JsonLd from "@/components/JsonLd";
import LanguageToggle from "@/components/LanguageToggle";
import ScrollProgress from "@/components/ScrollProgress";
import SiteNav from "@/components/navigation/SiteNav";
import ResumeReading from "@/components/navigation/ResumeReading";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import IntuitionSection from "@/components/sections/IntuitionSection";
import SimulationSection from "@/components/sections/SimulationSection";
import TimelineSection from "@/components/sections/TimelineSection";
import UnknownsSection from "@/components/sections/UnknownsSection";
import BibliographySection from "@/components/sections/BibliographySection";
import GlossarySection from "@/components/sections/GlossarySection";
import BlackHoleFinaleSection from "@/components/sections/BlackHoleFinaleSection";
import ObservedSection from "@/components/sections/ObservedSection";
import ExploreSection from "@/components/sections/ExploreSection";
import FooterSection from "@/components/sections/FooterSection";
import type { Locale } from "@/context/AppContext";
import { BIBLIOGRAPHY } from "@/lib/content";
import { PAGES, pagePath } from "@/lib/routes";
import { DATE_MODIFIED, DATE_PUBLISHED, SITE_NAME, absoluteUrl } from "@/lib/seo";

export default function HomePage({ locale }: { locale: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: SITE_NAME,
    headline: PAGES.home.title[locale],
    description: PAGES.home.description[locale],
    url: absoluteUrl(pagePath("home", locale)),
    inLanguage: locale,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: { "@type": "Person", name: "Teo Comyn", url: "https://teocomyn.com/" },
    about: [
      locale === "fr"
        ? { "@type": "Thing", name: "Trou noir", sameAs: "https://fr.wikipedia.org/wiki/Trou_noir" }
        : { "@type": "Thing", name: "Black hole", sameAs: "https://en.wikipedia.org/wiki/Black_hole" },
      locale === "fr"
        ? { "@type": "Thing", name: "Rayonnement de Hawking", sameAs: "https://fr.wikipedia.org/wiki/Rayonnement_de_Hawking" }
        : { "@type": "Thing", name: "Hawking radiation", sameAs: "https://en.wikipedia.org/wiki/Hawking_radiation" },
      locale === "fr"
        ? { "@type": "Thing", name: "Principe holographique", sameAs: "https://fr.wikipedia.org/wiki/Principe_holographique" }
        : { "@type": "Thing", name: "Holographic principle", sameAs: "https://en.wikipedia.org/wiki/Holographic_principle" },
      locale === "fr"
        ? { "@type": "Thing", name: "Intrication quantique", sameAs: "https://fr.wikipedia.org/wiki/Intrication_quantique" }
        : { "@type": "Thing", name: "Quantum entanglement", sameAs: "https://en.wikipedia.org/wiki/Quantum_entanglement" },
    ],
    citation: BIBLIOGRAPHY.map((item) => ({
      "@type": "ScholarlyArticle",
      name: item.title,
      author: item.authors,
      datePublished: item.year,
      url: item.url,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <LanguageToggle />
      <ScrollProgress />
      <SiteNav />
      <ResumeReading />
      <main id="main-content" className="relative flex min-h-screen w-full flex-col">
        <HeroSection />
        <ProblemSection />
        <IntuitionSection />
        <SimulationSection />
        <TimelineSection />
        <UnknownsSection />
        <BibliographySection />
        <GlossarySection />
        <BlackHoleFinaleSection />
        <ObservedSection />
        <ExploreSection />
        <FooterSection />
      </main>
    </>
  );
}
