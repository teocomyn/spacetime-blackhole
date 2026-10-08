"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lensingFragmentShader, lensingVertexShader } from "./lensingShader";

interface Props {
  /** Rayon de l'horizon en unités de la scène. */
  rs?: number;
  diskNormal?: [number, number, number];
  diskInner?: number;
  diskOuter?: number;
  diskIntensity?: number;
  maxSteps?: number;
  animate?: boolean;
}

export default function LensingQuad({
  rs = 1,
  diskNormal = [0, 1, 0.16],
  diskInner = 3,
  diskOuter = 11,
  diskIntensity = 1.4,
  maxSteps = 180,
  animate = true,
}: Props) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);

  const uniforms = useMemo(
    () => ({
      uCamPos: { value: new THREE.Vector3() },
      uCamWorld: { value: new THREE.Matrix4() },
      uProjInv: { value: new THREE.Matrix4() },
      uRs: { value: rs },
      uTime: { value: 0 },
      uDiskNormal: { value: new THREE.Vector3(...diskNormal) },
      uDiskInner: { value: diskInner },
      uDiskOuter: { value: diskOuter },
      uDiskIntensity: { value: diskIntensity },
      uMaxSteps: { value: maxSteps },
    }),
    // Les uniformes sont créés une fois ; les valeurs sont mises à jour à chaque image.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(({ camera }, delta) => {
    const material = materialRef.current;
    if (!material) return;
    if (animate) elapsed.current += Math.min(delta, 0.1);
    const u = material.uniforms;
    camera.updateMatrixWorld();
    u.uCamPos.value.copy(camera.position);
    u.uCamWorld.value.copy(camera.matrixWorld);
    u.uProjInv.value.copy(camera.projectionMatrixInverse);
    u.uRs.value = rs;
    u.uTime.value = elapsed.current;
    u.uDiskNormal.value.set(...diskNormal);
    u.uDiskInner.value = diskInner;
    u.uDiskOuter.value = diskOuter;
    u.uDiskIntensity.value = diskIntensity;
    u.uMaxSteps.value = maxSteps;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={lensingVertexShader}
        fragmentShader={lensingFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
