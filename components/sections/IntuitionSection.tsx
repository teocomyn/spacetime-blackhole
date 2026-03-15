"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function IntuitionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phases opacity mapping
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const thermoOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.35], [0, 1, 0]);
  const thermoScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 20]);
  
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const moleculesOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);

  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]);
  const qubitsOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.95, 1], [0, 1, 1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 0.4, 0.4, 0]);

  return (
    <section ref={containerRef} className="relative h-[350vh] w-full bg-bg-primary">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* TEXT 1: Thermodynamics Analogy */}
        <motion.div style={{ opacity: text1Opacity }} className="absolute z-20 max-w-2xl px-6 text-center">
          <p className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] text-white leading-tight">
            Et si la question elle-même était mal posée ?
          </p>
          <p className="mt-6 text-text-secondary font-sans text-[clamp(0.9rem,1.5vw,1.1rem)]">
            On cherche à "marier" la gravité et la mécanique quantique. Mais c'est comme demander comment marier la température et les atomes.
          </p>
        </motion.div>

        {/* TEXT 2: Emergence */}
        <motion.div style={{ opacity: text2Opacity }} className="absolute z-20 max-w-2xl px-6 text-center">
          <p className="font-serif text-[clamp(2rem,5vw,4rem)] text-accent-red leading-none drop-shadow-md">
            La température n'est pas fondamentale.
          </p>
          <p className="mt-6 text-text-secondary font-sans text-[clamp(0.95rem,1.8vw,1.2rem)] leading-relaxed">
            Elle n'existe pas au niveau microscopique. C'est une illusion statistique qui <span className="text-white font-semibold underline decoration-accent-red/50 underline-offset-4">émerge</span> de l'agitation d'un très grand nombre de molécules.
          </p>
        </motion.div>

        {/* TEXT 3: Spacetime as Emergent */}
        <motion.div style={{ opacity: text3Opacity }} className="absolute z-20 max-w-3xl px-6 text-center bg-bg-panel/50 p-8 rounded-3xl backdrop-blur-sm border border-accent-blue/10">
          <p className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] text-accent-blue leading-tight mb-6">
            L'espace-temps est la même chose.
          </p>
          <p className="text-text-primary font-sans text-lg font-light mb-4">
            Pas une scène fixe. Pas un ingrédient fondamental de l'univers.
          </p>
          <p className="text-text-secondary font-mono text-sm tracking-wide uppercase">
            Une illusion macroscopique qui émerge de l'information quantique.
          </p>
        </motion.div>

        {/* VISUALS */}

        {/* 1. Thermometer Zoom */}
        <motion.div style={{ opacity: thermoOpacity, scale: thermoScale }} className="absolute z-10 flex flex-col items-center justify-end h-64 w-12 pt-4">
          <div className="h-40 w-6 rounded-full border-[1.5px] border-white/20 bg-white/5 relative flex justify-center p-[2px] backdrop-blur-sm">
            <div className="absolute bottom-1 w-4 rounded-full bg-gradient-to-t from-accent-red to-orange-500 h-[60%] shadow-[0_0_15px_rgba(255,60,60,0.6)]" />
          </div>
          <div className="h-10 w-10 -mt-2 rounded-full border-[1.5px] border-white/20 bg-accent-red shadow-[0_0_20px_rgba(255,60,60,0.8)] z-10" />
        </motion.div>

        {/* 2. Molecules Agitation (from the red liquid zoom) */}
        <motion.div style={{ opacity: moleculesOpacity }} className="absolute inset-0 z-0 flex items-center justify-center">
             <div className="relative w-screen h-screen">
                {[...Array(200)].map((_, i) => {
                  const x = (Math.random() - 0.5) * 100;
                  const y = (Math.random() - 0.5) * 100;
                  return (
                    <motion.div 
                      key={i} 
                      className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red shadow-[0_0_8px_rgba(255,60,60,0.9)]"
                      style={{ 
                        left: `calc(50% + ${x}vw)`, 
                        top: `calc(50% + ${y}vh)` 
                      }}
                      animate={{ 
                        x: [0, (Math.random()-0.5)*50, 0], 
                        y: [0, (Math.random()-0.5)*50, 0] 
                      }} 
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.1 + Math.random()*0.3,
                        ease: "linear"
                      }} 
                    />
                  );
                })}
             </div>
        </motion.div>

        {/* 3. Spacetime Grid & Qubits Emergence */}
        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen">
            <div className="w-full h-full bg-[linear-gradient(rgba(60,160,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(60,160,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] origin-center animate-[spin_120s_linear_infinite]" />
        </motion.div>

        <motion.div style={{ opacity: qubitsOpacity }} className="absolute inset-0 z-[2] flex items-center justify-center">
             <div className="relative w-screen h-screen">
                {[...Array(60)].map((_, i) => {
                   const r = 10 + Math.random() * 40;
                   const angle = Math.random() * Math.PI * 2;
                   const x = Math.cos(angle) * r;
                   const y = Math.sin(angle) * r;
                   const isUp = Math.random() > 0.5;
                  return (
                    <motion.div 
                      key={i} 
                      className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${isUp ? 'bg-accent-blue shadow-[0_0_15px_rgba(60,160,255,0.8)]' : 'bg-accent-orange shadow-[0_0_15px_rgba(255,160,100,0.8)]'}`}
                      style={{ 
                        left: `calc(50% + ${x}vw)`, 
                        top: `calc(50% + ${y}vh)` 
                      }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }} 
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2 + Math.random(), 
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }} 
                    />
                  );
                })}
             </div>
        </motion.div>

      </div>
    </section>
  );
}
