"use client";

import Link from "next/link";
import EhtImage from "@/components/topic/EhtImage";
import ChirpPlayer from "@/components/tools/ChirpPlayer";
import { useApp } from "@/context/AppContext";
import { pagePath } from "@/lib/routes";
import { useTilt } from "@/hooks/useTilt";

const TEXT = {
  fr: {
    kicker: "[ observés ]",
    title: "Ils ne sont plus seulement des équations : on les a photographiés et entendus.",
    subtitle:
      "En 2015, LIGO a capté le frémissement de l'espace-temps produit par deux trous noirs qui fusionnent. En 2019 puis en 2022, l'Event Horizon Telescope a obtenu l'image de leur ombre.",
    gwTitle: "14 septembre 2015 : deux trous noirs de 36 et 29 masses solaires fusionnent à 1,3 milliard d'années-lumière.",
    gwBody:
      "Trois masses solaires sont converties en ondes gravitationnelles en une fraction de seconde. Le signal, appelé GW150914, a valu le prix Nobel 2017 à Rainer Weiss, Barry Barish et Kip Thorne.",
    facts: [
      { value: "1 560 al", label: "Gaia BH1, le trou noir connu le plus proche (2022)" },
      { value: "33 M☉", label: "Gaia BH3, le plus massif des trous noirs stellaires de la Voie lactée (2024)" },
      { value: "S = A/4", label: "L'information d'un trou noir se mesure à l'aire de son horizon" },
    ],
    linkBlackHoles: "Comprendre les trous noirs observés",
    linkWaves: "Tout sur les ondes gravitationnelles",
    cta: "Vers l'épilogue",
  },
  en: {
    kicker: "[ observed ]",
    title: "They are no longer just equations: we have photographed and heard them.",
    subtitle:
      "In 2015, LIGO caught the shiver of spacetime from two merging black holes. In 2019 and 2022, the Event Horizon Telescope imaged their shadow.",
    gwTitle: "14 September 2015: black holes of 36 and 29 solar masses merge 1.3 billion light-years away.",
    gwBody:
      "Three solar masses are turned into gravitational waves in a fraction of a second. The signal, GW150914, earned Rainer Weiss, Barry Barish and Kip Thorne the 2017 Nobel Prize.",
    facts: [
      { value: "1,560 ly", label: "Gaia BH1, the nearest known black hole (2022)" },
      { value: "33 M☉", label: "Gaia BH3, the most massive stellar black hole in the Milky Way (2024)" },
      { value: "S = A/4", label: "A black hole's information scales with its horizon area" },
    ],
    linkBlackHoles: "Understand the observed black holes",
    linkWaves: "All about gravitational waves",
    cta: "To the epilogue",
  },
} as const;

export default function ObservedSection() {
  const { locale } = useApp();
  const t = TEXT[locale];
  const tilt = useTilt(7);

  return (
    <section
      id="horizons"
      className="relative z-[70] min-h-screen bg-[#050608] px-[clamp(16px,3.8vw,72px)] py-[clamp(48px,6vw,96px)] text-white"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/70">{t.kicker}</p>
        <h2 className="max-w-4xl font-sans text-[clamp(1.9rem,3.6vw,3.2rem)] font-light leading-[1.08] tracking-[-0.02em]">
          {t.title}
        </h2>
        <p className="mt-5 max-w-3xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-white/60">{t.subtitle}</p>

        <div className="mt-12 grid items-start gap-5 md:grid-cols-2">
          <div {...tilt} className="tilt rounded-2xl">
            <EhtImage which="m87" locale={locale} />
          </div>
          <div {...tilt} className="tilt rounded-2xl">
            <EhtImage which="sgrA" locale={locale} />
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <h3 className="font-sans text-[clamp(1.25rem,2vw,1.6rem)] font-light leading-snug">{t.gwTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t.gwBody}</p>
          </div>
          <ChirpPlayer />
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {t.facts.map((fact) => (
            <div key={fact.value} {...tilt} className="tilt rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <dt className="font-sans text-3xl font-extralight text-white">{fact.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/60">{fact.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={pagePath("blackHoles", locale)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.linkBlackHoles} →
          </Link>
          <Link
            href={pagePath("waves", locale)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.linkWaves} →
          </Link>
          <a
            href="#footer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.cta} ↓
          </a>
        </div>
      </div>
    </section>
  );
}
