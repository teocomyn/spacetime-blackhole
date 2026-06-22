"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface QubitNetworkConfig {
  count: number;
  sphereSize?: number;
  maxDistBase?: number;
  maxDistMultiplier?: number;
  strength?: number;
  enableMouse?: boolean;
  enableRotation?: boolean;
  coloredLinks?: boolean;
  onLinkCount?: (links: number) => void;
}

interface Node {
  id: number;
  basePos: THREE.Vector3;
  pos: THREE.Vector3;
  phase: number;
  energy: number;
  spin: number;
}

interface Link {
  a: number;
  b: number;
  baseDist: number;
}

function createNodes(
  count: number,
  spreadX: number,
  spreadY: number,
  spreadZ: number
): Node[] {
  const list: Node[] = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * spreadX;
    const y = (Math.random() - 0.5) * spreadY;
    const z = (Math.random() - 0.5) * spreadZ;
    list.push({
      id: i,
      basePos: new THREE.Vector3(x, y, z),
      pos: new THREE.Vector3(x, y, z),
      phase: Math.random() * Math.PI * 2,
      energy: Math.random(),
      spin: Math.random() > 0.5 ? 1 : -1,
    });
  }
  return list;
}

function createLinks(
  nodes: Node[],
  threshold: number
): Link[] {
  const list: Link[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].basePos.distanceTo(nodes[j].basePos);
      if (dist < threshold) list.push({ a: i, b: j, baseDist: dist });
    }
  }
  return list;
}

export default function InstancedQubitNetwork({
  count,
  sphereSize = 0.08,
  maxDistBase = 5,
  maxDistMultiplier = 1,
  strength = 1,
  enableMouse = false,
  enableRotation = false,
  coloredLinks = false,
  onLinkCount,
}: QubitNetworkConfig) {
  const { mouse, viewport } = useThree();
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const spreadX = enableMouse ? viewport.width * 1.5 : 16;
    const spreadY = enableMouse ? viewport.height * 1.5 : 16;
    return createNodes(count, spreadX, spreadY, enableMouse ? 5 : 4);
  }, [count, enableMouse, viewport.width, viewport.height]);

  const links = useMemo(
    () => createLinks(nodes, maxDistBase * maxDistMultiplier * 1.5),
    [nodes, maxDistBase, maxDistMultiplier]
  );

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();
  const positions = useMemo(
    () => new Float32Array(links.length * 6),
    [links.length]
  );
  const colors = useMemo(
    () => new Float32Array(links.length * 6),
    [links.length]
  );

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        opacity: enableMouse ? 0.7 : 0.8,
        blending: THREE.AdditiveBlending,
      }),
    [enableMouse]
  );

  const reportLinks = useCallback(
    (drawn: number) => {
      onLinkCount?.(drawn);
    },
    [onLinkCount]
  );
  const lastLinkReport = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let drawnLinks = 0;

    if (group.current && enableMouse) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (mouse.y * Math.PI) / 20,
        0.05
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (mouse.x * Math.PI) / 20,
        0.05
      );
    } else if (group.current && enableRotation) {
      group.current.rotation.y = Math.sin(t * 0.1) * 0.5;
    }

    nodes.forEach((n, i) => {
      const jitter = Math.sin(t * 1.5 + n.phase) * (enableMouse ? 0.15 : 0.2);
      const jitterY = Math.cos(t * 1.2 + n.phase) * (enableMouse ? 0.15 : 0.2);

      n.pos.copy(n.basePos);
      n.pos.x += jitter;
      n.pos.y += jitterY;

      if (enableMouse) {
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
      }

      tempObject.position.copy(n.pos);
      const scale =
        (enableMouse ? 0.5 : 0.5) +
        Math.sin(t * 3 + n.phase) * 0.2 +
        n.energy * (enableMouse ? 0.3 : 0.4);
      tempObject.scale.set(scale, scale, scale);
      tempObject.updateMatrix();
      instancedMeshRef.current?.setMatrixAt(i, tempObject.matrix);
    });

    if (instancedMeshRef.current) {
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    const currentMaxDist = maxDistBase * strength;
    let offset = 0;

    links.forEach((link) => {
      const a = nodes[link.a];
      const b = nodes[link.b];
      const dist = coloredLinks
        ? a.basePos.distanceTo(b.basePos)
        : a.pos.distanceTo(b.pos);

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
        const alpha =
          connectionStr * (0.3 + pulse * 0.7) * (coloredLinks ? strength : 1);

        let r = 0.2;
        let g = 0.6;
        let bCol = 1.0;

        if (coloredLinks) {
          const isUpLink = a.spin > 0 && b.spin > 0;
          const isDownLink = a.spin < 0 && b.spin < 0;
          if (isDownLink) {
            r = 1.0;
            g = 0.4;
            bCol = 0.2;
          } else if (!isUpLink) {
            r = 0.6;
            g = 0.4;
            bCol = 0.8;
          }
        }

        for (let j = 0; j < 6; j += 3) {
          colors[offset + j] = r * alpha;
          colors[offset + j + 1] = g * alpha;
          colors[offset + j + 2] = bCol * alpha;
        }
      } else {
        for (let j = 0; j < 6; j++) {
          positions[offset + j] = 0;
          colors[offset + j] = 0;
        }
      }
      offset += 6;
    });

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    const now = performance.now();
    if (onLinkCount && now - lastLinkReport.current > 400) {
      lastLinkReport.current = now;
      reportLinks(drawnLinks);
    }
  });

  const sphereColors = useMemo(() => {
    const colArray = new Float32Array(count * 3);
    const colorObj = new THREE.Color();
    nodes.forEach((n, i) => {
      colorObj.setHex(n.spin > 0 ? 0x3ca0ff : 0xffa064);
      colorObj.toArray(colArray, i * 3);
    });
    return colArray;
  }, [nodes, count]);

  return (
    <group ref={group}>
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[sphereSize, 16, 16]} />
        <meshBasicMaterial vertexColors toneMapped={false} />
        <instancedBufferAttribute attach="instanceColor" args={[sphereColors, 3]} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
}
