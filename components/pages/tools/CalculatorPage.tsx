import Link from "next/link";
import TopicLayout from "@/components/topic/TopicLayout";
import DeepDive from "@/components/topic/DeepDive";
import Eq from "@/components/topic/Eq";
import BlackHoleCalculator from "@/components/tools/BlackHoleCalculator";
import type { Locale } from "@/context/AppContext";
import { pagePath } from "@/lib/routes";

const FAQS = {
  fr: [
    {
      q: "Quelle est la masse minimale d'un trou noir ?",
      a: "La théorie n'impose pas de minimum strict, hormis la masse de Planck (environ 22 microgrammes) en dessous de laquelle elle ne s'applique plus. Les trous noirs formés par des étoiles pèsent au moins environ 3 masses solaires ; des trous noirs plus légers ne pourraient être que primordiaux.",
    },
    {
      q: "Pourquoi exprimer l'entropie en bits ?",
      a: "L'entropie d'un trou noir mesure la quantité maximale d'information qu'il peut contenir. Divisée par ln 2, elle s'exprime en bits, comme une mémoire informatique : environ 10⁷⁷ bits pour une masse solaire.",
    },
    {
      q: "Les résultats valent-ils pour un trou noir en rotation ?",
      a: "Ce calculateur utilise la solution de Schwarzschild, sans rotation ni charge. Pour un trou noir qui tourne vite, l'horizon est jusqu'à deux fois plus petit et la température plus basse, mais les ordres de grandeur restent les mêmes.",
    },
  ],
  en: [
    {
      q: "What is the minimum mass of a black hole?",
      a: "Theory sets no strict minimum, apart from the Planck mass (about 22 micrograms) below which it no longer applies. Black holes formed by stars weigh at least about 3 solar masses; lighter black holes could only be primordial.",
    },
    {
      q: "Why express entropy in bits?",
      a: "A black hole's entropy measures the maximum amount of information it can hold. Divided by ln 2, it is expressed in bits, like computer memory: about 10⁷⁷ bits for one solar mass.",
    },
    {
      q: "Do the results hold for a spinning black hole?",
      a: "This calculator uses the Schwarzschild solution, with no spin or charge. For a fast-spinning black hole the horizon is up to half as large and the temperature lower, but the orders of magnitude stay the same.",
    },
  ],
} as const;

export default function CalculatorPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="calculator"
      locale={locale}
      kicker={fr ? "[ outil ]" : "[ tool ]"}
      intro={
        fr
          ? "Choisissez une masse, de l'astéroïde à TON 618, et découvrez la taille de l'horizon, la température de Hawking, la durée de vie et la quantité d'information du trou noir correspondant."
          : "Pick a mass, from an asteroid to TON 618, and see the horizon size, Hawking temperature, lifetime and information content of the matching black hole."
      }
      faqs={FAQS[locale]}
      sources={["bekenstein-1973", "hawking-1974", "hawking-1975"]}
      related={["scale", "hawking", "fallingIn", "teachers"]}
      wide
    >
      <BlackHoleCalculator />
      <h2>{fr ? "Les formules utilisées" : "The formulas used"}</h2>
      <p>
        {fr
          ? "Toutes découlent de trois constantes fondamentales, G, c et ħ, et de la masse M. Aucune autre donnée n'est nécessaire : c'est l'une des propriétés les plus étonnantes des trous noirs."
          : "They all follow from three fundamental constants, G, c and ħ, and the mass M. No other data is needed: one of the most striking properties of black holes."}
      </p>
      <Eq caption={fr ? "Rayon de l'horizon (Schwarzschild, 1916)" : "Horizon radius (Schwarzschild, 1916)"}>
        r<sub>s</sub> = 2GM / c²
      </Eq>
      <Eq caption={fr ? "Température de Hawking (1974)" : "Hawking temperature (1974)"}>
        T<sub>H</sub> = ħc³ / (8πGMk<sub>B</sub>)
      </Eq>
      <Eq caption={fr ? "Durée de vie par évaporation, photons seulement" : "Evaporation lifetime, photons only"}>
        t ≈ 5120 π G² M³ / (ħ c⁴)
      </Eq>
      <Eq caption={fr ? "Entropie de Bekenstein-Hawking, A = 4πr_s² étant l'aire de l'horizon" : "Bekenstein-Hawking entropy, with A = 4πr_s² the horizon area"}>
        S = k<sub>B</sub> c³ A / (4Għ)
      </Eq>
      <DeepDive title={fr ? "Hypothèses et limites" : "Assumptions and limits"}>
        <ul>
          <li>
            {fr
              ? "Trou noir isolé, sans rotation ni charge électrique (solution de Schwarzschild)."
              : "An isolated black hole with no spin or electric charge (Schwarzschild solution)."}
          </li>
          <li>
            {fr
              ? "La durée de vie ne compte que l'émission de photons et ignore la matière que le trou noir avale, ainsi que le fond diffus cosmologique qu'il absorbe."
              : "The lifetime counts photon emission only and ignores the matter the black hole swallows and the cosmic background it absorbs."}
          </li>
          <li>
            {fr
              ? "La marée est calculée avec la formule newtonienne 2GML/r³, une bonne approximation à l'horizon."
              : "The tide uses the Newtonian formula 2GML/r³, a good approximation at the horizon."}
          </li>
          <li>
            {fr
              ? "Les masses des trous noirs réels sont des valeurs centrales, avec leurs incertitudes publiées."
              : "Masses of real black holes are central values, with their published uncertainties."}
          </li>
        </ul>
        <p>
          {fr ? "Pour visualiser ces tailles, essayez le " : "To visualise these sizes, try the "}
          <Link href={pagePath("scale", locale)}>{fr ? "comparateur" : "size comparison"}</Link>.
        </p>
      </DeepDive>
    </TopicLayout>
  );
}
