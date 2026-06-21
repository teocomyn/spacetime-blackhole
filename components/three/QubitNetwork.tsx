"use client";

import InstancedQubitNetwork from "./shared/InstancedQubitNetwork";

export default function QubitNetwork({ count = 60 }: { count?: number }) {
  return (
    <InstancedQubitNetwork
      count={count}
      sphereSize={0.06}
      maxDistBase={4}
      enableMouse
    />
  );
}
