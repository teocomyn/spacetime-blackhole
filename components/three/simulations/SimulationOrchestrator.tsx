"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useState } from "react";
import { SimMode } from "../../sections/SimulationSection";

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

function Scene(props: Props) {
  const [fps, setFps] = useState(60);
  
  useFrame((state) => {
    // Simple FPS calculation
    const time = state.clock.elapsedTime;
    // this can be heavy so we just mock ~60 or use a simpler counter
  });

  return (
    <>
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxDistance={30} 
        minDistance={2} 
        enableDamping
        dampingFactor={0.05}
      />
      <ambientLight intensity={0.5} />
      
      {/* Background space */}
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />

      {/* Modes */}
      {props.mode === "entanglement" && <EntanglementMode strength={props.entanglementStrength} onUpdate={props.onStatsUpdate} />}
      {props.mode === "blackhole" && <BlackHoleMode mass={props.mass} onUpdate={props.onStatsUpdate} />}
      {props.mode === "wormhole" && <WormholeMode eprStrength={props.eprStrength} onUpdate={props.onStatsUpdate} />}
      {props.mode === "decoherence" && <DecoherenceMode rebuildTrigger={props.rebuildTrigger} onUpdate={props.onStatsUpdate} />}
    </>
  );
}

export default function SimulationOrchestrator(props: Props) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 18], fov: 45 }} 
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]} // Support retina displays
    >
      <Scene {...props} />
    </Canvas>
  );
}
