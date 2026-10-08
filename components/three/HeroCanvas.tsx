"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import QubitNetwork from "./QubitNetwork";

export default function HeroCanvas({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
    >
      <Suspense fallback={null}>
        <QubitNetwork count={50} />
      </Suspense>
    </Canvas>
  );
}
