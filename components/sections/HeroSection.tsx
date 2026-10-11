"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MediaBadge from "@/components/topic/MediaBadge";
import { ui } from "@/lib/ui";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { pointer, startPointerTracking } from "@/lib/pointer";

const PULL_RADIUS = 170;
const MAX_PULL = 22;

// Chaque lettre est attirée vers le curseur, d'autant plus qu'il est proche : la lumière (et le texte)
// tombe vers la masse. Les positions de repos sont lues sur un conteneur qui ne bouge pas.
function useGravityLetters(enabled: boolean) {
  const anchors = useRef<(HTMLSpanElement | null)[]>([]);
  const movers = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!enabled) return;
    startPointerTracking();
    const anchorEls = anchors.current;
    const moverEls = movers.current;
    const offsets = anchorEls.map(() => ({ x: 0, y: 0, s: 1 }));
    let raf = 0;

    const tick = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const near = pointer.active && performance.now() - pointer.lastMove < 4000;
      anchorEls.forEach((anchor, i) => {
        const mover = moverEls[i];
        if (!anchor || !mover) return;
        const rect = anchor.getBoundingClientRect();
        const dx = pointer.clientX - (rect.left + rect.width / 2);
        const dy = pointer.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const pull = near ? (MAX_PULL * PULL_RADIUS * PULL_RADIUS) / (dist * dist + PULL_RADIUS * PULL_RADIUS) : 0;
        const o = offsets[i];
        o.x += ((dx / dist) * pull - o.x) * 0.12;
        o.y += ((dy / dist) * pull - o.y) * 0.12;
        o.s += (1 + (pull / MAX_PULL) * 0.12 - o.s) * 0.12;
        mover.style.transform = `translate3d(${o.x.toFixed(2)}px, ${o.y.toFixed(2)}px, 0) scale(${o.s.toFixed(3)})`;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      moverEls.forEach((mover) => mover && (mover.style.transform = ""));
    };
  }, [enabled]);

  return { anchors, movers };
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { locale, reducedMotion, reducedEffects } = useApp();
  const t = useTranslation(locale);
  const words = t.hero.title.split(" ");
  const wordOffsets = words.map((_, w) =>
    words.slice(0, w).reduce((sum, word) => sum + word.length + 1, 0)
  );
  const animate = !reducedMotion && !reducedEffects;
  const [finePointer, setFinePointer] = useState(true);
  const { anchors, movers } = useGravityLetters(animate);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // En descendant, le titre bascule vers le trou noir et s'y engloutit.
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 62]);
  const sink = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const shrink = useTransform(scrollYProgress, [0, 1], [1, 0.62]);
  const fade = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.85, 0]);
  const blur = useTransform(scrollYProgress, [0.4, 0.9], ["blur(0px)", "blur(8px)"]);

  return (
    <section ref={ref} id="hero" className="relative h-[100vh] w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_34%,rgba(0,0,0,0.55),transparent_70%)]"
        aria-hidden="true"
      />

      {!reducedEffects && (
        <MediaBadge kind="computed" locale={locale} className="absolute bottom-24 left-4 z-20 hidden sm:inline-flex" />
      )}

      <div className="absolute top-6 right-6 z-20 font-sans text-[10px] tracking-[0.2em] text-accent-blue/60 uppercase">
        {t.hero.credit}
      </div>

      <div className="relative z-10 h-full [perspective:900px]">
        <motion.div
          style={animate ? { rotateX: tilt, y: sink, scale: shrink, opacity: fade, filter: blur } : undefined}
          className="flex h-full origin-[50%_80%] flex-col items-center justify-start px-4 pt-[17vh] text-center"
        >
          <h1
            aria-label={t.hero.title}
            className="flex flex-wrap justify-center gap-x-[0.3em] font-sans text-[clamp(2.5rem,8vw,6.5rem)] font-normal leading-none tracking-tight text-text-primary drop-shadow-[0_0_24px_rgba(0,0,0,0.9)]"
          >
            {words.map((word, w) => (
              <Fragment key={`${word}-${w}`}>
                {w > 0 && " "}
                <span className="inline-flex whitespace-nowrap" aria-hidden="true">
                  {word.split("").map((letter, i) => {
                    const index = wordOffsets[w] + i;
                    return (
                      <span
                        key={`${letter}-${index}`}
                        ref={(el) => {
                          anchors.current[index] = el;
                        }}
                        className="inline-block"
                      >
                        <span
                          ref={(el) => {
                            movers.current[index] = el;
                          }}
                          className="inline-block will-change-transform"
                        >
                          {animate ? (
                            <motion.span
                              className="inline-block"
                              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{
                                duration: 1.2,
                                ease: [0.2, 0.65, 0.3, 0.9],
                                delay: index * 0.04,
                              }}
                            >
                              {letter}
                            </motion.span>
                          ) : (
                            letter
                          )}
                        </span>
                      </span>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </h1>

          {animate ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              className="mt-8 max-w-2xl font-sans text-[clamp(0.75rem,2vw,1rem)] leading-relaxed tracking-widest text-text-primary/85 drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]"
            >
              {t.hero.subtitle1}
              <br />
              {t.hero.subtitle2}
            </motion.p>
          ) : (
            <p className="mt-8 max-w-2xl font-sans text-[clamp(0.75rem,2vw,1rem)] leading-relaxed tracking-widest text-text-primary/85">
              {t.hero.subtitle1}
              <br />
              {t.hero.subtitle2}
            </p>
          )}
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.24em] text-accent-blue/80">
            {ui(locale).experienceLength}
          </p>
          {animate && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
              className="mt-3 font-sans text-[11px] text-white/50"
            >
              {finePointer ? ui(locale).cursorHintFine : ui(locale).cursorHintTouch}
            </motion.p>
          )}
        </motion.div>
      </div>

      {animate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 drop-shadow-md"
        >
          <span className="whitespace-nowrap font-sans text-[0.65rem] uppercase tracking-[0.2em] text-accent-blue/80">
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
