"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  strength: number;
  onUpdate: (stats: { qubits: number; links: number; fps: number }) => void;
}

export default function EntanglementMode({ strength, onUpdate }: Props) {
  const count = 60;
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 4;
      list.push({
        id: i,
        basePos: new THREE.Vector3(x, y, z),
        pos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2,
        energy: Math.random(),
        spin: Math.random() > 0.5 ? 1 : -1
      });
    }
    return list;
  }, [count]);

  const maxDistBase = 5;
  
  const links = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].basePos.distanceTo(nodes[j].basePos);
        if (dist < maxDistBase * 1.5) {
          list.push({ a: i, b: j, baseDist: dist });
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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let drawnLinks = 0;

    // Optional subtle global rotation
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.1) * 0.5;
    }

    nodes.forEach((n, i) => {
      // Jitter
      const jitter = Math.sin(t * 1.5 + n.phase) * 0.2;
      const jitterY = Math.cos(t * 1.2 + n.phase) * 0.2;
      
      n.pos.copy(n.basePos);
      n.pos.x += jitter;
      n.pos.y += jitterY;

      tempObject.position.copy(n.pos);
      const s = 0.5 + Math.sin(t * 3 + n.phase) * 0.2 + n.energy * 0.4;
      tempObject.scale.set(s, s, s);
      tempObject.updateMatrix();
      if (instancedMeshRef.current) {
        instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
      }
    });

    if (instancedMeshRef.current) {
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    const currentMaxDist = maxDistBase * strength;

    let offset = 0;
    links.forEach((link) => {
      const a = nodes[link.a];
      const b = nodes[link.b];
      const dist = a.basePos.distanceTo(b.basePos);
      
      if (dist < currentMaxDist) {
        drawnLinks++;
        positions[offset] = a.pos.x;
        positions[offset + 1] = a.pos.y;
        positions[offset + 2] = a.pos.z;
        positions[offset + 3] = b.pos.x;
        positions[offset + 4] = b.pos.y;
        positions[offset + 5] = b.pos.z;

        const connectionStr = Math.max(0, 1 - dist / currentMaxDist);
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + link.a);
        const alpha = connectionStr * (0.4 + pulse * 0.6) * strength;

        const isUpLink = a.spin > 0 && b.spin > 0;
        const isDownLink = a.spin < 0 && b.spin < 0;
        
        let r = 0.2, g = 0.6, b_col = 1.0;
        if (isUpLink) { r = 0.2; g = 0.6; b_col = 1.0; }
        else if (isDownLink) { r = 1.0; g = 0.4; b_col = 0.2; }
        else { r = 0.6; g = 0.4; b_col = 0.8; }

        for (let j = 0; j < 6; j+=3) {
          colors[offset + j] = r * alpha;
          colors[offset + j + 1] = g * alpha;
          colors[offset + j + 2] = b_col * alpha;
        }
      } else {
        // Zero out
        for (let j = 0; j < 6; j++) {
           positions[offset + j] = 0;
           colors[offset + j] = 0;
        }
      }
      offset += 6;
    });

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
    
    // Throttle stats update slightly to avoid re-renders (in a real app we'd use a ref to UI)
    if (Math.random() < 0.05) {
       onUpdate({ qubits: count, links: drawnLinks, fps: 60 });
    }
  });

  const sphereColors = useMemo(() => {
    const colArray = new Float32Array(count * 3);
    const colorObj = new THREE.Color();
    nodes.forEach((n, i) => {
      if (n.spin > 0) colorObj.setHex(0x3ca0ff);
      else colorObj.setHex(0xffa064);
      colorObj.toArray(colArray, i * 3);
    });
    return colArray;
  }, [nodes, count]);

  return (
    <group ref={group}>
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.08, 16, 16]}>
          <instancedBufferAttribute attach="attributes-color" args={[sphereColors, 3]} />
        </sphereGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}
