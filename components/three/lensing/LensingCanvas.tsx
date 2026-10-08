"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import LensingQuad from "./LensingQuad";

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
  const scratch = useMemo(() => ({ n: new THREE.Vector3(), u: new THREE.Vector3(), dir: new THREE.Vector3() }), []);

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
    const el = elevation ?? 0.12;
    camera.position.set(Math.sin(orbit.current) * d, Math.sin(el) * d, Math.cos(orbit.current) * d);

    // Près de l'horizon, l'ombre couvre presque tout le ciel : la caméra se retourne vers l'extérieur
    // et élargit son champ pour montrer l'Univers qui se contracte en un disque lumineux.
    const x = Math.min(Math.max((4 - d) / (4 - 1.5), 0), 1);
    const turn = x * x * (3 - 2 * x);
    const { n, u, dir } = scratch;
    n.copy(camera.position).normalize();
    u.set(0, 1, 0).addScaledVector(n, -n.y).normalize();
    const theta = Math.PI * turn;
    dir.copy(n).multiplyScalar(-Math.cos(theta)).addScaledVector(u, Math.sin(theta));
    camera.lookAt(camera.position.x + dir.x, camera.position.y + dir.y, camera.position.z + dir.z);

    const perspective = camera as THREE.PerspectiveCamera;
    const fov = 50 + 45 * turn;
    if (Math.abs(perspective.fov - fov) > 0.01) {
      perspective.fov = fov;
      perspective.updateProjectionMatrix();
    }
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
