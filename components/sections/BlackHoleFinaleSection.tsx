"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AmbientToggle, SingularityDrone } from "@/components/media/AmbientAudio";
import MediaBadge from "@/components/topic/MediaBadge";
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

  const line1Y = useTransform(scrollYProgress, [0, 0.35], [80, 0]);
  const line1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 0.3]);
  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.7], [0, 1, 0.4]);
  const bodyOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  return (
    <section
      id="singularity"
      ref={ref}
      className="relative z-[60] h-[260vh]"
      aria-label={t.finale.aria}
    >
      <SingularityDrone active={ambientOn} />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Le trou noir vient du fond 3D de la page : ici, la caméra plonge jusqu'à l'horizon. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_50%,rgba(0,0,0,0.6),transparent_75%)]" />
        <MediaBadge kind="computed" locale={locale} className="absolute bottom-24 left-4 z-20" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/70" />

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
            className="mt-4 max-w-[18ch] font-sans text-[clamp(1.6rem,4.5vw,3.2rem)] font-semibold leading-tight tracking-[-0.02em] text-accent-deep-text"
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
