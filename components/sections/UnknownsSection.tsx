"use client";

import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

const UNKNOWNS = [
  {
    id: "dynamics",
    titleFr: "Les équations dynamiques",
    titleEn: "Dynamic equations",
    descFr:
      "On sait que l'intrication génère la géométrie dans des cas statiques. Mais comment évolue-t-elle pour produire un univers qui bouge et s'étend ?",
    descEn:
      "We know entanglement generates geometry in static cases. But how does it evolve to produce an expanding, dynamic universe?",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "bits",
    titleFr: "Les bits fondamentaux",
    titleEn: "Fundamental bits",
    descFr:
      "Si l'univers est fait d'information, quelle est la nature des degrés de liberté ? Des qubits ? Des spins de réseaux de tenseurs ? Autre chose ?",
    descEn:
      "If the universe is made of information, what are the fundamental degrees of freedom? Qubits? Tensor network spins? Something else?",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
  },
  {
    id: "de-sitter",
    titleFr: "De Sitter vs Anti-de Sitter",
    titleEn: "De Sitter vs Anti-de Sitter",
    descFr:
      "Tout ce qu'on sait faire mathématiquement marche dans un espace Anti-de Sitter (courbure négative). Notre univers est de Sitter (courbure positive).",
    descEn:
      "Everything we can do mathematically works in Anti-de Sitter space (negative curvature). Our universe is de Sitter (positive curvature).",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "experiment",
    titleFr: "Prédiction expérimentalement testable",
    titleEn: "Experimentally testable prediction",
    descFr:
      "Tant qu'on ne peut pas extraire une prédiction mesurable différente de la relativité générale, ça reste une intuition — aussi belle soit-elle.",
    descEn:
      "Until we extract a measurable prediction distinct from general relativity, it remains an intuition — however beautiful.",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function UnknownsSection() {
  const { locale } = useApp();
  const t = useTranslation(locale);
  const isEn = locale === "en";

  return (
    <section id="unknowns" className="relative w-full bg-bg-primary py-32 px-6 border-t border-accent-red/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            {t.unknowns.title}
          </h2>
          <p className="font-sans text-text-secondary max-w-2xl mx-auto">{t.unknowns.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UNKNOWNS.map((item, i) => (
            <article
              key={item.id}
              className="bg-bg-secondary/40 border border-accent-red/20 rounded-2xl p-8 backdrop-blur-sm group hover:bg-accent-red/5 transition-colors duration-500 active:scale-[0.99]"
            >
              <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all origin-left">
                {item.icon}
              </div>
              <h3 className="font-sans text-xl text-white mb-3 font-medium">
                {isEn ? item.titleEn : item.titleFr}
              </h3>
              <p className="font-sans text-text-secondary text-sm leading-relaxed">
                {isEn ? item.descEn : item.descFr}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
