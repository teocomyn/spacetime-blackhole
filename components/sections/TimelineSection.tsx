"use client";

import { useRef } from "react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { useTilt } from "@/hooks/useTilt";

const TIMELINE = [
  {
    id: "bekenstein-1973",
    year: "1973",
    authorFr: "Bekenstein",
    authorEn: "Bekenstein",
    titleFr: "L'entropie vit sur la surface",
    titleEn: "Entropy lives on the surface",
    descFr:
      "Bekenstein propose que l'entropie d'un trou noir soit proportionnelle à l'aire de son horizon, pas à son volume. Premier indice holographique.",
    descEn:
      "Bekenstein proposes that a black hole's entropy is proportional to its horizon area, not its volume. The first holographic hint.",
    color: "#3a5f8f",
  },
  {
    id: "hawking-1974",
    year: "1974",
    authorFr: "Hawking",
    authorEn: "Hawking",
    titleFr: "Les trous noirs s'évaporent",
    titleEn: "Black holes evaporate",
    descFr:
      "Hawking montre qu'un trou noir rayonne et fixe la formule S = A/4. Naît le paradoxe de l'information : que devient ce qui est tombé dedans ?",
    descEn:
      "Hawking shows that black holes radiate and fixes the formula S = A/4. The information paradox is born: what happens to what fell in?",
    color: "#ff3c3c",
  },
  {
    id: "maldacena-1997",
    year: "1997",
    authorFr: "Maldacena",
    authorEn: "Maldacena",
    titleFr: "L'holographie (AdS/CFT)",
    titleEn: "Holography (AdS/CFT)",
    descFr:
      "Une théorie avec gravité dans un espace Anti-de Sitter équivaut à une théorie quantique sans gravité vivant sur sa frontière, avec une dimension de moins. La gravité se comporte comme un hologramme.",
    descEn:
      "A theory with gravity in Anti-de Sitter space is equivalent to a quantum theory without gravity living on its boundary, with one dimension fewer. Gravity behaves like a hologram.",
    color: "#3ca0ff",
  },
  {
    id: "ryu-takayanagi-2006",
    year: "2006",
    authorFr: "Ryu & Takayanagi",
    authorEn: "Ryu & Takayanagi",
    titleFr: "L'intrication mesure la géométrie",
    titleEn: "Entanglement measures geometry",
    descFr:
      "L'entropie d'intrication d'une région de la frontière est égale à l'aire d'une surface minimale à l'intérieur. Intrication et géométrie deviennent deux langages pour une même réalité.",
    descEn:
      "The entanglement entropy of a boundary region equals the area of a minimal surface in the interior. Entanglement and geometry become two languages for the same reality.",
    color: "#00e5ff",
  },
  {
    id: "van-raamsdonk-2010",
    year: "2010",
    authorFr: "Van Raamsdonk",
    authorEn: "Van Raamsdonk",
    titleFr: "L'intrication coud l'espace",
    titleEn: "Entanglement stitches space together",
    descFr:
      "Réduire l'intrication entre deux moitiés de la frontière éloigne puis sépare les régions correspondantes de l'espace-temps. Sans intrication, plus d'espace d'un seul tenant.",
    descEn:
      "Reducing the entanglement between two halves of the boundary pulls the corresponding regions of spacetime apart until they disconnect. Without entanglement, space falls apart.",
    color: "#b480ff",
  },
  {
    id: "verlinde-2010",
    year: "2010",
    authorFr: "Verlinde",
    authorEn: "Verlinde",
    titleFr: "La gravité serait entropique",
    titleEn: "Gravity may be entropic",
    descFr:
      "Verlinde propose que la gravité ne soit pas une force fondamentale mais émerge statistiquement, comme la pression d'un gaz. Une hypothèse encore débattue.",
    descEn:
      "Verlinde proposes that gravity is not a fundamental force but emerges statistically, like gas pressure. A hypothesis still under debate.",
    color: "#5a8aaa",
  },
  {
    id: "er-epr-2013",
    year: "2013",
    authorFr: "Maldacena & Susskind",
    authorEn: "Maldacena & Susskind",
    titleFr: "ER = EPR",
    titleEn: "ER = EPR",
    descFr:
      "Conjecture : deux particules intriquées seraient reliées par un trou de ver microscopique. La connectivité de l'espace serait faite d'intrication.",
    descEn:
      "Conjecture: two entangled particles would be linked by a microscopic wormhole. The connectivity of space would be made of entanglement.",
    color: "#ff3c3c",
  },
  {
    id: "pastawski-2015",
    year: "2015",
    authorFr: "Pastawski, Yoshida, Harlow & Preskill",
    authorEn: "Pastawski, Yoshida, Harlow & Preskill",
    titleFr: "L'espace-temps comme code",
    titleEn: "Spacetime as a code",
    descFr:
      "La correspondance holographique se comporte comme un code correcteur d'erreurs quantique : l'information de l'intérieur est encodée de façon redondante sur la frontière.",
    descEn:
      "The holographic correspondence behaves like a quantum error-correcting code: information from the interior is redundantly encoded on the boundary.",
    color: "#3ca0ff",
  },
  {
    id: "page-curve-2019",
    year: "2019",
    authorFr: "Penington ; Almheiri et al.",
    authorEn: "Penington; Almheiri et al.",
    titleFr: "La courbe de Page retrouvée",
    titleEn: "The Page curve recovered",
    descFr:
      "En ajoutant des « îlots » d'intrication au calcul, deux équipes retrouvent la courbe de Page : l'information semble bien ressortir d'un trou noir qui s'évapore.",
    descEn:
      "By adding entanglement \"islands\" to the calculation, two teams recover the Page curve: information does seem to escape an evaporating black hole.",
    color: "#00e5ff",
  },
];
export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useApp();
  const t = useTranslation(locale);
  const isEn = locale === "en";
  const tilt = useTilt(6);

  return (
    <section ref={containerRef} id="timeline" className="relative w-full bg-gradient-to-b from-black/80 via-black/35 to-black/60 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
        <div className="text-center mb-32">
          <h2 className="font-sans text-[clamp(2rem,5vw,4rem)] text-white mb-4">
            {t.timeline.title}
          </h2>
          <p className="font-sans text-sm tracking-widest text-text-muted uppercase">
            {t.timeline.subtitle}
          </p>
        </div>

        <div className="absolute left-8 md:left-1/2 top-64 bottom-12 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2" />

        <div className="relative z-10 flex flex-col gap-24 md:gap-32">
          {TIMELINE.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <article
                key={item.id}
                className={`reveal-3d ${isLeft ? "reveal-left" : "reveal-right"} flex flex-col md:flex-row items-start md:items-center relative w-full pl-10 md:pl-0 ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border border-bg-primary"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }}
                  aria-hidden="true"
                />

                <div
                  className="md:hidden absolute left-0 top-6 h-3 w-3 rounded-full border border-bg-primary"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                  aria-hidden="true"
                />

                <div
                  className={`w-full md:w-[45%] md:pl-0 ${
                    isLeft ? "md:pr-16" : "md:pl-16"
                  } group relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:group-hover:opacity-100" />

                  <div
                    {...tilt}
                    className="tilt p-6 md:p-8 rounded-2xl border border-white/10 bg-[#060814]/75 backdrop-blur-md hover:border-white/20"
                  >
                    <div className="flex flex-wrap items-baseline gap-4 mb-4">
                      <span className="font-sans text-3xl md:text-5xl" style={{ color: item.color }}>
                        {item.year}
                      </span>
                      <span className="font-sans text-sm tracking-widest text-text-muted">
                        {isEn ? item.authorEn : item.authorFr}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl md:text-2xl text-white mb-3 font-medium">
                      {isEn ? item.titleEn : item.titleFr}
                    </h3>

                    <p className="font-sans text-text-secondary leading-relaxed">
                      {isEn ? item.descEn : item.descFr}
                    </p>

                    <div
                      className="absolute top-0 left-6 right-6 h-[1px] opacity-20 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
