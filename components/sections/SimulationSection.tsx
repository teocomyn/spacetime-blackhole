"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SimControlPanel from "../ui/SimControlPanel";
import { SIM_MODES } from "@/lib/constants";
import type { SimMode } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { useHasEntered, useIntersectionActive } from "@/hooks/useIntersectionActive";

export type { SimMode };

type SimStats = { qubits: number; links: number; fps: number };

const SimulationOrchestrator = dynamic(
  () =>
    import("../three/simulations/SimulationOrchestrator").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => <SimulationLoader />,
  }
);

function SimulationLoader() {
  const { locale } = useApp();
  const t = useTranslation(locale);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-cyan"
          role="status"
          aria-label={t.simulation.loading}
        />
        <p className="font-sans text-xs tracking-widest text-text-muted uppercase">
          WebGL…
        </p>
      </div>
    </div>
  );
}

export default function SimulationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setModeState] = useState<SimMode>("entanglement");
  const [entanglementStrength, setEntanglementStrength] = useState(1);
  const [mass, setMass] = useState(0.6);
  const [eprStrength, setEprStrength] = useState(1);
  const [rebuildTrigger, setRebuildTrigger] = useState(0);
  const [stats, setStats] = useState<SimStats>({ qubits: 60, links: 0, fps: 60 });

  const isNear = useIntersectionActive(sectionRef, 0, "400px 0px");
  const shouldMount = useHasEntered(isNear);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode && SIM_MODES.includes(urlMode as SimMode)) {
      setModeState(urlMode as SimMode);
    }
  }, []);

  // L'URL ne change que sur une action du visiteur, pour garder des liens propres.
  const setMode = useCallback((next: SimMode) => {
    setModeState(next);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    window.history.replaceState({}, "", url.toString());
  }, []);

  const handleStats = useCallback((next: SimStats) => {
    setStats((prev) =>
      prev.qubits === next.qubits && prev.links === next.links && prev.fps === next.fps
        ? prev
        : next
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh] w-full bg-bg-primary" id="simulation">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {shouldMount ? (
            <SimulationOrchestrator
              mode={mode}
              active={isNear}
              entanglementStrength={entanglementStrength}
              mass={mass}
              eprStrength={eprStrength}
              rebuildTrigger={rebuildTrigger}
              onStatsUpdate={handleStats}
            />
          ) : (
            <SimulationLoader />
          )}
        </div>

        <SimControlPanel
          mode={mode}
          setMode={setMode}
          stats={stats}
          entanglementStrength={entanglementStrength}
          setEntanglementStrength={setEntanglementStrength}
          mass={mass}
          setMass={setMass}
          eprStrength={eprStrength}
          setEprStrength={setEprStrength}
          triggerRebuild={() => setRebuildTrigger((prev) => prev + 1)}
        />
      </div>
    </section>
  );
}
