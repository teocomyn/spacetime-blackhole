import type { Locale } from "@/context/AppContext";
import { EARTH_MASS, MOON_MASS, SOLAR_MASS } from "@/lib/physics";

export type MassPreset = {
  id: string;
  name: { fr: string; en: string };
  mass: number;
  note: { fr: string; en: string };
  hypothetical?: boolean;
};

/** Masses de référence pour le calculateur et le comparateur (valeurs centrales des estimations publiées). */
export const MASS_PRESETS: MassPreset[] = [
  {
    id: "asteroid",
    name: { fr: "Astéroïde (10¹² kg)", en: "Asteroid (10¹² kg)" },
    mass: 1e12,
    note: {
      fr: "Hypothétique trou noir primordial, de la masse d'une petite montagne.",
      en: "Hypothetical primordial black hole with the mass of a small mountain.",
    },
    hypothetical: true,
  },
  {
    id: "moon",
    name: { fr: "La Lune", en: "The Moon" },
    mass: MOON_MASS,
    note: { fr: "Si la Lune devenait un trou noir.", en: "If the Moon became a black hole." },
    hypothetical: true,
  },
  {
    id: "earth",
    name: { fr: "La Terre", en: "Earth" },
    mass: EARTH_MASS,
    note: { fr: "Si la Terre devenait un trou noir.", en: "If Earth became a black hole." },
    hypothetical: true,
  },
  {
    id: "sun",
    name: { fr: "Le Soleil", en: "The Sun" },
    mass: SOLAR_MASS,
    note: {
      fr: "Le Soleil ne deviendra jamais un trou noir : il est trop léger.",
      en: "The Sun will never become a black hole: it is too light.",
    },
    hypothetical: true,
  },
  {
    id: "gaia-bh1",
    name: { fr: "Gaia BH1", en: "Gaia BH1" },
    mass: 9.62 * SOLAR_MASS,
    note: {
      fr: "Le trou noir connu le plus proche de nous, à environ 1 560 années-lumière.",
      en: "The nearest known black hole, about 1,560 light-years away.",
    },
  },
  {
    id: "cygnus-x1",
    name: { fr: "Cygnus X-1", en: "Cygnus X-1" },
    mass: 21.2 * SOLAR_MASS,
    note: {
      fr: "Le premier objet largement accepté comme trou noir, dans les années 1970.",
      en: "The first object widely accepted as a black hole, in the 1970s.",
    },
  },
  {
    id: "gaia-bh3",
    name: { fr: "Gaia BH3", en: "Gaia BH3" },
    mass: 32.7 * SOLAR_MASS,
    note: {
      fr: "Le trou noir stellaire le plus massif connu dans la Voie lactée, découvert en 2024 à environ 1 930 années-lumière.",
      en: "The most massive stellar black hole known in the Milky Way, found in 2024 about 1,930 light-years away.",
    },
  },
  {
    id: "gw150914",
    name: { fr: "GW150914 (après fusion)", en: "GW150914 (after merger)" },
    mass: 62 * SOLAR_MASS,
    note: {
      fr: "Né de la fusion détectée par LIGO en 2015.",
      en: "Born from the merger detected by LIGO in 2015.",
    },
  },
  {
    id: "gw190521",
    name: { fr: "GW190521 (après fusion)", en: "GW190521 (after merger)" },
    mass: 142 * SOLAR_MASS,
    note: {
      fr: "Le premier trou noir de masse intermédiaire clairement observé, né d'une fusion détectée en 2019.",
      en: "The first clearly observed intermediate-mass black hole, born from a merger detected in 2019.",
    },
  },
  {
    id: "sgr-a",
    name: { fr: "Sgr A*", en: "Sgr A*" },
    mass: 4.3e6 * SOLAR_MASS,
    note: {
      fr: "Le trou noir supermassif au centre de la Voie lactée.",
      en: "The supermassive black hole at the centre of the Milky Way.",
    },
  },
  {
    id: "m87",
    name: { fr: "M87*", en: "M87*" },
    mass: 6.5e9 * SOLAR_MASS,
    note: {
      fr: "Le premier trou noir photographié, en 2019.",
      en: "The first black hole ever imaged, in 2019.",
    },
  },
  {
    id: "ton618",
    name: { fr: "TON 618", en: "TON 618" },
    mass: 6.6e10 * SOLAR_MASS,
    note: {
      fr: "Parmi les plus massifs connus : entre 40 et 70 milliards de masses solaires selon les estimations, incertaines d'un facteur 2 à 3.",
      en: "Among the most massive known: between 40 and 70 billion solar masses depending on the estimate, uncertain by a factor of 2 to 3.",
    },
  },
];

/** Diamètres de référence (m) pour donner une échelle familière. */
export const SIZE_REFERENCES: { size: number; fr: string; en: string }[] = [
  { size: 1.7e-15, fr: "un proton", en: "a proton" },
  { size: 1e-10, fr: "un atome", en: "an atom" },
  { size: 7e-6, fr: "un globule rouge", en: "a red blood cell" },
  { size: 5e-4, fr: "un grain de sable", en: "a grain of sand" },
  { size: 0.016, fr: "une bille", en: "a marble" },
  { size: 0.22, fr: "un ballon de football", en: "a football" },
  { size: 100, fr: "un terrain de football", en: "a football pitch" },
  { size: 10_000, fr: "Paris intra-muros", en: "the city of Paris" },
  { size: 1e5, fr: "un département français", en: "a small country like Luxembourg" },
  { size: 1.2742e7, fr: "la Terre", en: "Earth" },
  { size: 1.3927e9, fr: "le Soleil", en: "the Sun" },
  { size: 2.99e11, fr: "l'orbite de la Terre", en: "Earth's orbit" },
  { size: 9e12, fr: "l'orbite de Neptune", en: "Neptune's orbit" },
  { size: 5e13, fr: "le Système solaire jusqu'à Voyager 1", en: "the Solar System out to Voyager 1" },
];

/** Compare une taille (m) à l'objet familier le plus proche en ordre de grandeur, avec un rapport chiffré. */
export function describeSize(size: number, locale: Locale): string {
  let best = SIZE_REFERENCES[0];
  for (const ref of SIZE_REFERENCES) {
    if (Math.abs(Math.log10(ref.size / size)) < Math.abs(Math.log10(best.size / size))) best = ref;
  }
  const ratio = size / best.size;
  const fmt = (v: number) =>
    Number(v.toPrecision(2)).toLocaleString(locale === "fr" ? "fr-FR" : "en-GB", { maximumSignificantDigits: 2 });
  const name = best[locale];
  if (locale === "en") {
    if (ratio >= 0.5 && ratio <= 2) return `about the size of ${name}`;
    return ratio > 2 ? `${fmt(ratio)} times ${name}` : `${fmt(1 / ratio)} times smaller than ${name}`;
  }
  if (ratio >= 0.5 && ratio <= 2) return `de l'ordre ${frenchDe(name)}`;
  return ratio > 2 ? `${fmt(ratio)} fois ${name}` : `${fmt(1 / ratio)} fois plus petit ${frenchQue(name)}`;
}

function frenchDe(name: string): string {
  if (name.startsWith("le ")) return `du ${name.slice(3)}`;
  if (name.startsWith("un ") || name.startsWith("une ")) return `d'${name}`;
  return `de ${name}`;
}

function frenchQue(name: string): string {
  return name.startsWith("un ") || name.startsWith("une ") ? `qu'${name}` : `que ${name}`;
}
