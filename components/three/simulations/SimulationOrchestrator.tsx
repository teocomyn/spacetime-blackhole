"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useCallback, useRef } from "react";
import type { SimMode } from "@/lib/types";

import EntanglementMode from "./EntanglementMode";
import BlackHoleMode from "./BlackHoleMode";
import WormholeMode from "./WormholeMode";
import DecoherenceMode from "./DecoherenceMode";

interface Props {
  mode: SimMode;
  entanglementStrength: number;
  mass: number;
  eprStrength: number;
  rebuildTrigger: number;
  onStatsUpdate: (stats: { qubits: number; links: number; fps: number }) => void;
}

function Scene({
  mode,
  entanglementStrength,
  mass,
  eprStrength,
  rebuildTrigger,
  onStatsUpdate,
}: Props) {
  const statsRef = useRef({ qubits: 60, links: 0, fps: 60 });
  const fpsFrames = useRef(0);
  const fpsLastTime = useRef(performance.now());

  const emitStats = useCallback(() => {
    onStatsUpdate({ ...statsRef.current });
  }, [onStatsUpdate]);

  const handlePartial = useCallback(
    (partial: { qubits: number; links: number }) => {
      statsRef.current = { ...statsRef.current, ...partial };
      emitStats();
    },
    [emitStats]
  );

  useFrame(() => {
    fpsFrames.current += 1;
    const now = performance.now();
    const elapsed = now - fpsLastTime.current;

    if (elapsed >= 500) {
      statsRef.current.fps = Math.round((fpsFrames.current * 1000) / elapsed);
      fpsFrames.current = 0;
      fpsLastTime.current = now;
      emitStats();
    }
  });

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom
        maxDistance={30}
        minDistance={2}
        enableDamping
        dampingFactor={0.05}
      />
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0.5} fade speed={0.5} />

      {mode === "entanglement" && (
        <EntanglementMode strength={entanglementStrength} onUpdate={handlePartial} />
      )}
      {mode === "blackhole" && <BlackHoleMode mass={mass} onUpdate={handlePartial} />}
      {mode === "wormhole" && <WormholeMode eprStrength={eprStrength} onUpdate={handlePartial} />}
      {mode === "decoherence" && (
        <DecoherenceMode rebuildTrigger={rebuildTrigger} onUpdate={handlePartial} />
      )}
    </>
  );
}

export default function SimulationOrchestrator(props: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
      <Scene {...props} />
    </Canvas>
  );
}
