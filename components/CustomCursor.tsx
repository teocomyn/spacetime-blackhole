"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Position
  const cursorX = useSpring(-100, { stiffness: 400, damping: 30, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsDesktop(true);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer subtle glow/ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-blue/20 bg-accent-blue/5 shadow-[0_0_20px_rgba(60,160,255,0.15)] backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Inner bright dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(60,160,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
