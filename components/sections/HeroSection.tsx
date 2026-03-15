"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import QubitNetwork from "../three/QubitNetwork";
import { Suspense } from "react";

const TITLE = "L'ESPACE N'EXISTE PAS".split("");

export default function HeroSection() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-bg-primary">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <QubitNetwork count={70} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="flex font-serif text-[clamp(2.5rem,8vw,6.5rem)] font-normal leading-none tracking-tight text-text-primary drop-shadow-[0_0_20px_rgba(60,160,255,0.3)]">
          {TITLE.map((letter, i) => (
            <motion.span
              key={i}
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
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="mt-8 max-w-2xl font-mono text-[clamp(0.75rem,2vw,1rem)] leading-relaxed tracking-widest text-text-secondary opacity-80"
        >
          L'univers n'est pas fait de matière dans l'espace-temps.
          <br />
          L'espace-temps est la façon dont l'information s'organise.
        </motion.p>
      </div>

      {/* Scroll Indicator CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 drop-shadow-md"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-blue/70">
          Descendre pour comprendre
        </span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-transparent via-accent-blue to-accent-cyan"
        />
      </motion.div>
    </section>
  );
}
