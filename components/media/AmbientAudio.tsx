"use client";

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

export function AmbientToggle({
  enabled,
  onToggle,
  labelOn,
  labelOff,
}: {
  enabled: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
}) {
  const { reducedMotion, reducedEffects } = useApp();
  if (reducedMotion || reducedEffects) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="mt-6 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
    >
      <span className={`h-2 w-2 rounded-full ${enabled ? "animate-pulse bg-accent-deep" : "bg-white/30"}`} />
      {enabled ? labelOff : labelOn}
    </button>
  );
}

export function SingularityDrone({ active }: { active: boolean }) {
  const { reducedMotion, reducedEffects } = useApp();

  useEffect(() => {
    if (!active || reducedMotion || reducedEffects) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = 42;
    filter.type = "lowpass";
    filter.frequency.value = 120;
    gain.gain.value = 0;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);

    return () => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setTimeout(() => {
        osc.stop();
        void ctx.close();
      }, 600);
    };
  }, [active, reducedMotion, reducedEffects]);

  return null;
}
