"use client";

import { useRef } from "react";
import InstancedQubitNetwork from "../shared/InstancedQubitNetwork";

interface Props {
  strength: number;
  onUpdate: (stats: { qubits: number; links: number }) => void;
}

export default function EntanglementMode({ strength, onUpdate }: Props) {
  const lastReport = useRef(0);

  return (
    <InstancedQubitNetwork
      count={60}
      sphereSize={0.08}
      maxDistBase={5}
      strength={strength}
      enableRotation
      coloredLinks
      onLinkCount={(links) => {
        const now = performance.now();
        if (now - lastReport.current > 400) {
          lastReport.current = now;
          onUpdate({ qubits: 60, links });
        }
      }}
    />
  );
}
