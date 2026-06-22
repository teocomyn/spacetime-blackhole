"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EmergenceRing from "@/components/visuals/EmergenceRing";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { useIntersectionActive } from "@/hooks/useIntersectionActive";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function IntuitionSection() {
  const { locale, reducedMotion, reducedEffects } = useApp();
  const t = useTranslation(locale);
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isActive = useIntersectionActive(containerRef);
  const animate = !reducedMotion && !reducedEffects;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const thermoOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.35], [0, 1, 0]);
  const thermoScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 20]);
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const moleculesOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 0.95, 1], [0, 1, 1, 0]);
  const ringOpacity = useTransform(scrollYProgress, [0.64, 0.76, 0.95, 1], [0, 1, 1, 0.2]);
  const ringScale = useTransform(scrollYProgress, [0.64, 0.82], [0.72, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.72, 0.82, 0.95, 1], [0, 0.35, 0.35, 0]);
  const vignetteOpacity = useTransform(scrollYProgress, [0.65, 0.78], [0, 1]);

  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 80;
    return window.matchMedia("(max-width: 768px)").matches ? 60 : 120;
  }, []);

  useEffect(() => {
    if (!animate || !isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: seededRandom(i) * canvas.width,
      y: seededRandom(i + 100) * canvas.height,
      vx: (seededRandom(i + 200) - 0.5) * 2,
      vy: (seededRandom(i + 300) - 0.5) * 2,
      hue: seededRandom(i + 400) > 0.5 ? 210 : 15,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = p.hue === 210 ? "rgba(60,160,255,0.8)" : "rgba(255,96,100,0.8)";
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [animate, isActive, particleCount]);

  return (
    <section ref={containerRef} id="intuition" className="relative h-[350vh] w-full bg-bg-primary">
      <div className="sr-only">
        <h2>{t.intuition.staticTitle}</h2>
        <p>{t.intuition.text1Desc}</p>
        <p>{t.intuition.text2Desc}</p>
        <p>{t.intuition.text3Line2}</p>
      </div>

      {!animate && (
        <div className="mx-auto max-w-3xl space-y-16 px-6 py-24">
          <div>
            <p className="font-sans text-3xl text-white">{t.intuition.text1Title}</p>
            <p className="mt-4 text-text-secondary">{t.intuition.text1Desc}</p>
          </div>
          <div>
            <p className="font-sans text-2xl text-accent-red">{t.intuition.text2Title}</p>
            <p className="mt-4 text-text-secondary">{t.intuition.text2Desc}</p>
          </div>
          <div className="relative rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent px-8 py-12 text-center">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/70">
              {t.intuition.emergenceLabel}
            </p>
            <p className="bg-gradient-to-br from-white via-accent-cyan to-accent-blue bg-clip-text font-sans text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-transparent">
              {t.intuition.text3Title}
            </p>
            <p className="mx-auto mt-6 max-w-lg font-sans text-lg font-light leading-relaxed text-white/75">
              {t.intuition.text3Line1}
            </p>
            <div className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
              {t.intuition.text3Line2}
            </p>
          </div>
        </div>
      )}

      {animate && (
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-40"
            aria-hidden="true"
          />

          {/* Beat 1, wrong question */}
          <motion.div style={{ opacity: text1Opacity }} className="absolute z-20 max-w-2xl px-6 text-center">
            <p className="font-sans text-[clamp(1.8rem,4vw,3.5rem)] font-light leading-tight tracking-[-0.02em] text-white">
              {t.intuition.text1Title}
            </p>
            <p className="mt-6 font-sans text-[clamp(0.9rem,1.5vw,1.1rem)] leading-relaxed text-text-secondary">
              {t.intuition.text1Desc}
            </p>
          </motion.div>

          {/* Beat 2, temperature */}
          <motion.div style={{ opacity: text2Opacity }} className="absolute z-20 max-w-2xl px-6 text-center">
            <p className="font-sans text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.02em] text-accent-red drop-shadow-[0_0_40px_rgba(255,60,60,0.35)]">
              {t.intuition.text2Title}
            </p>
            <p className="mt-6 font-sans text-[clamp(0.95rem,1.8vw,1.2rem)] leading-relaxed text-text-secondary">
              {t.intuition.text2Desc}
            </p>
          </motion.div>

          {/* Beat 3, emergence climax */}
          <motion.div
            style={{ opacity: vignetteOpacity }}
            className="pointer-events-none absolute inset-0 z-[0] bg-[radial-gradient(circle_at_50%_48%,rgba(60,160,255,0.08)_0%,transparent_55%)]"
            aria-hidden="true"
          />

          <EmergenceRing opacity={ringOpacity} scale={ringScale} />

          <motion.div
            style={{ opacity: gridOpacity }}
            className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
            aria-hidden="true"
          >
            <div className="h-full w-full origin-center animate-[spin_120s_linear_infinite] bg-[linear-gradient(rgba(60,160,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(60,160,255,0.12)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,#000_15%,transparent_100%)]" />
          </motion.div>

          <motion.div
            style={{ opacity: text3Opacity }}
            className="absolute z-20 flex max-w-[min(92vw,780px)] flex-col items-center px-6 text-center"
          >
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-cyan/80">
              {t.intuition.emergenceLabel}
            </p>

            <h3 className="bg-gradient-to-br from-white via-[#c8ecff] to-accent-blue bg-clip-text font-sans text-[clamp(2.4rem,6.5vw,4.8rem)] font-light leading-[0.98] tracking-[-0.04em] text-transparent drop-shadow-[0_0_60px_rgba(60,160,255,0.25)]">
              {t.intuition.text3Title}
            </h3>

            <p className="mx-auto mt-8 max-w-[32ch] font-sans text-[clamp(1rem,2vw,1.25rem)] font-light leading-[1.65] text-white/78">
              {t.intuition.text3Line1}
            </p>

            <div className="my-10 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent-blue/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent-deep/40" />
            </div>

            <p className="max-w-md font-sans text-[clamp(0.65rem,1.2vw,0.8rem)] font-medium uppercase leading-relaxed tracking-[0.24em] text-white/40">
              {t.intuition.text3Line2}
            </p>
          </motion.div>

          {/* Thermometer visual */}
          <motion.div
            style={{ opacity: thermoOpacity, scale: thermoScale }}
            className="absolute z-10 flex h-64 w-12 flex-col items-center justify-end pt-4"
          >
            <div className="relative flex h-40 w-6 justify-center rounded-full border-[1.5px] border-white/20 bg-white/5 p-[2px] backdrop-blur-sm">
              <div className="absolute bottom-1 h-[60%] w-4 rounded-full bg-gradient-to-t from-accent-red to-accent-deep shadow-[0_0_15px_rgba(255,60,60,0.6)]" />
            </div>
            <div className="z-10 -mt-2 h-10 w-10 rounded-full border-[1.5px] border-white/20 bg-accent-red shadow-[0_0_20px_rgba(255,60,60,0.8)]" />
          </motion.div>

          <motion.div style={{ opacity: moleculesOpacity }} className="absolute inset-0 z-0" aria-hidden="true" />
        </div>
      )}
    </section>
  );
}
