"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SimControlPanel from "../ui/SimControlPanel";
import { SIM_MODES } from "@/lib/constants";
import type { SimMode } from "@/lib/types";

export type { SimMode };

const SimulationOrchestrator = dynamic(
  () => import("../three/simulations/SimulationOrchestrator"),
  {
    ssr: false,
    loading: () => <SimulationLoader />,
  }
);

function SimulationLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-cyan"
          role="status"
          aria-label="Chargement simulation"
        />
        <p className="font-mono text-xs tracking-widest text-text-muted uppercase">
          WebGL…
        </p>
      </div>
    </div>
  );
}

export default function SimulationSection() {
  const [mode, setMode] = useState<SimMode>("entanglement");
  const [entanglementStrength, setEntanglementStrength] = useState(1);
  const [mass, setMass] = useState(0.6);
  const [eprStrength, setEprStrength] = useState(1);
  const [rebuildTrigger, setRebuildTrigger] = useState(0);
  const [stats, setStats] = useState({ qubits: 60, links: 0, fps: 60 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode && SIM_MODES.includes(urlMode as SimMode)) {
      setMode(urlMode as SimMode);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.replaceState({}, "", url.toString());
  }, [mode]);

  return (
    <section className="relative h-[150vh] w-full bg-bg-primary" id="simulation">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SimulationOrchestrator
            mode={mode}
            entanglementStrength={entanglementStrength}
            mass={mass}
            eprStrength={eprStrength}
            rebuildTrigger={rebuildTrigger}
            onStatsUpdate={setStats}
          />
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
