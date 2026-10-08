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
      q: "Le rayonnement de Hawking a-t-il été observé ?",
      a: "Pas autour d'un vrai trou noir : pour un trou noir stellaire, il est des milliards de fois plus faible que le rayonnement fossile qui baigne l'Univers. Des expériences d'analogues en laboratoire (fluides, atomes ultrafroids) reproduisent le mécanisme, mais ce ne sont pas des trous noirs.",
    },
    {
      q: "Un trou noir peut-il disparaître ?",
      a: "En théorie oui, en s'évaporant. Mais un trou noir de la masse du Soleil mettrait environ 10⁶⁷ ans, bien plus que l'âge actuel de l'Univers (1,38 × 10¹⁰ ans). Aujourd'hui, les trous noirs connus grossissent plus qu'ils ne s'évaporent.",
    },
    {
      q: "Pourquoi les petits trous noirs sont-ils plus chauds ?",
      a: "La température de Hawking est inversement proportionnelle à la masse. Un trou noir de la masse d'un astéroïde serait à plus de 10¹¹ kelvins et s'évaporerait de plus en plus vite, jusqu'à une ultime bouffée d'énergie.",
    },
    {
      q: "L'image des paires de particules est-elle juste ?",
      a: "C'est une métaphore que Hawking utilisait lui-même pour vulgariser. Le calcul réel décrit un champ quantique dans un espace-temps courbe : le vide vu par un observateur lointain n'est pas le même que le vide près de l'horizon, et cette différence apparaît comme un rayonnement thermique.",
    },
  ],
  en: [
    {
      q: "Has Hawking radiation been observed?",
      a: "Not around a real black hole: for a stellar black hole it is billions of times fainter than the relic radiation that fills the Universe. Laboratory analogue experiments (fluids, ultracold atoms) reproduce the mechanism, but they are not black holes.",
    },
    {
      q: "Can a black hole disappear?",
      a: "In theory yes, by evaporating. But a Sun-mass black hole would take about 10⁶⁷ years, far longer than the current age of the Universe (1.38 × 10¹⁰ years). Today, known black holes grow more than they evaporate.",
    },
    {
      q: "Why are small black holes hotter?",
      a: "The Hawking temperature is inversely proportional to the mass. A black hole with the mass of an asteroid would be above 10¹¹ kelvin and evaporate faster and faster, ending in a final burst of energy.",
    },
    {
      q: "Is the particle-pair picture right?",
      a: "It is a metaphor Hawking himself used for popular accounts. The actual calculation describes a quantum field in curved spacetime: the vacuum seen by a distant observer is not the same as the vacuum near the horizon, and that difference shows up as thermal radiation.",
    },
  ],
} as const;

function French() {
  return (
    <>
      <h2>1974 : un trou noir n'est pas tout à fait noir</h2>
      <p>
        Au début des années 1970, Jacob Bekenstein propose qu'un trou noir possède une entropie proportionnelle à l'aire
        de son horizon. Stephen Hawking est d'abord sceptique : un objet qui a une entropie devrait avoir une
        température, donc rayonner, ce qu'un trou noir ne peut pas faire. En 1974, en ajoutant la mécanique quantique
        au calcul, il découvre qu'un trou noir rayonne bel et bien, exactement comme un corps chaud.
      </p>

      <h2>D'où vient ce rayonnement ?</h2>
      <p>
        En physique quantique, le vide n'est pas rien : il est parcouru de fluctuations. Près de l'horizon, la courbure
        de l'espace-temps est telle que le vide vu par un observateur lointain ne coïncide plus avec le vide local.
        Résultat : loin du trou noir, on reçoit un flux de particules au spectre parfaitement thermique. L'énergie
        emportée est prélevée sur la masse du trou noir, qui diminue.
      </p>

      <h2>Une température qui dépend de la masse</h2>
      <Eq caption="ħ est la constante de Planck réduite et k_B la constante de Boltzmann.">
        T<sub>H</sub> = ħc³ / (8πGMk<sub>B</sub>)
      </Eq>
      <p>
        Plus le trou noir est massif, plus il est froid. Un trou noir de la masse du Soleil est à environ 6 × 10⁻⁸
        kelvin, bien plus froid que le rayonnement fossile de l'Univers à 2,7 K : il absorbe plus d'énergie qu'il n'en
        émet. Seuls des trous noirs de moins de 60 % de la masse de la Lune environ seraient aujourd'hui plus
        chauds que leur environnement.
      </p>

      <h2>L'évaporation</h2>
      <p>
        En perdant de la masse, le trou noir devient plus chaud, rayonne plus fort et perd sa masse encore plus vite. Sa
        durée de vie croît comme le cube de sa masse : environ 10⁶⁷ ans pour une masse solaire. Des trous noirs
        primordiaux d'environ 10¹¹ à 10¹² kg, s'ils existent, finiraient de s'évaporer à notre époque ; les télescopes
        à rayons gamma les cherchent, sans succès jusqu'ici.
      </p>
      <DeepDive title="La durée de vie, en formule">
        <Eq caption="Approximation qui ne compte que l'émission de photons.">
          t<sub>évap</sub> ≈ 5120 π G² M³ / (ħ c⁴)
        </Eq>
        <p>
          Le facteur M³ explique les écarts vertigineux : diviser la masse par mille divise la durée de vie par un
          milliard. Inclure les autres particules émises raccourcit un peu la durée, sans changer les ordres de
          grandeur.
        </p>
      </DeepDive>

      <h2>Essayez</h2>
      <BlackHoleCalculator compact />

      <h2>Pourquoi c'est un problème</h2>
      <p>
        Un rayonnement thermique ne transporte aucune trace de ce qui est tombé dans le trou noir. Si le trou noir
        s'évapore complètement, où est passée l'information ? Hawking pose la question en 1976 ; elle occupe la physique
        théorique depuis. C'est le <Link href={pagePath("paradox", "fr")}>paradoxe de l'information</Link>.
      </p>
    </>
  );
}

