"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import LensingQuad from "./LensingQuad";
import { applyCameraPose } from "./cameraPose";
import { pointer, startPointerTracking } from "@/lib/pointer";

type Pose = { distance: number; azimuth: number; elevation: number; shift: number; fov: number };

// Le défilement de l'accueil devient une approche du trou noir : une pose de caméra par section.
// Dans la section Singularité, trois temps : l'ombre grossit, le disque enveloppe la caméra,
// puis la caméra se retourne vers l'Univers qui se contracte au-dessus de l'horizon.
const ANCHORS = ["hero", "timeline", "unknowns", "bibliography", "glossary", "singularity"] as const;
const SINGULARITY_STOPS = [0.45, 0.78, 1];
const KEYFRAMES: Pose[] = [
  { distance: 30, azimuth: 0, elevation: 0.16, shift: 0.16, fov: 50 },
  { distance: 24, azimuth: 0.9, elevation: 0.04, shift: 0, fov: 50 },
  { distance: 18, azimuth: 1.7, elevation: -0.24, shift: 0, fov: 50 },
  { distance: 14, azimuth: 2.4, elevation: 0.42, shift: 0, fov: 50 },
  { distance: 10, azimuth: 3.0, elevation: 0.12, shift: 0, fov: 50 },
  { distance: 7, azimuth: 3.4, elevation: 0.1, shift: 0, fov: 52 },
  { distance: 3.3, azimuth: 3.6, elevation: 0.07, shift: 0, fov: 74 },
  { distance: 1.6, azimuth: 3.75, elevation: 0.06, shift: 0, fov: 56 },
  { distance: 1.02, azimuth: 3.85, elevation: 0.06, shift: 0, fov: 50 },
];

const QUALITY = [
  { dpr: 0.7, steps: 150 },
  { dpr: 0.55, steps: 120 },
  { dpr: 0.42, steps: 96 },
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function measureAnchors(): number[] | null {
  const tops: number[] = [];
  for (const id of ANCHORS) {
    const el = document.getElementById(id);
    if (!el) return null;
    tops.push(el.getBoundingClientRect().top + window.scrollY);
  }
  const singularity = document.getElementById("singularity");
  if (!singularity) return null;
  const start = singularity.getBoundingClientRect().top + window.scrollY;
  const span = singularity.offsetHeight - window.innerHeight;
  for (const stop of SINGULARITY_STOPS) tops.push(start + span * stop);
  return tops;
}

function poseAt(scroll: number, anchors: number[]): Pose {
  if (scroll <= anchors[0]) return KEYFRAMES[0];
  for (let i = 0; i < anchors.length - 1; i++) {
    if (scroll < anchors[i + 1]) {
      const t = (scroll - anchors[i]) / Math.max(anchors[i + 1] - anchors[i], 1);
      const a = KEYFRAMES[i];
      const b = KEYFRAMES[i + 1];
      const s = smooth(t);
      return {
        distance: Math.exp(lerp(Math.log(a.distance), Math.log(b.distance), t)),
        azimuth: lerp(a.azimuth, b.azimuth, s),
        elevation: lerp(a.elevation, b.elevation, s),
        shift: lerp(a.shift, b.shift, s),
        fov: lerp(a.fov, b.fov, s),
      };
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1];
}

function Journey({ animate, lens }: { animate: boolean; lens: { current: { x: number; y: number; strength: number } } }) {
  const camera = useThree((s) => s.camera);
  const anchors = useRef<number[] | null>(null);
  const parallax = useRef({ x: 0, y: 0 });
  const drift = useRef(0);

  useEffect(() => {
    const remeasure = () => {
      anchors.current = measureAnchors();
    };
    remeasure();
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    window.addEventListener("resize", remeasure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const base = animate && anchors.current ? poseAt(window.scrollY, anchors.current) : KEYFRAMES[0];

    const follow = 1 - Math.pow(0.001, dt);
    parallax.current.x = lerp(parallax.current.x, animate && pointer.active ? pointer.x : 0, follow * 0.35);
    parallax.current.y = lerp(parallax.current.y, animate && pointer.active ? pointer.y : 0, follow * 0.35);
    if (animate) drift.current += dt * 0.015;

    const nearHorizon = base.distance < 4;
    applyCameraPose(camera, {
      distance: base.distance,
      azimuth: base.azimuth + drift.current + parallax.current.x * (nearHorizon ? 0.08 : 0.22),
      elevation: Math.max(-0.9, Math.min(0.9, base.elevation + parallax.current.y * 0.1)),
      viewShift: base.shift,
      baseFov: base.fov,
      turnStart: 2.4,
      turnEnd: 1.2,
    });

    const targetStrength = animate && pointer.active ? 0.15 : 0;
    lens.current.x = lerp(lens.current.x, pointer.x, follow);
    lens.current.y = lerp(lens.current.y, pointer.y, follow);
    lens.current.strength = lerp(lens.current.strength, targetStrength, follow * 0.3);
  });

  return null;
}

function AdaptiveQuality({ initial, onLevel }: { initial: number; onLevel: (level: number) => void }) {
  const setDpr = useThree((s) => s.setDpr);
  const level = useRef(initial);
  const sample = useRef({ time: 0, frames: 0 });

  useEffect(() => {
    setDpr(QUALITY[initial].dpr);
  }, [initial, setDpr]);

  useFrame((_, delta) => {
    sample.current.time += delta;
    sample.current.frames += 1;
    if (sample.current.time < 1.5) return;
    const avg = sample.current.time / sample.current.frames;
    sample.current = { time: 0, frames: 0 };
    if (avg > 1 / 40 && level.current < QUALITY.length - 1) {
      level.current += 1;
      setDpr(QUALITY[level.current].dpr);
      onLevel(level.current);
    }
  });

  return null;
}

export default function BackdropCanvas({ active, animate }: { active: boolean; animate: boolean }) {
  const lens = useRef({ x: 0, y: 0, strength: 0 });
  const [initial] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px), (pointer: coarse)").matches ? 2 : 0
  );
  const [level, setLevel] = useState(initial);

  useEffect(() => {
    startPointerTracking();
  }, []);

  return (
    <Canvas
      camera={{ fov: 50, near: 0.01, far: 100 }}
      dpr={QUALITY[initial].dpr}
      frameloop={active ? (animate ? "always" : "demand") : "never"}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
    >
      <Journey animate={animate} lens={lens} />
      <AdaptiveQuality initial={initial} onLevel={setLevel} />
      <LensingQuad rs={1} maxSteps={QUALITY[level].steps} animate={animate} cursorLens={lens} diskOuter={12} />
    </Canvas>
  );
}
