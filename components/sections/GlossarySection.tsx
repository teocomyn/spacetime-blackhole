"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { GLOSSARY } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import { ui } from "@/lib/ui";

const HOME_TERMS = ["intrication", "holographie", "ads-cft", "er-epr", "entropie-bh", "courbe-page", "decoherence", "de-sitter"];

export default function GlossarySection() {
  const ref = useRef<HTMLElement>(null);
  const { locale, reducedMotion, reducedEffects } = useApp();
  const t = useTranslation(locale);
  const animate = !reducedMotion && !reducedEffects;

  // L'aspiration ne démarre qu'une fois le bas du glossaire arrivé à l'écran : on peut tout lire avant.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const suctionScale = useTransform(scrollYProgress, [0.15, 1], [1, 0.55]);
  const suctionOpacity = useTransform(scrollYProgress, [0.25, 0.9], [1, 0]);
  const suctionY = useTransform(scrollYProgress, [0.15, 1], [0, 120]);
  const vortexOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 0.9]);

  return (
    <section
      id="glossary"
      ref={ref}
      className="relative w-full border-t border-white/5 bg-bg-primary px-6 py-32"
    >
      <motion.div
        style={animate ? { scale: suctionScale, opacity: suctionOpacity, y: suctionY } : undefined}
        className="relative mx-auto max-w-4xl origin-center"
      >
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-sans text-[clamp(2rem,4vw,3rem)] text-white">
            {t.glossary.title}
          </h2>
          <p className="font-sans text-text-secondary">{t.glossary.subtitle}</p>
        </div>

        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {GLOSSARY.filter((item) => HOME_TERMS.includes(item.id)).map((item) => (
            <div
              key={item.id}
              id={`glossary-${item.id}`}
              className="rounded-xl border border-white/5 bg-bg-secondary/40 p-6 backdrop-blur-sm"
            >
              <dt className="mb-2 font-sans text-xl text-accent-cyan">
                {locale === "fr" ? item.termFr : item.termEn}
              </dt>
              <dd className="font-sans text-sm leading-relaxed text-text-secondary">
                {locale === "fr" ? item.defFr : item.defEn}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center">
          <Link
            href={pagePath("glossary", locale)}
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 text-sm text-text-secondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {ui(locale).seeFullGlossary} →
          </Link>
        </p>
      </motion.div>

      {animate && (
        <motion.div
          style={{ opacity: vortexOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[40vh] items-end justify-center pb-8"
          aria-hidden="true"
        >
          <div className="h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(45,90,140,0.35)_0%,transparent_70%)] blur-sm" />
          <div className="absolute bottom-16 h-px w-[min(80vw,600px)] bg-gradient-to-r from-transparent via-accent-deep/40 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
