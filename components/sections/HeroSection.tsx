"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroVideo from "../HeroVideo";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

const HeroCanvas = dynamic(() => import("../three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-accent-blue/5 to-transparent" />
  ),
});

export default function HeroSection() {
  const { locale, reducedMotion, reducedEffects } = useApp();
  const t = useTranslation(locale);
  const title = t.hero.title.split("");
  const animate = !reducedMotion && !reducedEffects;

  return (
    <section
      id="hero"
      className="relative h-[100vh] w-full overflow-hidden bg-bg-primary"
      aria-label={t.hero.videoLabel}
    >
      <HeroVideo />

      {!reducedEffects && (
        <div className="absolute inset-0 z-[2] opacity-60 mix-blend-screen">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      <div className="absolute top-6 right-6 z-20 font-sans text-[10px] tracking-[0.2em] text-accent-blue/60 uppercase">
        {t.hero.credit}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="flex font-sans text-[clamp(2.5rem,8vw,6.5rem)] font-normal leading-none tracking-tight text-text-primary drop-shadow-[0_0_20px_rgba(60,160,255,0.3)]">
          {title.map((letter, i) =>
            animate ? (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.2,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: i * 0.04,
                }}
                className={letter === " " ? "w-[0.3em]" : ""}
              >
                {letter}
              </motion.span>
            ) : (
              <span key={`${letter}-${i}`} className={letter === " " ? "w-[0.3em]" : ""}>
                {letter}
              </span>
            )
          )}
        </h1>

        {animate ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
            className="mt-8 max-w-2xl font-sans text-[clamp(0.75rem,2vw,1rem)] leading-relaxed tracking-widest text-text-secondary opacity-80"
          >
            {t.hero.subtitle1}
            <br />
            {t.hero.subtitle2}
          </motion.p>
        ) : (
          <p className="mt-8 max-w-2xl font-sans text-[clamp(0.75rem,2vw,1rem)] leading-relaxed tracking-widest text-text-secondary opacity-80">
            {t.hero.subtitle1}
            <br />
            {t.hero.subtitle2}
          </p>
        )}
      </div>

      {animate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 drop-shadow-md"
        >
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-accent-blue/70">
            {t.hero.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-[1px] bg-gradient-to-b from-transparent via-accent-blue to-accent-cyan"
          />
        </motion.div>
      )}
    </section>
  );
}
