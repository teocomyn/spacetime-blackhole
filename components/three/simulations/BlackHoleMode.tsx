"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  mass: number;
  onUpdate: (stats: { qubits: number; links: number }) => void;
}

export default function BlackHoleMode({ mass, onUpdate }: Props) {
  const count = 3000;
  const lastReport = useRef(0);
  const group = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    const colorObj = new THREE.Color();

    for (let i = 0; i < count; i++) {
        // Accretion disk math
        const radius = 2 + Math.random() * 8;
        const angle = Math.random() * Math.PI * 2;
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4 * (10 / radius); // thickness
        positions[i * 3 + 2] = Math.sin(angle) * radius;
        
        scales[i] = Math.random();

        // Color gradient based on radius
        if (radius < 3.5) colorObj.setHex(0xffffff); // White hot
        else if (radius < 5) colorObj.setHex(0xffddaa); // Yellow
        else colorObj.setHex(0x3a5f8f);
        
        colorObj.toArray(colors, i * 3);
    }
    
    // Store original radiuses and angles for animation
    const meta = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
        const x = positions[i*3];
        const z = positions[i*3+2];
        meta[i*2] = Math.sqrt(x*x + z*z); // radius
        meta[i*2+1] = Math.atan2(z, x); // angle
    }

    return { positions, colors, scales, meta };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3));
    geo.setAttribute('scale', new THREE.BufferAttribute(particles.scales, 1));
    return geo;
  }, [particles]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
        group.current.rotation.x = Math.PI / 6; // Tilt
        group.current.rotation.y = t * 0.1;
    }

    if (diskRef.current) {
        const positions = diskRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < count; i++) {
            const radius = particles.meta[i*2];
            let angle = particles.meta[i*2+1];
            
            // Frame dragging: spin faster closer to center, affected by mass
            const speed = (0.5 + mass * 2) / (radius * radius * 0.5);
            angle += t * speed;
            
            // The mass pulls the accretion disk inwards slightly
            const pullRadius = Math.max(1.5 * mass, radius - mass * 0.5);

            positions[i * 3] = Math.cos(angle) * pullRadius;
            positions[i * 3 + 2] = Math.sin(angle) * pullRadius;
            
            // Wobble
            positions[i * 3 + 1] = Math.sin(t * 2 + i) * 0.2 * (8/pullRadius) * mass;
        }
        
        diskRef.current.geometry.attributes.position.needsUpdate = true;
    }

    const now = performance.now();
    if (now - lastReport.current > 400) {
      lastReport.current = now;
      onUpdate({ qubits: count, links: 0 });
    }
  });

  const eventHorizonRadius = 1.2 * mass;
  
  return (
    <group ref={group}>
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[eventHorizonRadius, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Photon Sphere Glow */}
      <mesh>
        <sphereGeometry args={[eventHorizonRadius + 0.1, 32, 32]} />
        <meshBasicMaterial color="#ffaa55" transparent opacity={0.3 * mass} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ergosphere Wireframe */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <sphereGeometry args={[eventHorizonRadius * 2, 32, 16]} />
        <meshBasicMaterial color="#64c8ff" wireframe transparent opacity={0.05 + 0.1 * mass} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Accretion Disk */}
      <points ref={diskRef} geometry={geometry} material={material} />
    </group>
  );
}
