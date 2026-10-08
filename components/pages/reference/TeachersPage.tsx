import Link from "next/link";
import type { ReactNode } from "react";
import TopicLayout from "@/components/topic/TopicLayout";
import DeepDive from "@/components/topic/DeepDive";
import Eq from "@/components/topic/Eq";
import type { Locale } from "@/context/AppContext";
import { OBSERVATION_SOURCES } from "@/lib/content";
import { pagePath } from "@/lib/routes";

function Activity({
  title,
  level,
  duration,
  goal,
  children,
}: {
  title: string;
  level: string;
  duration: string;
  goal: string;
  children: ReactNode;
}) {
  return (
    <section className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/40 p-5 sm:p-6">
      <h2 className="font-sans text-[clamp(1.3rem,2.4vw,1.7rem)] font-light text-white">{title}</h2>
      <p className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
        <span className="rounded-full border border-accent-blue/30 px-2.5 py-1 text-accent-cyan">{level}</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-text-secondary">{duration}</span>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">{goal}</p>
      <div className="prose-space mt-2 text-[0.98rem]">{children}</div>
    </section>
  );
}

function French() {
  return (
    <>
      <p>
        Les activités ci-dessous s'appuient sur les outils du site et sur des données réelles. Elles sont libres
        d'accès, sans inscription. Les niveaux indiqués renvoient aux programmes français en vigueur depuis la rentrée
        2020.
      </p>

      <Activity
        title="1. Peser le trou noir de la Voie lactée avec Kepler"
        level="Terminale, spécialité physique-chimie"
        duration="1 h"
        goal="Thème « Mouvement et interactions », partie « Mouvement dans un champ de gravitation » : appliquer la troisième loi de Kepler à l'étoile S2, qui tourne autour de Sgr A*."
      >
        <p>
          L'étoile S2 boucle son orbite en environ 16,0 ans. Vu de la Terre, le demi-grand axe de son orbite mesure 0,125
          seconde d'arc, et le centre galactique est à environ 8 280 parsecs.
        </p>
        <ol>
          <li>Convertir le demi-grand axe en unités astronomiques (à 1 parsec, 1 seconde d'arc correspond à 1 ua).</li>
          <li>Écrire la troisième loi de Kepler et l'exprimer en ua, années et masses solaires.</li>
          <li>En déduire la masse de Sgr A* et la comparer à la valeur publiée.</li>
        </ol>
        <DeepDive title="Corrigé">
          <p>a ≈ 0,125 × 8 280 ≈ 1 035 ua.</p>
          <Eq caption="Avec a en ua, T en années et M en masses solaires (la masse de S2 est négligeable).">
            M = a³ / T² ≈ 1 035³ / 16,0² ≈ 4,3 × 10⁶ M☉
          </Eq>
          <p>
            La collaboration GRAVITY obtient 4,30 millions de masses solaires avec des mesures bien plus fines. Ce travail
            a été récompensé par le prix Nobel de physique 2020.
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="2. Ordres de grandeur : comprimer la Terre en trou noir"
        level="Seconde et première"
        duration="30 min"
        goal="Manipuler les puissances de dix et une formule littérale, puis vérifier avec le calculateur."
      >
        <ol>
          <li>Calculer r = 2GM/c² pour la Terre (M = 5,97 × 10²⁴ kg), puis pour le Soleil (M = 1,99 × 10³⁰ kg).</li>
          <li>Comparer chaque résultat à un objet du quotidien.</li>
          <li>
            Que devient le rayon si la masse est multipliée par 10 ? Vérifier avec le{" "}
            <Link href={pagePath("calculator", "fr")}>calculateur</Link>.
          </li>
        </ol>
        <DeepDive title="Corrigé">
          <p>
            Terre : r ≈ 8,9 mm, soit une bille de 1,8 cm de diamètre. Soleil : r ≈ 2,95 km. Le rayon est proportionnel à
            la masse : il est lui aussi multiplié par 10.
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="3. Lire l'image de M87*"
        level="Terminale et premier cycle du supérieur"
        duration="45 min"
        goal="Relier une taille angulaire à une taille réelle, puis confronter une observation à une prédiction de la relativité générale."
      >
        <p>
          L'anneau de M87* mesure 42 microsecondes d'arc de diamètre. La galaxie est à 16,8 mégaparsecs et le trou noir
          pèse 6,5 milliards de masses solaires.
        </p>
        <ol>
          <li>Convertir l'angle en radians (1 seconde d'arc ≈ 4,85 × 10⁻⁶ rad) et en déduire le diamètre réel de l'anneau.</li>
          <li>Calculer le rayon de l'horizon r<sub>s</sub> = 2GM/c².</li>
          <li>La relativité générale prévoit un anneau d'environ 5,2 r<sub>s</sub> de diamètre. Conclure.</li>
        </ol>
        <DeepDive title="Corrigé">
          <p>
            θ ≈ 2,0 × 10⁻¹⁰ rad et d ≈ 5,2 × 10²³ m, donc D = θ·d ≈ 1,1 × 10¹⁴ m, environ 700 ua. Avec r<sub>s</sub> ≈ 1,9
            × 10¹³ m, l'anneau mesure environ 5,5 r<sub>s</sub>, compatible avec la prédiction compte tenu de
            l'incertitude sur la masse (± 0,7 milliard de masses solaires).
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="4. Écouter une fusion de trous noirs"
        level="Seconde (signaux sonores) à terminale"
        duration="30 min"
        goal="Associer fréquence, période et hauteur d'un son, sur un signal réel converti en audio."
      >
        <p>
          Sur la page <Link href={pagePath("waves", "fr")}>ondes gravitationnelles</Link>, faire écouter le chirp en
          version ralentie, puis observer la forme d'onde.
        </p>
        <ol>
          <li>Décrire l'évolution de la hauteur et de l'intensité du son.</li>
          <li>Le signal passe de 35 Hz à 150 Hz : calculer les périodes correspondantes.</li>
          <li>Pourquoi la fréquence augmente-t-elle quand les deux trous noirs se rapprochent ?</li>
        </ol>
        <DeepDive title="Corrigé">
          <p>
            Le son devient plus aigu et plus fort. T = 1/f : environ 29 ms à 35 Hz et 6,7 ms à 150 Hz. Les trous noirs
            tournent de plus en plus vite en se rapprochant (troisième loi de Kepler), et l'onde émise suit ce rythme.
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="5. Débat : l'information peut-elle disparaître ?"
        level="Terminale (philosophie, enseignement scientifique) et supérieur"
        duration="1 h"
        goal="Construire une argumentation à partir d'un débat scientifique réel et ouvert."
      >
        <p>
          À partir de la page <Link href={pagePath("paradox", "fr")}>paradoxe de l'information</Link> et de sa courbe de
          Page interactive, les élèves défendent l'une des positions historiques : Hawking en 1976, puis les partisans
          de la conservation de l'information.
        </p>
        <p>Pistes : qu'est-ce qu'une loi réversible ? Qu'est-ce qui permettrait de trancher ? Pourquoi Hawking a-t-il changé d'avis en 2004 ?</p>
      </Activity>

      <h2>Et la relativité ?</h2>
      <p>
        La relativité restreinte (dilatation des durées, temps propre) ne figure plus au programme de terminale depuis
        2020. La page <Link href={pagePath("fallingIn", "fr")}>tomber dans un trou noir</Link> peut servir d'ouverture
        en fin d'année, ou de support en première année d'études supérieures.
      </p>
    </>
  );
}

