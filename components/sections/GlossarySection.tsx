"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { GLOSSARY } from "@/lib/content";

export default function GlossarySection() {
  const { locale } = useApp();
  const t = useTranslation(locale);

  return (
    <section
      id="glossary"
      className="relative w-full bg-bg-primary py-32 px-6 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            {t.glossary.title}
          </h2>
          <p className="font-sans text-text-secondary">{t.glossary.subtitle}</p>
        </motion.div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOSSARY.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/5 bg-bg-secondary/40 p-6 backdrop-blur-sm"
            >
              <dt className="font-serif text-xl text-accent-cyan mb-2">
                {locale === "fr" ? item.termFr : item.termEn}
              </dt>
              <dd className="font-sans text-sm text-text-secondary leading-relaxed">
                {locale === "fr" ? item.defFr : item.defEn}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
