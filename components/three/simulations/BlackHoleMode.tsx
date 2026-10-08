"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import LensingQuad from "../lensing/LensingQuad";

interface Props {
  mass: number;
  onUpdate: (stats: { qubits: number; links: number }) => void;
}

// Rendu physique : chaque pixel suit un rayon de lumière dévié par le trou noir.
export default function BlackHoleMode({ mass, onUpdate }: Props) {
  const lastReport = useRef(0);

  useFrame(() => {
    const now = performance.now();
    if (now - lastReport.current > 400) {
      lastReport.current = now;
      onUpdate({ qubits: 0, links: 0 });
    }
  });

  return <LensingQuad rs={1.6 * mass} diskOuter={10} maxSteps={140} />;
}
