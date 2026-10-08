"use client";

import { useMemo, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import MediaBadge from "@/components/topic/MediaBadge";

const TEXT = {
  fr: {
    title: "Le « chirp » de GW150914, synthétisé",
    play: "Écouter",
    playing: "Lecture…",
    pitchLabel: "Hauteur",
    pitchReal: "Fréquences réelles (35 à 250 Hz)",
    pitchShifted: "Transposé de deux octaves",
    speedLabel: "Vitesse",
    speedReal: "Temps réel (0,2 s)",
    speedSlow: "Ralenti ×6",
    note:
      "Son calculé dans votre navigateur à partir d'un modèle simplifié : spirale newtonienne pour une masse de chirp de 30 masses solaires, puis vibration amortie du trou noir final. Ce n'est pas l'enregistrement de LIGO, mais il en reproduit l'allure : une montée en fréquence et en volume de 35 à environ 150 Hz en 0,2 seconde.",
    speakers: "Les fréquences réelles sont graves : utilisez un casque ou choisissez la version transposée.",
    waveAria: "Forme d'onde : des oscillations de plus en plus rapides et amples, puis une extinction brutale.",
  },
  en: {
    title: "The GW150914 chirp, synthesized",
    play: "Listen",
    playing: "Playing…",
    pitchLabel: "Pitch",
    pitchReal: "Real frequencies (35 to 250 Hz)",
    pitchShifted: "Shifted up two octaves",
    speedLabel: "Speed",
    speedReal: "Real time (0.2 s)",
    speedSlow: "Slowed down ×6",
    note:
      "Sound computed in your browser from a simplified model: a Newtonian inspiral for a chirp mass of 30 solar masses, then the damped ringing of the final black hole. It is not LIGO's recording, but it reproduces its shape: a rise in frequency and loudness from 35 to about 150 Hz in 0.2 seconds.",
    speakers: "The real frequencies are low: use headphones or pick the shifted version.",
    waveAria: "Waveform: faster and larger oscillations, then a sudden fade.",
  },
} as const;

const CHIRP_MASS = 30;
const F_START = 35;
const F_PEAK = 150;
const F_RINGDOWN = 250;
const RINGDOWN_DAMPING = 0.004;

// Spirale newtonienne : f(τ) = 134 Hz × (1,21 M☉ / Mc)^(5/8) × (1 s / τ)^(3/8).
const K = 134 * Math.pow(1.21 / CHIRP_MASS, 5 / 8);
const tauAt = (f: number) => Math.pow(K / f, 8 / 3);
const TAU_START = tauAt(F_START);
const TAU_PEAK = tauAt(F_PEAK);
const INSPIRAL = TAU_START - TAU_PEAK;
const RINGDOWN = 0.03;

/** Fréquence et amplitude relative du signal au temps t (s) depuis l'entrée dans la bande à 35 Hz. */
function signalAt(t: number): { f: number; a: number } {
  if (t < INSPIRAL) {
    const tau = TAU_START - t;
    const f = K * Math.pow(tau, -3 / 8);
    return { f, a: Math.pow(f / F_PEAK, 2 / 3) };
  }
  const dt = t - INSPIRAL;
  const blend = Math.min(1, dt / 0.004);
  return { f: F_PEAK + (F_RINGDOWN - F_PEAK) * blend, a: Math.exp(-dt / RINGDOWN_DAMPING) };
}

function buildWave(points: number) {
  const total = INSPIRAL + RINGDOWN;
  let phase = 0;
  const steps = 6000;
  const dt = total / steps;
  const samples: number[] = [];
  for (let i = 0; i < steps; i++) {
    const { f, a } = signalAt(i * dt);
    phase += 2 * Math.PI * f * dt;
    samples.push(a * Math.cos(phase));
  }
  const stride = Math.floor(steps / points);
  return samples.filter((_, i) => i % stride === 0);
}

export default function ChirpPlayer() {
  const { locale } = useApp();
  const t = TEXT[locale];
  const [shifted, setShifted] = useState(true);
  const [slow, setSlow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const wave = useMemo(() => buildWave(900), []);
  const wavePath = useMemo(
    () =>
      wave
        .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (wave.length - 1)) * 600).toFixed(1)},${(60 - v * 50).toFixed(1)}`)
        .join(" "),
    [wave]
  );

  const play = async () => {
    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const pitch = shifted ? 4 : 1;
    const stretch = slow ? 6 : 1;
    const duration = (INSPIRAL + RINGDOWN) * stretch + 0.05;
    const rate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, Math.ceil(duration * rate), rate);
    const data = buffer.getChannelData(0);
    let phase = 0;
    for (let i = 0; i < data.length; i++) {
      const tPhys = i / rate / stretch;
      const { f, a } = signalAt(Math.min(tPhys, INSPIRAL + RINGDOWN));
      phase += (2 * Math.PI * f * pitch) / rate;
      const fadeIn = Math.min(1, i / (rate * 0.01));
      data[i] = tPhys > INSPIRAL + RINGDOWN ? 0 : 0.6 * a * fadeIn * Math.sin(phase);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    setPlaying(true);
    source.onended = () => setPlaying(false);
    source.start();
  };

  const option = (active: boolean, label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[40px] rounded-full border px-4 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
        active ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan" : "border-white/10 text-text-secondary hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <figure className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <figcaption className="font-sans text-lg font-light text-white">{t.title}</figcaption>
        <MediaBadge kind="synthesized" locale={locale} />
      </div>

      <svg viewBox="0 0 600 120" className="h-auto w-full" role="img" aria-label={t.waveAria}>
        <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.1)" />
        <path d={wavePath} fill="none" stroke="#00e5ff" strokeWidth="1.4" />
      </svg>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void play()}
          disabled={playing}
          className="min-h-[44px] rounded-full bg-white px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          {playing ? t.playing : `▶ ${t.play}`}
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div role="group" aria-label={t.pitchLabel} className="flex flex-wrap gap-2">
          {option(shifted, t.pitchShifted, () => setShifted(true))}
          {option(!shifted, t.pitchReal, () => setShifted(false))}
        </div>
        <div role="group" aria-label={t.speedLabel} className="flex flex-wrap gap-2">
          {option(!slow, t.speedReal, () => setSlow(false))}
          {option(slow, t.speedSlow, () => setSlow(true))}
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-text-muted">{t.note}</p>
      {!shifted && <p className="mt-2 text-xs text-text-muted">{t.speakers}</p>}
    </figure>
  );
}
