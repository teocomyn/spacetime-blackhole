import Link from "next/link";
import TopicLayout from "@/components/topic/TopicLayout";
import ScaleComparator from "@/components/tools/ScaleComparator";
import type { Locale } from "@/context/AppContext";
import { OBSERVATION_SOURCES } from "@/lib/content";
import { pagePath } from "@/lib/routes";

const FAQS = {
  fr: [
    {
      q: "Quel est le plus gros trou noir connu ?",
      a: "Parmi les mesures directes, celui de la galaxie Holm 15A atteint environ 40 milliards de masses solaires. Des estimations indirectes, comme celle du quasar TON 618, donnent entre 40 et 70 milliards, avec une incertitude d'un facteur 2 à 3.",
    },
    {
      q: "Un trou noir supermassif est-il très dense ?",
      a: "Non, c'est contre-intuitif : comme le rayon croît avec la masse, la densité moyenne diminue comme 1/M². Celle de M87*, calculée sur le volume de son horizon, est inférieure à celle de l'air.",
    },
  ],
  en: [
    {
      q: "What is the largest known black hole?",
      a: "Among direct measurements, the one in the galaxy Holm 15A reaches about 40 billion solar masses. Indirect estimates, such as for the quasar TON 618, give between 40 and 70 billion, uncertain by a factor of 2 to 3.",
    },
    {
      q: "Is a supermassive black hole very dense?",
      a: "No, counter-intuitively: since the radius grows with mass, the mean density drops as 1/M². M87*'s, computed over the volume of its horizon, is lower than that of air.",
    },
  ],
} as const;

export default function ScalePage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="scale"
      locale={locale}
      kicker={fr ? "[ outil ]" : "[ tool ]"}
      intro={
        fr
          ? "Un trou noir de la masse de la Terre tiendrait dans une bille ; celui de TON 618 engloberait tout le Système solaire. Comparez-les à des objets familiers, à la même échelle."
          : "A black hole with Earth's mass would fit in a marble; TON 618's would swallow the whole Solar System. Compare them with familiar objects, at the same scale."
      }
      faqs={FAQS[locale]}
      externalSources={[OBSERVATION_SOURCES.gaiaBh1, OBSERVATION_SOURCES.gaiaBh3, OBSERVATION_SOURCES.cygnusX1, OBSERVATION_SOURCES.gravity2022, OBSERVATION_SOURCES.eht2019, OBSERVATION_SOURCES.holm15a, OBSERVATION_SOURCES.ton618]}
      related={["calculator", "blackHoles", "fallingIn", "quiz"]}
      wide
    >
      <ScaleComparator />
      <h2>{fr ? "Une règle simple" : "A simple rule"}</h2>
      <p>
        {fr
          ? "La taille de l'horizon est proportionnelle à la masse : doublez la masse, l'horizon double. C'est pourquoi les rayons d'horizon couvrent plus de quinze ordres de grandeur, des 9 mm d'un trou noir hypothétique de la masse de la Terre à plus de mille unités astronomiques pour TON 618."
          : "The horizon size is proportional to the mass: double the mass, and the horizon doubles. That is why horizon radii span more than fifteen orders of magnitude, from 9 mm for a hypothetical Earth-mass black hole to more than a thousand astronomical units for TON 618."}
      </p>
      <p>
        {fr ? "Pour les valeurs précises de chaque trou noir, utilisez le " : "For precise values for each black hole, use the "}
        <Link href={pagePath("calculator", locale)}>{fr ? "calculateur" : "calculator"}</Link>.
      </p>
    </TopicLayout>
  );
}
