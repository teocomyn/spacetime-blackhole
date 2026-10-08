"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MASS_PRESETS, SIZE_REFERENCES } from "@/lib/blackHoles";
import { SOLAR_MASS, formatLength, formatNumber, schwarzschildRadius } from "@/lib/physics";

const TEXT = {
  fr: {
    pick: "Choisissez un trou noir",
    horizon: "Horizon",
    ratio: (r: string, ref: string) => `L'horizon est ${r} fois plus grand que ${ref}.`,
    ratioSmaller: (r: string, ref: string) => `L'horizon est ${r} fois plus petit que ${ref}.`,
    diameter: "Diamètre de l'horizon",
    mass: "Masse",
    solar: "masses solaires",
    ladder: "Tous les trous noirs sur une échelle logarithmique (chaque graduation multiplie la taille par 1 000)",
    hypothetical: "hypothétique",
    hint: "L'horizon est dessiné en noir avec son anneau de lumière ; l'objet de comparaison en pointillés.",
  },
  en: {
    pick: "Pick a black hole",
    horizon: "Horizon",
    ratio: (r: string, ref: string) => `The horizon is ${r} times larger than ${ref}.`,
    ratioSmaller: (r: string, ref: string) => `The horizon is ${r} times smaller than ${ref}.`,
    diameter: "Horizon diameter",
    mass: "Mass",
    solar: "solar masses",
    ladder: "Every black hole on a logarithmic scale (each tick multiplies the size by 1,000)",
    hypothetical: "hypothetical",
    hint: "The horizon is drawn in black with its ring of light; the comparison object is dashed.",
  },
} as const;

const PRESETS = MASS_PRESETS.filter((p) => p.id !== "asteroid" && p.id !== "moon");
const VIEW = 320;

export default function ScaleComparator() {
  const { locale } = useApp();
  const t = TEXT[locale];
  const [selected, setSelected] = useState("sgr-a");

  const preset = PRESETS.find((p) => p.id === selected) ?? PRESETS[0];
  const diameter = 2 * schwarzschildRadius(preset.mass);

  // Objet de référence : le plus proche en ordre de grandeur, pour que les deux restent visibles.
  const reference = SIZE_REFERENCES.reduce((best, ref) =>
    Math.abs(Math.log10(ref.size / diameter)) < Math.abs(Math.log10(best.size / diameter)) ? ref : best
  );
  const largest = Math.max(diameter, reference.size);
  const scale = (VIEW * 0.42) / (largest / 2);
  const bhR = Math.max(1.5, (diameter / 2) * scale);
  const refR = Math.max(1.5, (reference.size / 2) * scale);
  const ratio = diameter / reference.size;

  const minLog = -3;
  const maxLog = 15;
  const ladderX = (size: number) => 20 + ((Math.log10(size) - minLog) / (maxLog - minLog)) * 600;

  return (
    <div className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 sm:p-6">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">{t.pick}</legend>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={selected === p.id}
              onClick={() => setSelected(p.id)}
              className={`min-h-[38px] rounded-full border px-3.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                selected === p.id
                  ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan"
                  : "border-white/10 text-text-secondary hover:text-white"
              }`}
            >
              {p.name[locale]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="mx-auto h-auto w-full max-w-[360px]"
          role="img"
          aria-label={
            ratio >= 1
              ? t.ratio(formatNumber(ratio, locale, 2), reference[locale])
              : t.ratioSmaller(formatNumber(1 / ratio, locale, 2), reference[locale])
          }
        >
          <defs>
            <radialGradient id="scale-glow">
              <stop offset="70%" stopColor="rgba(0,229,255,0)" />
              <stop offset="85%" stopColor="rgba(0,229,255,0.55)" />
              <stop offset="100%" stopColor="rgba(0,229,255,0)" />
            </radialGradient>
          </defs>
          <circle cx={VIEW / 2} cy={VIEW / 2} r={refR} fill="rgba(60,160,255,0.06)" stroke="#8ab8d8" strokeDasharray="4 5" />
          <circle cx={VIEW / 2} cy={VIEW / 2} r={bhR * 1.35} fill="url(#scale-glow)" />
          <circle cx={VIEW / 2} cy={VIEW / 2} r={bhR} fill="#000" stroke="rgba(0,229,255,0.7)" strokeWidth="1" />
          <text x={VIEW / 2} y={VIEW - 10} textAnchor="middle" fill="#8ab8d8" fontSize="12">
            {reference[locale]}
          </text>
        </svg>

        <dl className="space-y-4" aria-live="polite">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">{t.mass}</dt>
            <dd className="mt-1 text-lg text-white">
              {formatNumber(preset.mass / SOLAR_MASS, locale)} {t.solar}
              {preset.hypothetical && <span className="ml-2 text-xs text-text-muted">({t.hypothetical})</span>}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">{t.diameter}</dt>
            <dd className="mt-1 text-lg text-white">{formatLength(diameter, locale)}</dd>
          </div>
          <dd className="text-sm leading-relaxed text-text-secondary">
            {ratio >= 1
              ? t.ratio(formatNumber(ratio, locale, 2), reference[locale])
              : t.ratioSmaller(formatNumber(1 / ratio, locale, 2), reference[locale])}{" "}
            {preset.note[locale]}
          </dd>
          <dd className="text-xs text-text-muted">{t.hint}</dd>
        </dl>
      </div>

      <figure className="mt-10">
        <figcaption className="mb-3 text-xs text-text-secondary">{t.ladder}</figcaption>
        <svg viewBox="0 0 640 150" className="h-auto w-full" role="img" aria-label={t.ladder}>
          <line x1="20" y1="80" x2="620" y2="80" stroke="rgba(255,255,255,0.2)" />
          {[-3, 0, 3, 6, 9, 12, 15].map((exp) => (
            <g key={exp}>
              <line x1={ladderX(10 ** exp)} y1="74" x2={ladderX(10 ** exp)} y2="86" stroke="rgba(255,255,255,0.35)" />
              <text x={ladderX(10 ** exp)} y="102" textAnchor="middle" fill="#6a8aa6" fontSize="10">
                {formatLength(10 ** exp, locale)}
              </text>
            </g>
          ))}
          {SIZE_REFERENCES.filter((r) => r.size >= 1e-3 && r.size <= 1e15).map((ref) => (
            <g key={ref.en}>
              <circle cx={ladderX(ref.size)} cy="80" r="2.5" fill="#8ab8d8" />
              <text
                x={ladderX(ref.size)}
                y="122"
                fill="#6a8aa6"
                fontSize="9"
                textAnchor="end"
                transform={`rotate(-35 ${ladderX(ref.size)} 122)`}
              >
                {ref[locale]}
              </text>
            </g>
          ))}
          {PRESETS.map((p, i) => {
            const d = 2 * schwarzschildRadius(p.mass);
            const active = p.id === preset.id;
            return (
              <g key={p.id}>
                <line
                  x1={ladderX(d)}
                  y1={active ? 30 : 46 + (i % 3) * 6}
                  x2={ladderX(d)}
                  y2="80"
                  stroke={active ? "#00e5ff" : "rgba(0,229,255,0.35)"}
                />
                <circle cx={ladderX(d)} cy="80" r={active ? 5 : 3.5} fill="#000" stroke="#00e5ff" />
                {active && (
                  <text x={ladderX(d)} y="22" textAnchor="middle" fill="#00e5ff" fontSize="11">
                    {p.name[locale]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </figure>
    </div>
  );
}
