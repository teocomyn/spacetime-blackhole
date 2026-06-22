"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

export default function StarfieldParallax() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, reducedEffects } = useApp();

  useEffect(() => {
    if (reducedMotion || reducedEffects) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let scrollY = 0;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.4,
      depth: 0.2 + Math.random() * 0.8,
      alpha: 0.15 + Math.random() * 0.55,
    }));

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const parallax = scrollY * star.depth * 0.08;
        const x = star.x * w;
        const y = ((star.y * h - parallax) % h + h) % h;
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${star.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion, reducedEffects]);

  if (reducedMotion || reducedEffects) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}
