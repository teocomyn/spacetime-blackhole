"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import LensingQuad from "./LensingQuad";
import { applyCameraPose } from "./cameraPose";

interface Props {
  /** Distance de la caméra au centre, en rayons de l'horizon. */
  distance: number | MotionValue<number>;
  active: boolean;
  animate: boolean;
  maxSteps?: number;
  elevation?: number;
}

function CameraRig({ distance, elevation, animate }: Pick<Props, "distance" | "elevation" | "animate">) {
  const { camera, invalidate } = useThree();
  const orbit = useRef(0);

  useEffect(() => {
    if (typeof distance === "number") {
      invalidate();
      return;
    }
    return distance.on("change", () => invalidate());
  }, [distance, invalidate]);

  useFrame((_, delta) => {
    const d = typeof distance === "number" ? distance : distance.get();
    if (animate) orbit.current += Math.min(delta, 0.1) * 0.04;
    applyCameraPose(camera, { distance: d, azimuth: orbit.current, elevation: elevation ?? 0.12 });
  });

  return null;
}

export default function LensingCanvas({ distance, active, animate, maxSteps = 180, elevation }: Props) {
  return (
    <Canvas
      camera={{ fov: 50, near: 0.01, far: 100 }}
      dpr={[0.75, 1.25]}
      frameloop={active ? (animate ? "always" : "demand") : "never"}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
    >
      <CameraRig distance={distance} elevation={elevation} animate={animate} />
      <LensingQuad rs={1} maxSteps={maxSteps} animate={animate} />
    </Canvas>
  );
}