function English() {
  return (
    <>
      <p>
        The activities below use the site's tools and real data. They are free, with no sign-up. Levels are given for
        upper secondary school (ages 15 to 18) and the first year of university.
      </p>

      <Activity
        title="1. Weigh the Milky Way's black hole with Kepler"
        level="Ages 17 to 18"
        duration="1 h"
        goal="Apply Kepler's third law to the star S2, which orbits Sgr A*."
      >
        <p>
          The star S2 completes its orbit in about 16.0 years. Seen from Earth, the semi-major axis of its orbit is 0.125
          arcseconds, and the Galactic Centre is about 8,280 parsecs away.
        </p>
        <ol>
          <li>Convert the semi-major axis to astronomical units (at 1 parsec, 1 arcsecond corresponds to 1 AU).</li>
          <li>Write Kepler's third law in AU, years and solar masses.</li>
          <li>Deduce the mass of Sgr A* and compare it with the published value.</li>
        </ol>
        <DeepDive title="Answer key">
          <p>a ≈ 0.125 × 8,280 ≈ 1,035 AU.</p>
          <Eq caption="With a in AU, T in years and M in solar masses (S2's own mass is negligible).">
            M = a³ / T² ≈ 1035³ / 16.0² ≈ 4.3 × 10⁶ M☉
          </Eq>
          <p>
            The GRAVITY collaboration finds 4.30 million solar masses with far finer measurements. This work was
            recognised by the 2020 Nobel Prize in Physics.
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="2. Orders of magnitude: squeezing Earth into a black hole"
        level="Ages 15 to 17"
        duration="30 min"
        goal="Work with powers of ten and a formula, then check with the calculator."
      >
        <ol>
          <li>Compute r = 2GM/c² for Earth (M = 5.97 × 10²⁴ kg), then for the Sun (M = 1.99 × 10³⁰ kg).</li>
          <li>Compare each result with an everyday object.</li>
          <li>
            What happens to the radius if the mass is multiplied by 10? Check with the{" "}
            <Link href={pagePath("calculator", "en")}>calculator</Link>.
          </li>
        </ol>
        <DeepDive title="Answer key">
          <p>
            Earth: r ≈ 8.9 mm, a marble 1.8 cm across. Sun: r ≈ 2.95 km. The radius is proportional to the mass, so it is
            also multiplied by 10.
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="3. Reading the M87* image"
        level="Ages 17 to 18 and first-year university"
        duration="45 min"
        goal="Relate an angular size to a real size, then test an observation against a prediction of general relativity."
      >
        <p>
          The M87* ring is 42 microarcseconds across. The galaxy is 16.8 megaparsecs away and the black hole weighs 6.5
          billion solar masses.
        </p>
        <ol>
          <li>Convert the angle to radians (1 arcsecond ≈ 4.85 × 10⁻⁶ rad) and deduce the ring's real diameter.</li>
          <li>Compute the horizon radius r<sub>s</sub> = 2GM/c².</li>
          <li>General relativity predicts a ring about 5.2 r<sub>s</sub> across. Conclude.</li>
        </ol>
        <DeepDive title="Answer key">
          <p>
            θ ≈ 2.0 × 10⁻¹⁰ rad and d ≈ 5.2 × 10²³ m, so D = θ·d ≈ 1.1 × 10¹⁴ m, about 700 AU. With r<sub>s</sub> ≈ 1.9
            × 10¹³ m, the ring is about 5.5 r<sub>s</sub> across, consistent with the prediction given the uncertainty on
            the mass (± 0.7 billion solar masses).
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="4. Listening to a black hole merger"
        level="Ages 15 to 18"
        duration="30 min"
        goal="Link frequency, period and pitch on a real signal turned into sound."
      >
        <p>
          On the <Link href={pagePath("waves", "en")}>gravitational waves</Link> page, play the slowed-down chirp, then
          look at the waveform.
        </p>
        <ol>
          <li>Describe how the pitch and loudness change.</li>
          <li>The signal goes from 35 Hz to 150 Hz: compute the matching periods.</li>
          <li>Why does the frequency rise as the two black holes get closer?</li>
        </ol>
        <DeepDive title="Answer key">
          <p>
            The sound gets higher and louder. T = 1/f: about 29 ms at 35 Hz and 6.7 ms at 150 Hz. The black holes orbit
            faster and faster as they get closer (Kepler's third law), and the emitted wave follows that rhythm.
          </p>
        </DeepDive>
      </Activity>

      <Activity
        title="5. Debate: can information disappear?"
        level="Ages 17 to 18 and university"
        duration="1 h"
        goal="Build an argument from a real, open scientific debate."
      >
        <p>
          Using the <Link href={pagePath("paradox", "en")}>information paradox</Link> page and its interactive Page curve,
          students defend one of the historical positions: Hawking in 1976, then those who argued information is
          preserved.
        </p>
        <p>Prompts: what is a reversible law? What would settle the question? Why did Hawking change his mind in 2004?</p>
      </Activity>
    </>
  );
}

export default function TeachersPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="teachers"
      locale={locale}
      kicker={fr ? "[ en classe ]" : "[ in the classroom ]"}
      intro={
        fr
          ? "Cinq activités clés en main, de la seconde au supérieur, avec leur corrigé : peser Sgr A* avec Kepler, lire l'image de M87*, écouter une fusion de trous noirs."
          : "Five ready-to-use activities, from secondary school to university, with answer keys: weigh Sgr A* with Kepler, read the M87* image, listen to a black hole merger."
      }
      externalSources={[OBSERVATION_SOURCES.gravity2022, OBSERVATION_SOURCES.eht2019, OBSERVATION_SOURCES.gw150914]}
      related={["calculator", "quiz", "waves", "sources"]}
    >
      {fr ? <French /> : <English />}
    </TopicLayout>
  );
}
