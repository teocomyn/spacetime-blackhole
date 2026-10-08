"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";

const TEXT = {
  fr: {
    title: "La courbe de Page, pas à pas",
    time: "Temps écoulé (fraction de la durée de vie du trou noir)",
    play: "Lancer l'évaporation",
    pause: "Pause",
    reset: "Recommencer",
    bh: "Entropie du trou noir",
    hawking: "Rayonnement selon Hawking (1974)",
    page: "Rayonnement si l'information ressort (courbe de Page)",
    pageTime: "Temps de Page",
    axisX: "temps →",
    axisY: "entropie",
    status: (t: number, bh: number, h: number, p: number) =>
      `À ${Math.round(t * 100)} % de la durée de vie : trou noir ${Math.round(bh * 100)} %, rayonnement selon Hawking ${Math.round(h * 100)} %, courbe de Page ${Math.round(p * 100)} %.`,
    beforePage:
      "Avant le temps de Page, les deux scénarios sont indiscernables : le rayonnement semble thermique et son entropie grimpe.",
    afterPage:
      "Après le temps de Page, tout se joue : si l'information est préservée, l'entropie du rayonnement doit redescendre jusqu'à zéro. Selon le calcul de Hawking, elle continue de monter, et l'information est perdue.",
    end: "Fin de l'évaporation. Courbe de Page : entropie nulle, toute l'information est dans le rayonnement. Courbe de Hawking : entropie maximale, l'information a disparu.",
    model:
      "Modèle simplifié : l'entropie emportée par le rayonnement est prise égale à celle perdue par le trou noir, dont l'entropie varie comme M², avec M ∝ (1 - t)^(1/3). Dans ce modèle, le temps de Page tombe à environ 65 % de la durée de vie ; des calculs plus réalistes le placent un peu plus tôt.",
  },
  en: {
    title: "The Page curve, step by step",
    time: "Elapsed time (fraction of the black hole lifetime)",
    play: "Start evaporation",
    pause: "Pause",
    reset: "Restart",
    bh: "Black hole entropy",
    hawking: "Radiation according to Hawking (1974)",
    page: "Radiation if information escapes (Page curve)",
    pageTime: "Page time",
    axisX: "time →",
    axisY: "entropy",
    status: (t: number, bh: number, h: number, p: number) =>
      `At ${Math.round(t * 100)}% of the lifetime: black hole ${Math.round(bh * 100)}%, Hawking radiation ${Math.round(h * 100)}%, Page curve ${Math.round(p * 100)}%.`,
    beforePage:
      "Before the Page time, both scenarios look the same: the radiation looks thermal and its entropy rises.",
    afterPage:
      "After the Page time, everything is decided: if information is preserved, the radiation entropy must come back down to zero. In Hawking's calculation it keeps rising, and information is lost.",
    end: "Evaporation complete. Page curve: zero entropy, all the information is in the radiation. Hawking curve: maximum entropy, the information is gone.",
    model:
      "Simplified model: the entropy carried by the radiation equals the entropy lost by the black hole, whose entropy scales as M², with M ∝ (1 - t)^(1/3). In this model the Page time falls at about 65% of the lifetime; more realistic calculations put it a little earlier.",
  },
} as const;

const PAGE_TIME = 1 - 2 ** -1.5;
const W = 640;
const H = 340;
const PAD = { left: 48, right: 20, top: 20, bottom: 40 };

const bhEntropy = (t: number) => Math.pow(Math.max(0, 1 - t), 2 / 3);
const hawkingEntropy = (t: number) => 1 - bhEntropy(t);
const pageEntropy = (t: number) => Math.min(hawkingEntropy(t), bhEntropy(t));

const x = (t: number) => PAD.left + t * (W - PAD.left - PAD.right);
const y = (s: number) => H - PAD.bottom - s * (H - PAD.top - PAD.bottom);

