"use client";

import { useId, useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { MASS_PRESETS, describeSize } from "@/lib/blackHoles";
import {
  AGE_OF_UNIVERSE_YEARS,
  EARTH_MASS,
  SOLAR_MASS,
  YEAR,
  entropyOverKb,
  evaporationTimeSeconds,
  formatDuration,
  formatLength,
  formatNumber,
  formatTemperature,
  hawkingTemperature,
  maxProperTimeToSingularity,
  meanDensity,
  schwarzschildRadius,
  tidalAccelerationAtHorizon,
  tidalRadius,
} from "@/lib/physics";

type Unit = "kg" | "earth" | "sun";
const UNIT_FACTOR: Record<Unit, number> = { kg: 1, earth: EARTH_MASS, sun: SOLAR_MASS };

const TEXT = {
  fr: {
    presets: "Exemples",
    custom: "Ou votre propre masse",
    massLabel: "Masse",
    units: { kg: "kg", earth: "masses terrestres", sun: "masses solaires" },
    invalid: "Entrez un nombre positif, par exemple 3,5 ou 2e30.",
    radius: "Rayon de l'horizon",
    diameter: "Diamètre",
    temperature: "Température de Hawking",
    evaporation: "Durée de vie par évaporation",
    entropy: "Entropie (information maximale)",
    tidal: "Marée à l'horizon (corps de 2 m)",
    fall: "De l'horizon à la singularité",
    density: "Densité moyenne",
    spaghetti: "Spaghettification (100 g sur 2 m)",
    outside: "Avant l'horizon",
    inside: "Sous l'horizon",
    universeRatio: (r: string) => `${r} fois l'âge de l'Univers`,
    alreadyGone: "s'évaporerait avant aujourd'hui",
    bits: "bits",
    gUnit: "g",
    beforeHorizon: (d: string) => `à ${d} du centre, bien avant l'horizon : vous seriez détruit avant d'entrer.`,
    afterHorizon: (d: string) => `seulement à ${d} du centre, à l'intérieur de l'horizon : vous le traverseriez intact.`,
    water: (r: string) => `${r} fois la densité de l'eau`,
    cmb: "plus froid que le fond diffus cosmologique (2,7 K) : il absorbe plus qu'il n'émet",
    hotter: "plus chaud que le fond diffus cosmologique (2,7 K) : il s'évapore aujourd'hui",
    approx: "Durée calculée en ne comptant que l'émission de photons ; inclure les autres particules raccourcit un peu la durée.",
  },
  en: {
    presets: "Examples",
    custom: "Or your own mass",
    massLabel: "Mass",
    units: { kg: "kg", earth: "Earth masses", sun: "solar masses" },
    invalid: "Enter a positive number, for example 3.5 or 2e30.",
    radius: "Horizon radius",
    diameter: "Diameter",
    temperature: "Hawking temperature",
    evaporation: "Evaporation lifetime",
    entropy: "Entropy (maximum information)",
    tidal: "Tide at the horizon (2 m body)",
    fall: "From horizon to singularity",
    density: "Mean density",
    spaghetti: "Spaghettification (100 g over 2 m)",
    outside: "Outside the horizon",
    inside: "Inside the horizon",
    universeRatio: (r: string) => `${r} times the age of the Universe`,
    alreadyGone: "would already have evaporated",
    bits: "bits",
    gUnit: "g",
    beforeHorizon: (d: string) => `at ${d} from the centre, well outside the horizon: you would be destroyed before entering.`,
    afterHorizon: (d: string) => `only at ${d} from the centre, inside the horizon: you would cross it intact.`,
    water: (r: string) => `${r} times the density of water`,
    cmb: "colder than the cosmic microwave background (2.7 K): it absorbs more than it emits",
    hotter: "hotter than the cosmic microwave background (2.7 K): it is evaporating today",
    approx: "Lifetime computed with photon emission only; including other particles shortens it somewhat.",
  },
} as const;

function parseMass(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".").replace(/×10\^?/i, "e");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) && value > 0 ? value : null;
}

