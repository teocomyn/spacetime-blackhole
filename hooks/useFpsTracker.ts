"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function useFpsTracker(onFps: (fps: number) => void, intervalMs = 500) {
  const lastReport = useRef(0);
  const frames = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frames.current += 1;
    const now = performance.now();
    const elapsed = now - lastTime.current;

    if (elapsed >= intervalMs) {
      const fps = Math.round((frames.current * 1000) / elapsed);
      onFps(fps);
      frames.current = 0;
      lastTime.current = now;
      lastReport.current = now;
    }
  });
}
