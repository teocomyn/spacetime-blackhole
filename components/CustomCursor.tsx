"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function CustomCursor() {
  const { reducedMotion, reducedEffects } = useApp();
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 400, damping: 30, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (reducedMotion || reducedEffects) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const updateDesktop = () => setIsDesktop(finePointer.matches);
    updateDesktop();
    finePointer.addEventListener("change", updateDesktop);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", moveCursor);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      finePointer.removeEventListener("change", updateDesktop);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, reducedMotion, reducedEffects]);

  if (!isDesktop || reducedMotion || reducedEffects) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-blue/20 bg-accent-blue/5 shadow-[0_0_20px_rgba(60,160,255,0.15)] backdrop-blur-[1px]"
        style={{ x: cursorX, y: cursorY }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(60,160,255,0.8)]"
        style={{ x: cursorX, y: cursorY }}
        aria-hidden="true"
      />
    </>
  );
}