function English() {
  return (
    <>
      <h2>1974: a black hole is not quite black</h2>
      <p>
        In the early 1970s, Jacob Bekenstein proposed that a black hole has an entropy proportional to the area of its
        horizon. Stephen Hawking was sceptical at first: an object with entropy should have a temperature, and therefore
        radiate, which a black hole cannot do. In 1974, by adding quantum mechanics to the calculation, he found that a
        black hole does radiate, exactly like a hot body.
      </p>

      <h2>Where does the radiation come from?</h2>
      <p>
        In quantum physics, the vacuum is not nothing: it is full of fluctuations. Near the horizon, spacetime is so
        curved that the vacuum seen by a distant observer no longer matches the local vacuum. The result: far from the
        black hole, you receive a flux of particles with a perfectly thermal spectrum. The energy carried away is taken
        from the black hole's mass, which shrinks.
      </p>

      <h2>A temperature set by the mass</h2>
      <Eq caption="ħ is the reduced Planck constant and k_B the Boltzmann constant.">
        T<sub>H</sub> = ħc³ / (8πGMk<sub>B</sub>)
      </Eq>
      <p>
        The more massive the black hole, the colder it is. A Sun-mass black hole sits at about 6 × 10⁻⁸ kelvin, far
        colder than the Universe's relic radiation at 2.7 K: it absorbs more energy than it emits. Only black holes below
        roughly 60% of the Moon's mass would today be hotter than their surroundings.
      </p>

      <h2>Evaporation</h2>
      <p>
        As it loses mass, the black hole gets hotter, radiates more and loses mass even faster. Its lifetime grows as the
        cube of its mass: about 10⁶⁷ years for one solar mass. Primordial black holes of about 10¹¹ to 10¹² kg, if they
        exist, would be finishing their evaporation today; gamma-ray telescopes are searching for them, so far without
        success.
      </p>
      <DeepDive title="The lifetime, as a formula">
        <Eq caption="Approximation counting photon emission only.">
          t<sub>evap</sub> ≈ 5120 π G² M³ / (ħ c⁴)
        </Eq>
        <p>
          The M³ factor explains the dizzying range: dividing the mass by a thousand divides the lifetime by a billion.
          Including the other emitted particles shortens it somewhat without changing the orders of magnitude.
        </p>
      </DeepDive>

      <h2>Try it</h2>
      <BlackHoleCalculator compact />

      <h2>Why it is a problem</h2>
      <p>
        Thermal radiation carries no trace of what fell into the black hole. If the black hole evaporates completely,
        where did the information go? Hawking asked the question in 1976; it has occupied theoretical physics ever since.
        This is the <Link href={pagePath("paradox", "en")}>information paradox</Link>.
      </p>
    </>
  );
}

export default function HawkingPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="hawking"
      locale={locale}
      kicker={fr ? "[ gravité quantique ]" : "[ quantum gravity ]"}
      intro={
        fr
          ? "En 1974, Stephen Hawking montre qu'un trou noir émet un faible rayonnement et finit, très lentement, par s'évaporer. Une découverte qui relie pour la première fois gravité, mécanique quantique et thermodynamique."
          : "In 1974, Stephen Hawking showed that a black hole emits faint radiation and, very slowly, evaporates. It was the first result linking gravity, quantum mechanics and thermodynamics."
      }
      readingMinutes={6}
      faqs={FAQS[locale]}
      sources={["bekenstein-1973", "hawking-1974", "hawking-1975", "hawking-1976"]}
      related={["paradox", "calculator", "blackHoles", "glossary"]}
    >
      {fr ? <French /> : <English />}
    </TopicLayout>
  );
}
