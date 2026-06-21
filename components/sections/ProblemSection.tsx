"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { useIntersectionActive } from "@/hooks/useIntersectionActive";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GridLine {
  type: "v" | "h";
  pos: number;
  vx: number;
  vy: number;
  rot: number;
}

interface Particle {
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
  scatterX: number;
  scatterY: number;
}

export default function ProblemSection() {
  const { locale, reducedMotion, reducedEffects } = useApp();
  const t = useTranslation(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isActive = useIntersectionActive(sectionRef);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const explosionTextRef = useRef<HTMLHeadingElement>(null);
  const state = useRef({ progress: 0 });

  const animateScroll = !reducedMotion && !reducedEffects;

  useGSAP(
    () => {
      if (!animateScroll) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            state.current.progress = self.progress;
          },
        },
      });

      tl.to(state.current, { progress: 1, duration: 1, ease: "none" }, 0);
      tl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.05);
      tl.to(text1Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.25);
      tl.fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.35);
      tl.to(text2Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.55);
      tl.fromTo(text3Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.05 }, 0.65);
      tl.to(text3Ref.current, { opacity: 0, scale: 1.05, duration: 0.05 }, 0.78);
      tl.fromTo(
        explosionTextRef.current,
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.05 },
        0.85
      );
      tl.fromTo(text4Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.9);
    },
    { scope: sectionRef, dependencies: [animateScroll] }
  );

  useEffect(() => {
    if (!animateScroll || !isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles: Particle[] = Array.from({ length: 150 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 2,
      size: 1 + Math.random() * 2,
      scatterX: (Math.random() - 0.5) * 200,
      scatterY: (Math.random() - 0.5) * 200,
    }));

    const gridSize = 40;
    const gridLines: GridLine[] = [];
    for (let x = 0; x <= w / 2; x += gridSize) {
      gridLines.push({
        type: "v",
        pos: x / (w / 2),
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        rot: (Math.random() - 0.5) * 0.1,
      });
    }
    for (let y = 0; y <= h; y += gridSize) {
      gridLines.push({
        type: "h",
        pos: y / h,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        rot: (Math.random() - 0.5) * 0.1,
      });
    }

    const monoFont = "600 12px var(--font-geist-mono), ui-monospace, monospace";

    const draw = () => {
      if (!isActive) return;

      const p = state.current.progress;
      const time = performance.now() / 1000;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050610";
      ctx.fillRect(0, 0, w, h);

      const splitX = w / 2;
      const isExplosion = p > 0.8;
      const collisionIntensity = Math.max(0, (p - 0.5) / 0.3);
      const glitchOffset = collisionIntensity * Math.sin(time * 50) * 20;

      ctx.save();
      if (!isExplosion) {
        ctx.beginPath();
        ctx.rect(0, 0, splitX + (p > 0.5 ? glitchOffset : 0), h);
        ctx.clip();
      }

      ctx.strokeStyle = `rgba(60, 160, 255, ${isExplosion ? 1 - (p - 0.8) * 5 : 0.3 + collisionIntensity * 0.5})`;
      ctx.lineWidth = 1;

      if (!isExplosion) {
        for (let x = 0; x <= splitX; x += gridSize) {
          ctx.beginPath();
          for (let y = 0; y <= h; y += 10) {
            const warp = Math.sin(y * 0.01 + time) * 15 * (1 - x / splitX);
            const px = x + warp;
            if (y === 0) ctx.moveTo(px, y);
            else ctx.lineTo(px, y);
          }
          ctx.stroke();
        }
        for (let y = 0; y <= h; y += gridSize) {
          ctx.beginPath();
          for (let x = 0; x <= splitX; x += 10) {
            const warp = Math.sin(x * 0.01 + time) * 15 * (1 - x / splitX);
            const py = y + warp;
            if (x === 0) ctx.moveTo(x, py);
            else ctx.lineTo(x, py);
          }
          ctx.stroke();
        }
      } else {
        const scatterP = (p - 0.8) * 5;
        gridLines.forEach((line) => {
          ctx.beginPath();
          if (line.type === "v") {
            const lx = line.pos * (w / 2) + line.vx * scatterP * 50;
            ctx.moveTo(lx, 0);
            ctx.lineTo(lx + Math.sin(line.rot * scatterP * 10) * h, h);
          } else {
            const ly = line.pos * h + line.vy * scatterP * 50;
            ctx.moveTo(0, ly);
            ctx.lineTo(splitX + Math.cos(line.rot * scatterP * 10) * splitX, ly);
          }
          ctx.stroke();
        });
      }
      ctx.restore();

      ctx.save();
      if (!isExplosion) {
        ctx.beginPath();
        ctx.rect(splitX + (p > 0.5 ? glitchOffset : 0), 0, w / 2, h);
        ctx.clip();
      }

      particles.forEach((part, i) => {
        let px = splitX + part.x * (w / 2);
        let py = part.y * h;

        if (isExplosion) {
          const scatterP = (p - 0.8) * 5;
          px += part.scatterX * scatterP;
          py += part.scatterY * scatterP;
        }

        const alpha = Math.max(0, 0.5 + 0.5 * Math.sin(time * part.speed * 5 + part.phase));

        if (alpha > 0.1) {
          ctx.fillStyle = `rgba(0, 229, 255, ${isExplosion ? alpha * (1 - (p - 0.8) * 5) : alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, part.size + (Math.sin(time * 10 + i) > 0.8 ? 2 : 0), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      if (p < 0.8) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.1, collisionIntensity)})`;
        ctx.lineWidth = 1 + collisionIntensity * 4;
        ctx.beginPath();
        ctx.moveTo(splitX + glitchOffset, 0);
        ctx.lineTo(splitX - glitchOffset, h);
        ctx.stroke();

        if (p < 0.4) {
          ctx.font = monoFont;
          ctx.fillStyle = "rgba(60, 160, 255, 0.8)";
          ctx.textAlign = "center";
          ctx.fillText(t.problem.grLabel, w / 4, h / 2 - 20);
          ctx.font = "400 10px var(--font-satoshi), sans-serif";
          ctx.fillStyle = "rgba(138, 184, 216, 0.6)";
          ctx.fillText(t.problem.grSub, w / 4, h / 2 + 10);

          ctx.font = monoFont;
          ctx.fillStyle = "rgba(0, 229, 255, 0.8)";
          ctx.fillText(t.problem.qmLabel, (w / 4) * 3, h / 2 - 20);
          ctx.font = "400 10px var(--font-satoshi), sans-serif";
          ctx.fillStyle = "rgba(138, 184, 216, 0.6)";
          ctx.fillText(t.problem.qmSub, (w / 4) * 3, h / 2 + 10);
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, [animateScroll, isActive, t.problem]);

  return (
    <section ref={sectionRef} id="problem" className="relative h-[250vh] w-full bg-bg-primary">
      <div className="sr-only">
        <h2>{t.problem.staticTitle}</h2>
        <p>{t.problem.staticSummary}</p>
      </div>

      {!animateScroll && (
        <div className="mx-auto max-w-3xl px-6 py-24 space-y-8">
          <p className="font-serif text-2xl text-white">{t.problem.text1}</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 p-6">
              <h3 className="text-accent-blue font-mono text-sm mb-2">{t.problem.sceneTitle}</h3>
              <p className="text-text-secondary">{t.problem.sceneDesc}</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6">
              <h3 className="text-accent-cyan font-mono text-sm mb-2">{t.problem.actorTitle}</h3>
              <p className="text-text-secondary">{t.problem.actorDesc}</p>
            </div>
          </div>
          <p className="font-serif text-xl text-accent-red">{t.problem.explosion}</p>
          <p className="font-mono text-sm text-text-muted">{t.problem.text4}</p>
        </div>
      )}

      {animateScroll && (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div ref={text1Ref} className="absolute max-w-xl opacity-0">
              <p className="font-serif text-3xl md:text-5xl text-white mb-6">{t.problem.text1}</p>
            </div>

            <div
              ref={text2Ref}
              className="absolute max-w-2xl opacity-0 flex flex-col md:flex-row gap-12 text-left bg-bg-panel p-8 rounded-2xl border border-white/5 backdrop-blur-md"
            >
              <div className="flex-1">
                <h3 className="text-accent-blue font-mono text-sm mb-3">{t.problem.sceneTitle}</h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">{t.problem.sceneDesc}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-accent-cyan font-mono text-sm mb-3">{t.problem.actorTitle}</h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">{t.problem.actorDesc}</p>
              </div>
            </div>

            <div
              ref={text3Ref}
              className="absolute max-w-2xl opacity-0 bg-bg-panel/90 p-8 rounded-xl border border-accent-orange/20 backdrop-blur-md shadow-[0_0_50px_rgba(255,160,100,0.1)]"
            >
              <p className="font-serif text-2xl md:text-4xl text-white">{t.problem.text3Title}</p>
              <p className="mt-4 text-text-secondary font-sans text-sm md:text-base">{t.problem.text3Desc}</p>
            </div>

            <h2
              ref={explosionTextRef}
              className="absolute font-serif text-[clamp(2rem,6vw,5rem)] font-bold text-accent-red leading-none drop-shadow-[0_0_30px_rgba(255,60,60,0.8)] opacity-0 uppercase mix-blend-screen"
            >
              {t.problem.explosion}
            </h2>

            <div ref={text4Ref} className="absolute mt-32 max-w-xl opacity-0">
              <p className="font-mono tracking-widest text-sm text-text-muted uppercase">{t.problem.text4}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
