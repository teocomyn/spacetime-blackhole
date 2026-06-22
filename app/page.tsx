import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import IntuitionSection from "@/components/sections/IntuitionSection";
import SimulationSection from "@/components/sections/SimulationSection";
import TimelineSection from "@/components/sections/TimelineSection";
import UnknownsSection from "@/components/sections/UnknownsSection";
import BibliographySection from "@/components/sections/BibliographySection";
import GlossarySection from "@/components/sections/GlossarySection";
import BlackHoleFinaleSection from "@/components/sections/BlackHoleFinaleSection";
import BlackHoleCapabilitiesSection from "@/components/sections/BlackHoleCapabilitiesSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
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
      <BlackHoleCapabilitiesSection />
      <FooterSection />
    </main>
  );
}
