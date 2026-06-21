"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function ScrollProgress() {
  const { reducedMotion, reducedEffects } = useApp();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reducedMotion || reducedEffects) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent-cyan shadow-[0_0_10px_rgba(0,229,255,0.7)] z-[150]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
