"use client";

import { useRef } from "react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

const TIMELINE = [
  {
    id: "hawking-1974",
    year: "1974",
    authorFr: "Hawking",
    authorEn: "Hawking",
    titleFr: "Les trous noirs s'évaporent",
    titleEn: "Black holes evaporate",
    descFr:
      "Le rayonnement de Hawking crée le paradoxe de l'information, premier indice que quelque chose de fondamental nous échappe.",
    descEn:
      "Hawking radiation creates the information paradox, the first hint that something fundamental is missing.",
    color: "#ff3c3c",
  },
  {
    id: "bekenstein-1973",
    year: "1973–1975",
    authorFr: "Bekenstein & Hawking",
    authorEn: "Bekenstein & Hawking",
    titleFr: "L'entropie est sur la surface",
    titleEn: "Entropy lives on the surface",
    descFr:
      "Bekenstein (1973) propose que les trous noirs ont une entropie proportionnelle à leur aire ; Hawking (1974–75) confirme et quantifie, premier indice holographique.",
    descEn:
      "Bekenstein (1973) proposes black hole entropy proportional to area; Hawking (1974–75) confirms and quantifies it, the first holographic hint.",
    color: "#3a5f8f",
  },
  {
    id: "maldacena-1997",
    year: "1997",
    authorFr: "Maldacena",
    authorEn: "Maldacena",
    titleFr: "L'holographie (AdS/CFT)",
    titleEn: "Holography (AdS/CFT)",
    descFr:
      "Un univers avec gravité en 3D est mathématiquement identique à une théorie quantique sans gravité en 2D. La gravité est un hologramme.",
    descEn:
      "A 3D universe with gravity is mathematically identical to a 2D quantum theory without gravity. Gravity is a hologram.",
    color: "#3ca0ff",
  },
  {
    id: "ryu-takayanagi-2006",
    year: "2006",
    authorFr: "Ryu-Takayanagi",
    authorEn: "Ryu-Takayanagi",
    titleFr: "L'intrication fabrique la géométrie",
    titleEn: "Entanglement builds geometry",
    descFr:
      "L'entropie d'intrication calcule précisément l'aire géométrique. L'intrication quantique CRÉE littéralement l'espace.",
    descEn:
      "Entanglement entropy precisely computes geometric area. Quantum entanglement literally CREATES space.",
    color: "#00e5ff",
  },
  {
    id: "verlinde-2010",
    year: "2010",
    authorFr: "Verlinde",
    authorEn: "Verlinde",
    titleFr: "La gravité est entropique",
    titleEn: "Gravity is entropic",
    descFr:
      "La gravité n'est pas une force fondamentale. Elle émerge statistiquement, comme la pression d'un gaz.",
    descEn:
      "Gravity is not a fundamental force. It emerges statistically, like gas pressure.",
    color: "#b480ff",
  },
  {
    id: "er-epr-2013",
    year: "2013",
    authorFr: "Maldacena - Susskind",
    authorEn: "Maldacena - Susskind",
    titleFr: "ER = EPR",
    titleEn: "ER = EPR",
    descFr:
      "Chaque paire intriquée est un trou de ver microscopique. La connectivité de l'espace EST l'intrication.",
    descEn:
      "Every entangled pair is a microscopic wormhole. The connectivity of space IS entanglement.",
    color: "#ff3c3c",
  },
  {
    id: "pastawski-2015",
    year: "2015",
    authorFr: "Pastawski et al.",
    authorEn: "Pastawski et al.",
    titleFr: "L'espace-temps est un code",
    titleEn: "Spacetime is a code",
    descFr:
      "La correspondance holographique fonctionne exactement comme un code correcteur d'erreurs quantique.",
    descEn:
      "The holographic correspondence works exactly like a quantum error-correcting code.",
    color: "#3ca0ff",
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useApp();
  const t = useTranslation(locale);
  const isEn = locale === "en";

  return (
    <section ref={containerRef} id="timeline" className="relative w-full bg-bg-primary py-32 overflow-hidden">
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
                className={`flex flex-col md:flex-row items-start md:items-center relative w-full pl-10 md:pl-0 ${
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

                  <div className="relative p-6 md:p-8 rounded-2xl border border-white/5 bg-bg-secondary/40 backdrop-blur-md transition-all duration-500 hover:border-white/15 md:hover:-translate-y-1 active:scale-[0.99]">
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
