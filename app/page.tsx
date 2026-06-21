import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import IntuitionSection from "@/components/sections/IntuitionSection";
import SimulationSection from "@/components/sections/SimulationSection";
import TimelineSection from "@/components/sections/TimelineSection";
import UnknownsSection from "@/components/sections/UnknownsSection";
import BibliographySection from "@/components/sections/BibliographySection";
import GlossarySection from "@/components/sections/GlossarySection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main id="main-content" className="relative flex min-h-screen flex-col w-full">
      <HeroSection />
      <ProblemSection />
      <IntuitionSection />
      <SimulationSection />
      <TimelineSection />
      <UnknownsSection />
      <BibliographySection />
      <GlossarySection />
      <FooterSection />
    </main>
  );
}
