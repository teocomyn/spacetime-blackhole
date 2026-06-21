"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const moleculesOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]);
  const qubitsOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.95, 1], [0, 1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 0.4, 0.4, 0]);

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
        <div className="mx-auto max-w-3xl px-6 py-24 space-y-10">
          <p className="font-serif text-3xl text-white">{t.intuition.text1Title}</p>
          <p className="text-text-secondary">{t.intuition.text1Desc}</p>
          <p className="font-serif text-2xl text-accent-red">{t.intuition.text2Title}</p>
          <p className="text-text-secondary">{t.intuition.text2Desc}</p>
          <p className="font-serif text-2xl text-accent-blue">{t.intuition.text3Title}</p>
          <p className="text-text-secondary">{t.intuition.text3Line1}</p>
          <p className="font-mono text-sm text-text-muted uppercase">{t.intuition.text3Line2}</p>
        </div>
      )}

      {animate && (
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-40"
            aria-hidden="true"
          />

          <motion.div style={{ opacity: text1Opacity }} className="absolute z-20 max-w-2xl px-6 text-center">
            <p className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] text-white leading-tight">
              {t.intuition.text1Title}
            </p>
            <p className="mt-6 text-text-secondary font-sans text-[clamp(0.9rem,1.5vw,1.1rem)]">
              {t.intuition.text1Desc}
            </p>
          </motion.div>

          <motion.div style={{ opacity: text2Opacity }} className="absolute z-20 max-w-2xl px-6 text-center">
            <p className="font-serif text-[clamp(2rem,5vw,4rem)] text-accent-red leading-none drop-shadow-md">
              {t.intuition.text2Title}
            </p>
            <p className="mt-6 text-text-secondary font-sans text-[clamp(0.95rem,1.8vw,1.2rem)] leading-relaxed">
              {t.intuition.text2Desc}
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: text3Opacity }}
            className="absolute z-20 max-w-3xl px-6 text-center bg-bg-panel/50 p-8 rounded-3xl backdrop-blur-sm border border-accent-blue/10"
          >
            <p className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] text-accent-blue leading-tight mb-6">
              {t.intuition.text3Title}
            </p>
            <p className="text-text-primary font-sans text-lg font-light mb-4">{t.intuition.text3Line1}</p>
            <p className="text-text-secondary font-mono text-sm tracking-wide uppercase">
              {t.intuition.text3Line2}
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: thermoOpacity, scale: thermoScale }}
            className="absolute z-10 flex flex-col items-center justify-end h-64 w-12 pt-4"
          >
            <div className="h-40 w-6 rounded-full border-[1.5px] border-white/20 bg-white/5 relative flex justify-center p-[2px] backdrop-blur-sm">
              <div className="absolute bottom-1 w-4 rounded-full bg-gradient-to-t from-accent-red to-orange-500 h-[60%] shadow-[0_0_15px_rgba(255,60,60,0.6)]" />
            </div>
            <div className="h-10 w-10 -mt-2 rounded-full border-[1.5px] border-white/20 bg-accent-red shadow-[0_0_20px_rgba(255,60,60,0.8)] z-10" />
          </motion.div>

          <motion.div style={{ opacity: moleculesOpacity }} className="absolute inset-0 z-0" aria-hidden="true" />

          <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen">
            <div className="w-full h-full bg-[linear-gradient(rgba(60,160,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(60,160,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] origin-center animate-[spin_120s_linear_infinite]" />
          </motion.div>

          <motion.div style={{ opacity: qubitsOpacity }} className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
            <div className="relative h-64 w-64 rounded-full border border-accent-blue/20 shadow-[0_0_60px_rgba(60,160,255,0.15)]" />
          </motion.div>
        </div>
      )}
    </section>
  );
}
