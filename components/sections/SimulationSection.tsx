"use client";

import { useState } from "react";
import SimControlPanel from "../ui/SimControlPanel";
import dynamic from "next/dynamic";

// Lazy load the heavy 3D scene so it does not block initial render
const SimulationOrchestrator = dynamic(
  () => import("../three/simulations/SimulationOrchestrator"),
  { ssr: false }
);

export type SimMode = "entanglement" | "blackhole" | "wormhole" | "decoherence";

export default function SimulationSection() {
  const [mode, setMode] = useState<SimMode>("entanglement");
  
  // Custom states that map to each simulation mode
  const [entanglementStrength, setEntanglementStrength] = useState(1);
  const [mass, setMass] = useState(0.6);
  const [eprStrength, setEprStrength] = useState(1);
  const [rebuildTrigger, setRebuildTrigger] = useState(0);

  // Stats to display in UI (Passed back up from Three.js scene)
  const [stats, setStats] = useState({ qubits: 60, links: 0, fps: 60 });

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
          triggerRebuild={() => setRebuildTrigger(prev => prev + 1)}
        />
      </div>
    </section>
  );
}
