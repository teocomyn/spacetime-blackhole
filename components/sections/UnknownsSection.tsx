"use client";

import { motion } from "framer-motion";

const UNKNOWNS = [
  {
    title: "Les équations dynamiques",
    desc: "On sait que l'intrication génère la géométrie dans des cas statiques. Mais comment évolue-t-elle pour produire un univers qui bouge et s'étend ?",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: "Les bits fondamentaux",
    desc: "Si l'univers est fait d'information, quelle est la nature des degrés de liberté ? Des qubits ? Des spins de réseaux de tenseurs ? Autre chose ?",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    )
  },
  {
    title: "De Sitter vs Anti-de Sitter",
    desc: "Tout ce qu'on sait faire mathématiquement marche dans un espace Anti-de Sitter (courbure négative). Notre univers est de Sitter (courbure positive).",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Prédiction expérimentalement testable",
    desc: "Tant qu'on ne peut pas extraire une prédiction mesurable différente de la relativité générale, ça reste une intuition — aussi belle soit-elle.",
    icon: (
      <svg className="w-8 h-8 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
];

export default function UnknownsSection() {
  return (
    <section className="relative w-full bg-bg-primary py-32 px-6 border-t border-accent-red/10">
      <div className="max-w-5xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            Ce que l'on ne sait pas
          </h2>
          <p className="font-sans text-text-secondary max-w-2xl mx-auto">
            Le concept est très probablement le bon. Mais connaître la direction n'est pas la même chose que trouver le chemin. Quatre murs se dressent encore devant nous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UNKNOWNS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-bg-secondary/40 border border-accent-red/20 rounded-2xl p-8 backdrop-blur-sm group hover:bg-accent-red/5 transition-colors duration-500"
            >
              <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all origin-left">
                {item.icon}
              </div>
              <h3 className="font-sans text-xl text-white mb-3 font-medium">
                {item.title}
              </h3>
              <p className="font-sans text-text-secondary text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
