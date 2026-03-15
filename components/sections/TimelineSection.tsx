"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const TIMELINE = [
  {
    year: "1974",
    author: "Hawking",
    title: "Les trous noirs s'évaporent",
    desc: "Le rayonnement de Hawking crée le paradoxe de l'information — premier indice que quelque chose de fondamental nous échappe.",
    color: "#ff3c3c", // Accent red
  },
  {
    year: "1995",
    author: "Bekenstein-Hawking",
    title: "L'entropie est sur la surface",
    desc: "L'information d'un trou noir est encodée sur sa surface, pas dans son volume. Premier indice holographique.",
    color: "#ffa064", // Orange
  },
  {
    year: "1997",
    author: "Maldacena",
    title: "L'holographie (AdS/CFT)",
    desc: "Un univers avec gravité en 3D est mathématiquement identique à une théorie quantique sans gravité en 2D. La gravité est un hologramme.",
    color: "#3ca0ff", // Blue
  },
  {
    year: "2006",
    author: "Ryu-Takayanagi",
    title: "L'intrication fabrique la géométrie",
    desc: "L'entropie d'intrication calcule précisément l'aire géométrique. L'intrication quantique CRÉE littéralement l'espace.",
    color: "#00e5ff", // Cyan
  },
  {
    year: "2010",
    author: "Verlinde",
    title: "La gravité est entropique",
    desc: "La gravité n'est pas une force fondamentale. Elle émerge statistiquement, comme la pression d'un gaz.",
    color: "#b480ff", // Purple
  },
  {
    year: "2013",
    author: "Maldacena - Susskind",
    title: "ER = EPR",
    desc: "Chaque paire intriquée est un trou de ver microscopique. La connectivité de l'espace EST l'intrication.",
    color: "#ff3c3c", 
  },
  {
    year: "2015",
    author: "Pastawski et al.",
    title: "L'espace-temps est un code",
    desc: "La correspondance holographique fonctionne exactement comme un code correcteur d'erreurs quantique.",
    color: "#3ca0ff", 
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full bg-bg-primary py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-32"
        >
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-white mb-4">
            Un changement de paradigme
          </h2>
          <p className="font-mono text-sm tracking-widest text-text-muted uppercase">
            Cinquante ans d'indices convergents
          </p>
        </motion.div>

        {/* Central Line */}
        <div className="absolute left-[24px] md:left-1/2 top-64 bottom-12 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

        {/* Timeline Entries */}
        <div className="relative z-10 flex flex-col gap-24 md:gap-32">
          {TIMELINE.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Center dot */}
                <div 
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border border-bg-primary"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }}
                />

                {/* Mobile dot */}
                <div 
                  className="md:hidden absolute left-0 top-6 h-3 w-3 rounded-full border border-bg-primary"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                />

                {/* Card */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isLeft ? "md:pr-16" : "md:pl-16"} group relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative p-6 md:p-8 rounded-2xl border border-white/5 bg-bg-secondary/40 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:-translate-y-1">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-serif text-3xl md:text-5xl" style={{ color: item.color }}>{item.year}</span>
                        <span className="font-mono text-sm tracking-widest text-text-muted">{item.author}</span>
                      </div>
                      
                      <h3 className="font-sans text-xl md:text-2xl text-white mb-3 font-medium">
                        {item.title}
                      </h3>
                      
                      <p className="font-sans text-text-secondary leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Top decorative gradient line */}
                      <div 
                        className="absolute top-0 left-6 right-6 h-[1px] opacity-20 transition-opacity duration-500 group-hover:opacity-100" 
                        style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                      />
                    </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
