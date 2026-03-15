"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <section className="relative h-screen w-full bg-bg-primary flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background glow and subtle noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,160,255,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-[clamp(2rem,6vw,5rem)] text-white leading-tight mb-2">
            L'espace-temps n'est pas <br/> le contenant.
          </h2>
          <h2 className="font-serif text-[clamp(2rem,6vw,5rem)] text-accent-blue leading-tight mb-8">
            C'est le contenu.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-text-secondary text-lg mb-16 italic"
        >
          Et peut-être qu'un jour, les trous noirs éclaireront nos chemins.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <button 
            onClick={() => {
              document.getElementById("simulation")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full border border-accent-blue/40 text-accent-cyan font-mono text-xs tracking-widest hover:bg-accent-blue/10 transition-colors shadow-[0_0_15px_rgba(60,160,255,0.15)]"
          >
            EXPLORER LA SIMULATION
          </button>
          
          <div className="font-mono text-[10px] text-text-dim tracking-wider flex flex-col gap-2 mt-8">
            <p>BASÉ SUR LES TRAVAUX DE: MALDACENA, PENROSE, HAWKING, RYU, TAKAYANAGI, VERLINDE, SUSSKIND</p>
            <p>CRÉÉ AVEC CURIOSITÉ. <a href="https://github.com" className="hover:text-white underline decoration-white/20 underline-offset-4">CODE SOURCE</a></p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
