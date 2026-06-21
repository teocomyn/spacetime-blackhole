"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Tube } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  eprStrength: number;
  onUpdate: (stats: { qubits: number; links: number }) => void;
}

export default function WormholeMode({ eprStrength, onUpdate }: Props) {
  const lastReport = useRef(0);
  const clusterA = useMemo(() => new THREE.Vector3(-6, 0, 0), []);
  const clusterB = useMemo(() => new THREE.Vector3(6, 0, 0), []);
  
  const nodes = useMemo(() => {
    const list = [];
    for (let c = 0; c < 2; c++) {
      const center = c === 0 ? clusterA : clusterB;
      for (let i = 0; i < 20; i++) {
        list.push({
          pos: new THREE.Vector3(
            center.x + (Math.random() - 0.5) * 4,
            center.y + (Math.random() - 0.5) * 4,
            center.z + (Math.random() - 0.5) * 4
          ),
          phase: Math.random() * Math.PI * 2,
          cluster: c
        });
      }
    }
    return list;
  }, [clusterA, clusterB]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      clusterA,
      new THREE.Vector3(-2, 3, -1),
      new THREE.Vector3(2, -3, 1),
      clusterB
    ]);
  }, [clusterA, clusterB]);

  const group = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObj = new THREE.Object3D();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
        group.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    }

    nodes.forEach((n, i) => {
      tempObj.position.copy(n.pos);
      tempObj.position.y += Math.sin(t + n.phase) * 0.3;
      tempObj.updateMatrix();
      if (meshRef.current) meshRef.current.setMatrixAt(i, tempObj.matrix);
    });

    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;

    const now = performance.now();
    if (now - lastReport.current > 400) {
      lastReport.current = now;
      onUpdate({ qubits: 40, links: Math.floor(eprStrength * 100) });
    }
  });

  const tubeRadius = Math.max(0.01, eprStrength * 1.5);

  return (
    <group ref={group}>
      {/* Qubits */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, 40]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2}
            toneMapped={false}
        />
      </instancedMesh>

      {/* Wormhole Tube */}
      {eprStrength > 0.05 && (
        <Tube args={[curve, 64, tubeRadius, 16, false]}>
          <meshBasicMaterial 
            color="#b480ff" 
            transparent 
            opacity={eprStrength * 0.6}
            wireframe={true}
            blending={THREE.AdditiveBlending}
          />
        </Tube>
      )}

      {/* Glow at ends */}
      <mesh position={clusterA}>
        <sphereGeometry args={[1.5 + eprStrength, 32, 32]} />
        <meshBasicMaterial color="#b480ff" transparent opacity={eprStrength * 0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      
      <mesh position={clusterB}>
        <sphereGeometry args={[1.5 + eprStrength, 32, 32]} />
        <meshBasicMaterial color="#b480ff" transparent opacity={eprStrength * 0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
