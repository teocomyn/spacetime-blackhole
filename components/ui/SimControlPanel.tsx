"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import type { SimMode } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { SIM_MODES } from "@/lib/constants";

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
  const { locale } = useApp();
  const t = useTranslation(locale);
  const [collapsed, setCollapsed] = useState(false);
  const currentMode = t.simulation.modes[mode];

  const panel = (
    <>
      <p className="mb-4 rounded-lg border border-accent-orange/20 bg-accent-orange/5 px-3 py-2 font-sans text-[11px] leading-relaxed text-text-secondary">
        {t.simulation.disclaimer}
      </p>

      <h3 className="font-serif text-2xl text-white mb-4 tracking-wide">
        {t.simulation.panelTitle}
      </h3>

      <div
        role="tablist"
        aria-label={t.simulation.panelTitle}
        className="flex flex-col gap-2 mb-6 mt-2"
      >
        {SIM_MODES.map((id) => {
          const m = t.simulation.modes[id];
          const isActive = mode === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={isActive}
              aria-controls="sim-panel-controls"
              aria-label={m.aria}
              onClick={() => setMode(id)}
              className={`relative px-4 py-3 text-left rounded-lg text-sm font-mono transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
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

      <div id="sim-panel-controls" role="tabpanel" className="mb-6 min-h-[60px]">
        {mode === "entanglement" && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="entanglement-strength"
              className="text-xs font-mono text-text-secondary flex justify-between"
            >
              <span>{t.simulation.entanglement}</span>
              <span aria-hidden="true">{Math.round(entanglementStrength * 100)}%</span>
            </label>
            <input
              id="entanglement-strength"
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={entanglementStrength}
              onChange={(e) => setEntanglementStrength(parseFloat(e.target.value))}
              aria-valuetext={`${Math.round(entanglementStrength * 100)} percent`}
              className="w-full accent-accent-blue"
            />
          </div>
        )}
        {mode === "blackhole" && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="blackhole-mass"
              className="text-xs font-mono text-text-secondary flex justify-between"
            >
              <span>{t.simulation.mass}</span>
              <span aria-hidden="true">{Math.round(mass * 100)}%</span>
            </label>
            <input
              id="blackhole-mass"
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              aria-valuetext={`${Math.round(mass * 100)} percent`}
              className="w-full accent-accent-cyan"
            />
          </div>
        )}
        {mode === "wormhole" && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="epr-strength"
              className="text-xs font-mono text-text-secondary flex justify-between"
            >
              <span>{t.simulation.epr}</span>
              <span aria-hidden="true">{Math.round(eprStrength * 100)}%</span>
            </label>
            <input
              id="epr-strength"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={eprStrength}
              onChange={(e) => setEprStrength(parseFloat(e.target.value))}
              aria-valuetext={`${Math.round(eprStrength * 100)} percent`}
              className="w-full accent-accent-purple"
            />
          </div>
        )}
        {mode === "decoherence" && (
          <button
            type="button"
            onClick={triggerRebuild}
            className="w-full py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-cyan border border-accent-blue/50 rounded-lg text-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.simulation.rebuild}
          </button>
        )}
      </div>

      <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
        <p className="text-sm text-text-secondary font-sans leading-relaxed">
          {currentMode.desc}
        </p>
      </div>

      <div
        className="flex justify-between items-center text-[10px] font-mono text-text-dim border-t border-white/10 pt-4"
        aria-live="polite"
      >
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-accent-blue/50" aria-hidden="true" />
          QUBITS: {stats.qubits}
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-accent-cyan/50" aria-hidden="true" />
          LIENS: {stats.links}
        </span>
        <span>FPS: {stats.fps}</span>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile drawer toggle */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-bg-panel/95 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-accent-cyan backdrop-blur-xl md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        aria-expanded={!collapsed}
        aria-controls="sim-control-panel"
      >
        {collapsed ? t.simulation.expand : t.simulation.collapse}
      </button>

      <motion.div
        id="sim-control-panel"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`absolute z-10 rounded-2xl bg-bg-panel backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-transform duration-300
          max-md:bottom-14 max-md:left-4 max-md:right-4 max-md:max-h-[45vh] max-md:overflow-y-auto max-md:p-4
          ${collapsed ? "max-md:translate-y-[120%] max-md:opacity-0 max-md:pointer-events-none" : "max-md:translate-y-0"}
          md:top-1/2 md:left-12 md:-translate-y-1/2 md:w-full md:max-w-sm md:p-6`}
      >
        {panel}
      </motion.div>
    </>
  );
}
