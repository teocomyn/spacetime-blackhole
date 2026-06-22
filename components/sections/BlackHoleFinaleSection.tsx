"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AmbientToggle, SingularityDrone } from "@/components/media/AmbientAudio";
import BackgroundVideo from "@/components/media/BackgroundVideo";
import { BLACKHOLE_VIDEOS } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export default function BlackHoleFinaleSection() {
  const ref = useRef<HTMLElement>(null);
  const [ambientOn, setAmbientOn] = useState(false);
  const { locale } = useApp();
  const t = useTranslation(locale);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 0.92]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.35, 0.85, 0.85, 0.4]);
  const line1Y = useTransform(scrollYProgress, [0, 0.35], [80, 0]);
  const line1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 0.3]);
  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.7], [0, 1, 0.4]);
  const bodyOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  return (
    <section
      id="singularity"
      ref={ref}
      className="relative z-[60] h-[220vh] bg-black"
      aria-label={t.finale.aria}
    >
      <SingularityDrone active={ambientOn} />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ scale: videoScale, opacity: videoOpacity }} className="absolute inset-0">
          <BackgroundVideo
            src={BLACKHOLE_VIDEOS.singularityMp4}
            className="absolute inset-0 h-full w-full object-cover"
            lazy
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
            {t.finale.label}
          </p>

          <motion.h2
            style={{ y: line1Y, opacity: line1Opacity }}
            className="max-w-[14ch] font-sans text-[clamp(2.4rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-white"
          >
            {t.finale.line1}
          </motion.h2>

          <motion.p
            style={{ opacity: line2Opacity }}
            className="mt-4 max-w-[18ch] font-sans text-[clamp(1.6rem,4.5vw,3.2rem)] font-semibold leading-tight tracking-[-0.02em] text-accent-deep"
          >
            {t.finale.line2}
          </motion.p>

          <motion.p
            style={{ opacity: bodyOpacity }}
            className="mt-10 max-w-xl font-sans text-[clamp(0.95rem,1.4vw,1.15rem)] leading-[1.65] text-white/72"
          >
            {t.finale.body}
          </motion.p>

          <motion.div style={{ opacity: bodyOpacity }}>
            <AmbientToggle
              enabled={ambientOn}
              onToggle={() => setAmbientOn((v) => !v)}
              labelOn={t.finale.ambientOff}
              labelOff={t.finale.ambientOn}
            />
          </motion.div>

          <motion.a
            href="#horizons"
            style={{ opacity: bodyOpacity }}
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.finale.cta}
            <span aria-hidden="true">↓</span>
          </motion.a>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}
