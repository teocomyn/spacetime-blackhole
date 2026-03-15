"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { SimMode } from "../sections/SimulationSection";

interface Props {
  mode: SimMode;
  setMode: Dispatch<SetStateAction<SimMode>>;
  stats: { qubits: number; links: number; fps: number };
  entanglementStrength: number;
  setEntanglementStrength: Dispatch<SetStateAction<number>>;
  mass: number;
  setMass: Dispatch<SetStateAction<number>>;
  eprStrength: number;
  setEprStrength: Dispatch<SetStateAction<number>>;
  triggerRebuild: () => void;
}

const MODES: { id: SimMode; label: string; desc: string }[] = [
  {
    id: "entanglement",
    label: "Réseau d'intrication",
    desc: "L'espace-temps émerge des liens d'intrication quantique entre qubits. La distance devient l'inverse de l'intrication.",
  },
  {
    id: "blackhole",
    label: "Trou noir (effondrement)",
    desc: "Quand l'intrication se concentre excessivement, la géométrie s'effondre. Un trou noir se forme et déchire l'espace-temps.",
  },
  {
    id: "wormhole",
    label: "ER = EPR (Trou de ver)",
    desc: "Deux régions très intriquées mais éloignées créent un pont d'Einstein-Rosen — un raccourci dans l'espace-temps émergent.",
  },
  {
    id: "decoherence",
    label: "Décohérence",
    desc: "Si l'intrication se brise, l'espace-temps se déconnecte. Sans intrication → pas de géométrie → pas de gravité.",
  },
];

export default function SimControlPanel({
  mode,
  setMode,
  stats,
  entanglementStrength,
  setEntanglementStrength,
  mass,
  setMass,
  eprStrength,
  setEprStrength,
  triggerRebuild,
}: Props) {
  const currentMode = MODES.find((m) => m.id === mode)!;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 z-10 w-[90vw] max-w-sm rounded-2xl bg-bg-panel p-6 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
    >
      <h3 className="font-serif text-2xl text-white mb-6 tracking-wide">Tableau de contrôle</h3>
      
      {/* Mode Switches */}
      <div className="flex flex-col gap-2 mb-8 mt-4">
        {MODES.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`relative px-4 py-3 text-left rounded-lg text-sm font-mono transition-all duration-300 ${
                isActive 
                  ? "bg-accent-blue/10 border border-accent-blue/50 text-accent-cyan shadow-[0_0_15px_rgba(60,160,255,0.2)]" 
                  : "bg-white/5 border border-transparent text-text-muted hover:bg-white/10 hover:text-text-secondary"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeMode" 
                  className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r bg-accent-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]" 
                />
              )}
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Controls based on Mode */}
      <div className="mb-6 min-h-[60px]">
        {mode === "entanglement" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-secondary flex justify-between">
              <span>Intrication globale</span>
              <span>{Math.round(entanglementStrength * 100)}%</span>
            </label>
            <input 
              type="range" 
              min="0.1" max="1" step="0.05" 
              value={entanglementStrength}
              onChange={(e) => setEntanglementStrength(parseFloat(e.target.value))}
              className="w-full accent-accent-blue"
            />
          </div>
        )}
        {mode === "blackhole" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-secondary flex justify-between">
              <span>Masse du trou noir</span>
              <span>{Math.round(mass * 100)}%</span>
            </label>
            <input 
              type="range" 
              min="0.1" max="1" step="0.05" 
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-accent-cyan"
            />
          </div>
        )}
        {mode === "wormhole" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-secondary flex justify-between">
              <span>Intrication EPR</span>
              <span>{Math.round(eprStrength * 100)}%</span>
            </label>
            <input 
              type="range" 
              min="0" max="1" step="0.05" 
              value={eprStrength}
              onChange={(e) => setEprStrength(parseFloat(e.target.value))}
              className="w-full accent-accent-purple"
            />
          </div>
        )}
        {mode === "decoherence" && (
          <button 
            onClick={triggerRebuild}
            className="w-full py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-cyan border border-accent-blue/50 rounded-lg text-sm font-mono transition-colors"
          >
            Reconstruire l'espace-temps
          </button>
        )}
      </div>

      {/* Description */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
        <p className="text-sm text-text-secondary font-sans leading-relaxed">
          {currentMode.desc}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center text-[10px] font-mono text-text-dim border-t border-white/10 pt-4">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent-blue/50"></span> QUBITS: {stats.qubits}</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent-cyan/50"></span> LIENS: {stats.links}</span>
        <span>FPS: {stats.fps}</span>
      </div>
    </motion.div>
  );
}
