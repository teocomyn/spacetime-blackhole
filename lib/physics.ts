import type { Locale } from "@/context/AppContext";

// Constantes CODATA 2018 et valeurs astronomiques nominales (IAU).
export const G = 6.6743e-11;
export const C = 299_792_458;
export const HBAR = 1.054571817e-34;
export const K_B = 1.380649e-23;
export const SOLAR_MASS = 1.98841e30;
export const EARTH_MASS = 5.9722e24;
export const MOON_MASS = 7.342e22;
export const YEAR = 365.25 * 86_400;
export const LIGHT_YEAR = 9.4607304725808e15;
export const AU = 1.495978707e11;
export const AGE_OF_UNIVERSE_YEARS = 13.8e9;

export function schwarzschildRadius(mass: number): number {
  return (2 * G * mass) / (C * C);
}

export function hawkingTemperature(mass: number): number {
  return (HBAR * C ** 3) / (8 * Math.PI * G * mass * K_B);
}

/** Durée de vie par évaporation, approximation n'incluant que l'émission de photons. */
export function evaporationTimeSeconds(mass: number): number {
  return (5120 * Math.PI * G * G * mass ** 3) / (HBAR * C ** 4);
}

/** Entropie de Bekenstein-Hawking divisée par k_B (sans dimension). */
export function entropyOverKb(mass: number): number {
  return (4 * Math.PI * G * mass * mass) / (HBAR * C);
}

/** Différence d'accélération entre la tête et les pieds d'un corps de longueur L, posé à l'horizon. */
export function tidalAccelerationAtHorizon(mass: number, bodyLength = 2): number {
  const rs = schwarzschildRadius(mass);
  return (2 * G * mass * bodyLength) / rs ** 3;
}

/** Rayon où la marée atteint une accélération donnée sur un corps de longueur L (en mètres). */
export function tidalRadius(mass: number, bodyLength: number, maxAcceleration: number): number {
  return Math.cbrt((2 * G * mass * bodyLength) / maxAcceleration);
}

/** Temps propre maximal entre l'horizon et la singularité (Schwarzschild). */
export function maxProperTimeToSingularity(mass: number): number {
  return (Math.PI * G * mass) / C ** 3;
}

export function meanDensity(mass: number): number {
  const rs = schwarzschildRadius(mass);
  return mass / ((4 / 3) * Math.PI * rs ** 3);
}

const SUPERSCRIPT: Record<string, string> = {
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function localeTag(locale: Locale) {
  return locale === "fr" ? "fr-FR" : "en-GB";
}

export function formatNumber(value: number, locale: Locale, digits = 3): string {
  if (!Number.isFinite(value)) return "∞";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e-3 && abs < 1e6) {
    return value.toLocaleString(localeTag(locale), { maximumSignificantDigits: digits });
  }
  const exponent = Math.floor(Math.log10(abs));
  let mantissa = value / 10 ** exponent;
  let exp = exponent;
  if (Math.abs(Number(mantissa.toPrecision(digits))) >= 10) {
    mantissa /= 10;
    exp += 1;
  }
  const mant = Number(mantissa.toPrecision(digits)).toLocaleString(localeTag(locale), {
    maximumSignificantDigits: digits,
  });
  const sup = String(exp)
    .split("")
    .map((ch) => SUPERSCRIPT[ch] ?? ch)
    .join("");
  return `${mant} × 10${sup}`;
}

export function formatLength(meters: number, locale: Locale): string {
  const n = (v: number) => formatNumber(v, locale);
  if (meters < 1e-3) return `${n(meters)} m`;
  if (meters < 1) return `${n(meters * 1000)} mm`;
  if (meters < 1000) return `${n(meters)} m`;
  if (meters < 1e9) return `${n(meters / 1000)} km`;
  if (meters < 0.5 * AU) {
    const millions = meters / 1e9;
    const unit = locale === "fr" ? (millions < 2 ? "million de km" : "millions de km") : "million km";
    return `${n(millions)} ${unit}`;
  }
  if (meters < 0.05 * LIGHT_YEAR) return `${n(meters / AU)} ${locale === "fr" ? "ua" : "AU"}`;
  return `${n(meters / LIGHT_YEAR)} ${locale === "fr" ? "années-lumière" : "light-years"}`;
}

export function formatDuration(seconds: number, locale: Locale): string {
  const n = (v: number) => formatNumber(v, locale);
  const fr = locale === "fr";
  if (seconds < 1e-6) return `${n(seconds)} s`;
  if (seconds < 1e-3) return `${n(seconds * 1e6)} µs`;
  if (seconds < 1) return `${n(seconds * 1000)} ms`;
  if (seconds < 120) return `${n(seconds)} s`;
  if (seconds < 7200) return `${n(seconds / 60)} min`;
  if (seconds < 2 * 86_400) return `${n(seconds / 3600)} h`;
  if (seconds < YEAR) return `${n(seconds / 86_400)} ${fr ? "jours" : "days"}`;
  return `${n(seconds / YEAR)} ${fr ? "ans" : "years"}`;
}

export function formatTemperature(kelvin: number, locale: Locale): string {
  return `${formatNumber(kelvin, locale)} K`;
}
