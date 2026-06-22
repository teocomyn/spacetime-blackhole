"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  alpha: number;
  size: number;
}

const CODE_CHARS = "01{}[]();=<>constletfnifreturn".split("");

export default function AccretionParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, reducedEffects } = useApp();

  useEffect(() => {
    if (reducedMotion || reducedEffects) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const cx = () => canvas.width * 0.5;
    const cy = () => canvas.height * 0.48;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      particles = Array.from({ length: 90 }, () => spawn(true));
    };

    const spawn = (randomEdge = false): Particle => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const edge = randomEdge ? Math.floor(Math.random() * 4) : 0;
      let x = Math.random() * w;
      let y = Math.random() * h;
      if (edge === 0) y = -10;
      if (edge === 1) x = w + 10;
      if (edge === 2) y = h + 10;
      if (edge === 3) x = -10;
      return {
        x,
        y,
        vx: 0,
        vy: 0,
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]!,
        alpha: 0.15 + Math.random() * 0.55,
        size: 9 + Math.random() * 7,
      };
    };

    const tick = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const dx = cx() - p.x;
        const dy = cy() - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = 0.0008 * dist + 0.04;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        const spiral = 0.002 * dist;
        p.x += -dy * spiral;
        p.y += dx * spiral;

        ctx.font = `${p.size}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = `rgba(180, 210, 240, ${p.alpha * Math.min(1, dist / 120)})`;
        ctx.fillText(p.char, p.x, p.y);

        if (dist < 24) {
          particles[i] = spawn();
        }
      }

      const grad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), Math.min(w, h) * 0.35);
      grad.addColorStop(0, "rgba(45, 90, 140, 0.12)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, reducedEffects]);

  if (reducedMotion || reducedEffects) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[6] h-full w-full opacity-40 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
