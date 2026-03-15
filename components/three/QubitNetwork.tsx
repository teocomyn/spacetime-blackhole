"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function QubitNetwork({ count = 60 }) {
  const { mouse, viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  
  // Initialize grid and properties
  const nodes = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.5;
      const z = (Math.random() - 0.5) * 5;
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
  }, [count, viewport]);

  const links = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].basePos.distanceTo(nodes[j].basePos);
        if (dist < 4) {
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
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Parallax
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (mouse.y * Math.PI) / 20, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (mouse.x * Math.PI) / 20, 0.05);
    }

    // Update nodes
    nodes.forEach((n, i) => {
      // Breathing motion
      const jitter = Math.sin(t * 1.5 + n.phase) * 0.15;
      const jitterY = Math.cos(t * 1.2 + n.phase) * 0.15;
      
      n.pos.copy(n.basePos);
      n.pos.x += jitter;
      n.pos.y += jitterY;

      // Mouse repulsion
      const mouseWorld = new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      );
      const distToMouse = n.pos.distanceTo(mouseWorld);
      if (distToMouse < 2) {
        const repelForce = (2 - distToMouse) * 0.2;
        const dir = n.pos.clone().sub(mouseWorld).normalize();
        n.pos.add(dir.multiplyScalar(repelForce));
      }

      // Update instanced mesh
      tempObject.position.copy(n.pos);
      const scale = 0.5 + Math.sin(t * 3 + n.phase) * 0.2 + n.energy * 0.3;
      tempObject.scale.set(scale, scale, scale);
      tempObject.updateMatrix();
      if (instancedMeshRef.current) {
        instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
      }
    });

    if (instancedMeshRef.current) {
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update lines
    let offset = 0;
    links.forEach((link, idx) => {
      const a = nodes[link.a];
      const b = nodes[link.b];
      
      positions[offset] = a.pos.x;
      positions[offset + 1] = a.pos.y;
      positions[offset + 2] = a.pos.z;
      
      positions[offset + 3] = b.pos.x;
      positions[offset + 4] = b.pos.y;
      positions[offset + 5] = b.pos.z;

      const dist = a.pos.distanceTo(b.pos);
      const maxDist = 4.5;
      const strength = Math.max(0, 1 - dist / maxDist);
      
      const pulse = 0.5 + 0.5 * Math.sin(t * 2 + link.a);
      const alpha = strength * (0.3 + pulse * 0.7);
      
      const r = 0.2;
      const g = 0.6;
      const b_col = 1.0;

      for (let j = 0; j < 6; j+=3) {
        colors[offset + j] = r * alpha;
        colors[offset + j + 1] = g * alpha;
        colors[offset + j + 2] = b_col * alpha;
      }
      
      offset += 6;
    });

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
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
        <sphereGeometry args={[0.06, 16, 16]}>
          <instancedBufferAttribute attach="attributes-color" args={[sphereColors, 3]} />
        </sphereGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}
