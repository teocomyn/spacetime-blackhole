"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  rebuildTrigger: number;
  onUpdate: (stats: { qubits: number; links: number; fps: number }) => void;
}

export default function DecoherenceMode({ rebuildTrigger, onUpdate }: Props) {
  const count = 60;
  const group = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  // Reset progress when trigger changes
  useEffect(() => {
    setProgress(0);
  }, [rebuildTrigger]);

  const nodes = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 4;
      list.push({
        id: i,
        basePos: new THREE.Vector3(x, y, z),
        pos: new THREE.Vector3(x, y, z),
        // Random drift vector for decoherence
        drift: new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 5),
        phase: Math.random() * Math.PI * 2,
        energy: Math.random(),
        spin: Math.random() > 0.5 ? 1 : -1
      });
    }
    return list;
  }, [count]);

  const maxDistBase = 4.5;
  
  const links = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].basePos.distanceTo(nodes[j].basePos);
        if (dist < maxDistBase) {
          list.push({ a: i, b: j, baseDist: dist, breakPoint: Math.random() * 0.8 }); // Break at random progress
        }
      }
    }
    return list;
  }, [nodes, count]);

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();
  const positions = useMemo(() => new Float32Array(links.length * 6), [links.length]);
  const colors = useMemo(() => new Float32Array(links.length * 6), [links.length]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    let drawnLinks = 0;

    // Advance decoherence
    if (progress < 1) {
        setProgress(p => Math.min(1, p + delta * 0.1));
    }

    nodes.forEach((n, i) => {
      const jitter = Math.sin(t * 1.5 + n.phase) * 0.2;
      const jitterY = Math.cos(t * 1.2 + n.phase) * 0.2;
      
      n.pos.copy(n.basePos);
      
      // Add drift based on decoherence progress
      if (progress > 0.1) {
          const p = (progress - 0.1) * 1.1;
          n.pos.add(n.drift.clone().multiplyScalar(p * p));
      }

      n.pos.x += jitter;
      n.pos.y += jitterY;

      tempObject.position.copy(n.pos);
      tempObject.scale.set(0.5, 0.5, 0.5);
      tempObject.updateMatrix();
      if (instancedMeshRef.current) {
        instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
      }
    });

    if (instancedMeshRef.current) {
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    let offset = 0;
    links.forEach((link) => {
      const a = nodes[link.a];
      const b = nodes[link.b];
      
      if (progress < link.breakPoint) {
        drawnLinks++;
        positions[offset] = a.pos.x;
        positions[offset + 1] = a.pos.y;
        positions[offset + 2] = a.pos.z;
        positions[offset + 3] = b.pos.x;
        positions[offset + 4] = b.pos.y;
        positions[offset + 5] = b.pos.z;

        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + link.a);
        const alpha = (0.3 + pulse * 0.7) * (1 - progress/link.breakPoint); // Fade out as it gets close to break point

        for (let j = 0; j < 6; j+=3) {
          colors[offset + j] = 0.2 * alpha; // R
          colors[offset + j + 1] = 0.6 * alpha; // G
          colors[offset + j + 2] = 1.0 * alpha; // B
        }
      } else {
        // Broken link
        for (let j = 0; j < 6; j++) {
           positions[offset + j] = 0;
           colors[offset + j] = 0;
        }
      }
      offset += 6;
    });

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
    
    if (Math.random() < 0.05) onUpdate({ qubits: count, links: drawnLinks, fps: 60 });
  });

  const sphereColors = useMemo(() => {
    const colArray = new Float32Array(count * 3);
    const colorObj = new THREE.Color();
    nodes.forEach((n, i) => {
      // Colors fade to gray as progress increases
      if (n.spin > 0) colorObj.setHex(0x3ca0ff);
      else colorObj.setHex(0xffa064);
      colorObj.toArray(colArray, i * 3);
    });
    return colArray;
  }, [nodes, count]);

  // Interpolate colors to gray in loop would be expensive for instanced buffering, 
  // so we just rely on opacity/drift for the chaotic effect in this implementation.

  return (
    <group ref={group}>
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.08, 16, 16]}>
          <instancedBufferAttribute attach="attributes-color" args={[sphereColors, 3]} />
        </sphereGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={1 - progress * 0.8} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}