export default function BlackHoleCalculator({ compact = false }: { compact?: boolean }) {
  const { locale } = useApp();
  const t = TEXT[locale];
  const inputId = useId();
  const unitId = useId();
  const [presetId, setPresetId] = useState<string | null>("sun");
  const [raw, setRaw] = useState("1");
  const [unit, setUnit] = useState<Unit>("sun");

  const parsed = parseMass(raw);
  const mass = parsed ? parsed * UNIT_FACTOR[unit] : null;

  const results = useMemo(() => {
    if (!mass) return null;
    const rs = schwarzschildRadius(mass);
    const temp = hawkingTemperature(mass);
    const lifeYears = evaporationTimeSeconds(mass) / YEAR;
    const tidal = tidalAccelerationAtHorizon(mass, 2) / 9.81;
    const spaghettiRadius = tidalRadius(mass, 2, 1000);
    return { rs, temp, lifeYears, tidal, spaghettiRadius };
  }, [mass]);

  const preset = MASS_PRESETS.find((p) => p.id === presetId);

  const card = (label: string, value: string, detail?: string) => (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">{label}</dt>
      <dd className="mt-2 font-sans text-xl text-white">{value}</dd>
      {detail && <dd className="mt-1 text-xs leading-relaxed text-text-secondary">{detail}</dd>}
    </div>
  );

  return (
    <div className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 sm:p-6">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">{t.presets}</legend>
        <div className="flex flex-wrap gap-2">
          {MASS_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={presetId === p.id}
              onClick={() => {
                setPresetId(p.id);
                if (p.mass >= 0.01 * SOLAR_MASS) {
                  setUnit("sun");
                  setRaw(String(Number((p.mass / SOLAR_MASS).toPrecision(4))));
                } else if (p.mass >= 0.001 * EARTH_MASS) {
                  setUnit("earth");
                  setRaw(String(Number((p.mass / EARTH_MASS).toPrecision(4))));
                } else {
                  setUnit("kg");
                  setRaw(p.mass.toExponential(2).replace("+", ""));
                }
              }}
              className={`min-h-[38px] rounded-full border px-3.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                presetId === p.id
                  ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan"
                  : "border-white/10 text-text-secondary hover:text-white"
              }`}
            >
              {p.name[locale]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[160px]">
          <label htmlFor={inputId} className="mb-2 block text-xs text-text-secondary">
            {t.custom}
          </label>
          <input
            id={inputId}
            inputMode="decimal"
            value={raw}
            onChange={(e) => {
              setRaw(e.target.value);
              setPresetId(null);
            }}
            aria-invalid={parsed === null}
            aria-describedby={parsed === null ? `${inputId}-error` : undefined}
            className="min-h-[44px] w-full rounded-lg border border-white/15 bg-black/40 px-3 font-sans text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          />
        </div>
        <div>
          <label htmlFor={unitId} className="sr-only">
            {t.massLabel}
          </label>
          <select
            id={unitId}
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value as Unit);
              setPresetId(null);
            }}
            className="min-h-[44px] rounded-lg border border-white/15 bg-black/40 px-3 font-sans text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {(Object.keys(UNIT_FACTOR) as Unit[]).map((u) => (
              <option key={u} value={u}>
                {t.units[u]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {parsed === null && (
        <p id={`${inputId}-error`} className="mt-2 text-xs text-accent-red">
          {t.invalid}
        </p>
      )}
      {preset && <p className="mt-3 text-sm text-text-secondary">{preset.note[locale]}</p>}

      {results && mass && (
        <dl className={`mt-6 grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`} aria-live="polite">
          {card(
            t.radius,
            formatLength(results.rs, locale),
            `${t.diameter} ${formatLength(2 * results.rs, locale)}, ${describeSize(2 * results.rs, locale)}`
          )}
          {card(t.temperature, formatTemperature(results.temp, locale), results.temp < 2.725 ? t.cmb : t.hotter)}
          {card(
            t.evaporation,
            formatDuration(results.lifeYears * YEAR, locale),
            results.lifeYears < AGE_OF_UNIVERSE_YEARS
              ? t.alreadyGone
              : t.universeRatio(formatNumber(results.lifeYears / AGE_OF_UNIVERSE_YEARS, locale, 2))
          )}
          {!compact &&
            card(
              t.entropy,
              `${formatNumber(entropyOverKb(mass) / Math.LN2, locale)} ${t.bits}`
            )}
          {card(
            t.spaghetti,
            results.spaghettiRadius > results.rs ? t.outside : t.inside,
            results.spaghettiRadius > results.rs
              ? t.beforeHorizon(formatLength(results.spaghettiRadius, locale))
              : t.afterHorizon(formatLength(results.spaghettiRadius, locale))
          )}
          {!compact && card(t.tidal, `${formatNumber(results.tidal, locale)} ${t.gUnit}`)}
          {!compact && card(t.fall, formatDuration(maxProperTimeToSingularity(mass), locale))}
          {!compact && card(t.density, `${formatNumber(meanDensity(mass), locale)} kg/m³`, t.water(formatNumber(meanDensity(mass) / 1000, locale)))}
        </dl>
      )}
      <p className="mt-4 text-xs text-text-muted">{t.approx}</p>
    </div>
  );
}
