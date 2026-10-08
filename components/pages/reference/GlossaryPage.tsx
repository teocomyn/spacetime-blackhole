import JsonLd from "@/components/JsonLd";
import TopicLayout from "@/components/topic/TopicLayout";
import type { Locale } from "@/context/AppContext";
import { GLOSSARY } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function GlossaryPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const url = absoluteUrl(pagePath("glossary", locale));
  const termSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: fr ? "Glossaire des trous noirs" : "Black hole glossary",
    url,
    inLanguage: locale,
    hasDefinedTerm: GLOSSARY.map((item) => ({
      "@type": "DefinedTerm",
      name: fr ? item.termFr : item.termEn,
      description: fr ? item.defFr : item.defEn,
      url: `${url}#${item.id}`,
    })),
  };

  return (
    <TopicLayout
      pageKey="glossary"
      locale={locale}
      kicker={fr ? "[ référence ]" : "[ reference ]"}
      intro={
        fr
          ? "Les mots des trous noirs et de la gravité quantique, définis en quelques lignes. Chaque terme a son ancre : vous pouvez lier directement une définition."
          : "The vocabulary of black holes and quantum gravity, defined in a few lines. Each term has its own anchor, so you can link straight to a definition."
      }
      related={["blackHoles", "hawking", "paradox", "sources"]}
    >
      <JsonLd data={termSet} />
      <dl className="not-prose grid gap-4 sm:grid-cols-2">
        {GLOSSARY.map((item) => (
          <div key={item.id} id={item.id} className="scroll-mt-24 rounded-xl border border-white/10 bg-bg-secondary/40 p-5">
            <dt className="font-sans text-lg text-accent-cyan">
              <a href={`#${item.id}`} className="hover:underline">
                {fr ? item.termFr : item.termEn}
              </a>
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-text-secondary">{fr ? item.defFr : item.defEn}</dd>
          </div>
        ))}
      </dl>
    </TopicLayout>
  );
}