function path(fn: (t: number) => number, until = 1) {
  const pts: string[] = [];
  const steps = 160;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * until;
    pts.push(`${i === 0 ? "M" : "L"}${x(t).toFixed(1)},${y(fn(t)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function PageCurve() {
  const { locale, reducedMotion } = useApp();
  const t = TEXT[locale];
  const [time, setTime] = useState(0.3);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const sliderId = useId();

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setTime((prev) => {
        const next = prev + dt / 9;
        if (next >= 1) {
          setPlaying(false);
          return 1;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  const bh = bhEntropy(time);
  const h = hawkingEntropy(time);
  const p = pageEntropy(time);
  const phase = time >= 0.999 ? t.end : time < PAGE_TIME ? t.beforePage : t.afterPage;

  return (
    <figure className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 sm:p-6">
      <figcaption className="mb-4 font-sans text-lg font-light text-white">{t.title}</figcaption>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={t.status(time, bh, h, p)}>
        <line x1={PAD.left} y1={y(0)} x2={W - PAD.right} y2={y(0)} stroke="rgba(255,255,255,0.25)" />
        <line x1={PAD.left} y1={y(0)} x2={PAD.left} y2={PAD.top} stroke="rgba(255,255,255,0.25)" />
        <text x={W - PAD.right} y={H - 12} textAnchor="end" fill="#8ab8d8" fontSize="12">
          {t.axisX}
        </text>
        <text x={14} y={PAD.top + 10} fill="#8ab8d8" fontSize="12" transform={`rotate(-90 14 ${PAD.top + 10})`} textAnchor="end">
          {t.axisY}
        </text>

        <line x1={x(PAGE_TIME)} y1={y(0)} x2={x(PAGE_TIME)} y2={PAD.top} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 5" />
        <text x={x(PAGE_TIME) + 6} y={PAD.top + 12} fill="#8ab8d8" fontSize="11">
          {t.pageTime}
        </text>

        <path d={path(bhEntropy)} fill="none" stroke="rgba(60,160,255,0.25)" strokeWidth="2" />
        <path d={path(hawkingEntropy)} fill="none" stroke="rgba(255,96,100,0.22)" strokeWidth="2" strokeDasharray="6 6" />
        <path d={path(pageEntropy)} fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="3" />

        <path d={path(bhEntropy, time)} fill="none" stroke="#3ca0ff" strokeWidth="2.5" />
        <path d={path(hawkingEntropy, time)} fill="none" stroke="#ff6064" strokeWidth="2.5" strokeDasharray="6 6" />
        <path d={path(pageEntropy, time)} fill="none" stroke="#00e5ff" strokeWidth="3.5" />

        <line x1={x(time)} y1={y(0)} x2={x(time)} y2={PAD.top} stroke="rgba(255,255,255,0.4)" />
        <circle cx={x(time)} cy={y(bh)} r="5" fill="#3ca0ff" />
        <circle cx={x(time)} cy={y(h)} r="5" fill="#ff6064" />
        <circle cx={x(time)} cy={y(p)} r="6" fill="#00e5ff" stroke="#050610" strokeWidth="2" />
      </svg>

      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
        <li className="flex items-center gap-2 text-text-secondary">
          <span aria-hidden="true" className="h-0.5 w-6 bg-[#3ca0ff]" /> {t.bh}
        </li>
        <li className="flex items-center gap-2 text-text-secondary">
          <span aria-hidden="true" className="h-0.5 w-6 border-t-2 border-dashed border-[#ff6064]" /> {t.hawking}
        </li>
        <li className="flex items-center gap-2 text-text-secondary">
          <span aria-hidden="true" className="h-1 w-6 bg-[#00e5ff]" /> {t.page}
        </li>
      </ul>

      <div className="mt-6">
        <label htmlFor={sliderId} className="mb-2 block text-xs text-text-secondary">
          {t.time}
          {locale === "fr" ? " : " : ": "}
          <strong className="text-white">
            {Math.round(time * 100)}
            {locale === "fr" ? " %" : "%"}
          </strong>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={1}
          step={0.005}
          value={time}
          onChange={(e) => {
            setPlaying(false);
            setTime(parseFloat(e.target.value));
          }}
          aria-valuetext={t.status(time, bh, h, p)}
          className="w-full accent-[#00e5ff]"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              if (reducedMotion) {
                setTime(1);
                return;
              }
              if (time >= 1) setTime(0);
              setPlaying((v) => !v);
            }}
            className="min-h-[44px] rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-5 text-sm text-accent-cyan hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {playing ? t.pause : t.play}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setTime(0);
            }}
            className="min-h-[44px] rounded-full border border-white/15 px-5 text-sm text-text-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.reset}
          </button>
        </div>
      </div>

      <p className="mt-6 rounded-xl border border-white/5 bg-black/30 p-4 text-sm leading-relaxed text-text-secondary" aria-live="polite">
        {phase}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-text-muted">{t.model}</p>
    </figure>
  );
}
