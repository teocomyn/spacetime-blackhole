import Link from "next/link";
import TopicLayout from "@/components/topic/TopicLayout";
import DeepDive from "@/components/topic/DeepDive";
import Eq from "@/components/topic/Eq";
import ChirpPlayer from "@/components/tools/ChirpPlayer";
import type { Locale } from "@/context/AppContext";
import { OBSERVATION_SOURCES } from "@/lib/content";
import { pagePath } from "@/lib/routes";

const FAQS = {
  fr: [
    {
      q: "Peut-on entendre les ondes gravitationnelles ?",
      a: "Pas avec les oreilles : ce sont des déformations de l'espace, pas des vibrations de l'air. Mais leur fréquence, de quelques dizaines à quelques centaines de hertz pour les trous noirs stellaires, tombe dans la gamme audible. On peut donc convertir le signal en son, comme sur cette page.",
    },
    {
      q: "Combien de fusions de trous noirs a-t-on détectées ?",
      a: "Des centaines de signaux ont été enregistrés depuis 2015 par LIGO, Virgo et KAGRA, la grande majorité venant de fusions de trous noirs.",
    },
    {
      q: "Les ondes gravitationnelles sont-elles dangereuses ?",
      a: "Non. Quand elles nous atteignent, elles ont étiré et comprimé la Terre d'une fraction infime de la taille d'un atome. Il faut les instruments les plus précis jamais construits pour les mesurer.",
    },
  ],
  en: [
    {
      q: "Can you hear gravitational waves?",
      a: "Not with your ears: they are distortions of space, not vibrations of air. But their frequency, from tens to hundreds of hertz for stellar black holes, falls in the audible range. So the signal can be turned into sound, as on this page.",
    },
    {
      q: "How many black hole mergers have been detected?",
      a: "Hundreds of signals have been recorded since 2015 by LIGO, Virgo and KAGRA, the vast majority from black hole mergers.",
    },
    {
      q: "Are gravitational waves dangerous?",
      a: "No. By the time they reach us, they stretch and squeeze Earth by a tiny fraction of an atom's size. It takes the most precise instruments ever built to measure them.",
    },
  ],
} as const;

function French() {
  return (
    <>
      <h2>Des rides dans l'espace-temps</h2>
      <p>
        En 1916, Einstein comprend que sa relativité générale prévoit des ondes : quand des masses accélèrent,
        l'espace-temps se met à vibrer, et cette vibration se propage à la vitesse de la lumière. Il doute qu'on puisse
        un jour les mesurer, tant elles sont faibles. Une preuve indirecte arrive dans les années 1970 avec le pulsar
        binaire de Hulse et Taylor, dont l'orbite rétrécit exactement comme prévu.
      </p>

      <h2>GW150914, le premier signal</h2>
      <p>
        Le 14 septembre 2015, les deux détecteurs LIGO, aux États-Unis, enregistrent à 7 millisecondes d'intervalle un
        signal bref : en 0,2 seconde, sa fréquence grimpe de 35 à environ 150 hertz pendant que son amplitude augmente.
        C'est la signature de deux trous noirs d'environ 36 et 29 masses solaires qui spiralent l'un vers l'autre puis
        fusionnent, il y a 1,3 milliard d'années.
      </p>
      <p>
        Le trou noir final pèse environ 62 masses solaires : l'équivalent de trois masses solaires a été converti en
        ondes gravitationnelles en une fraction de seconde. La découverte a valu le prix Nobel de physique 2017 à
        Rainer Weiss, Barry Barish et Kip Thorne.
      </p>
      <ChirpPlayer />

      <h2>Comment fonctionne LIGO</h2>
      <p>
        Chaque détecteur est un interféromètre en forme de L, aux bras de 4 km. Un laser parcourt les deux bras et se
        recombine. Quand une onde passe, elle allonge un bras et raccourcit l'autre, ce qui décale très légèrement les
        faisceaux. Le changement de longueur à mesurer est d'environ un millième de la taille d'un proton.
      </p>
      <DeepDive title="La déformation relative">
        <Eq caption="h est l'amplitude de l'onde, L la longueur du bras et ΔL sa variation.">
          h = ΔL / L ≈ 10⁻²¹
        </Eq>
        <p>
          Pour GW150914, le pic d'amplitude atteignait environ 10⁻²¹. Sur un bras de 4 km, cela représente une variation
          de l'ordre de 10⁻¹⁸ m. La fréquence du signal renseigne sur les masses : plus elle monte vite, plus le couple
          est lourd.
        </p>
      </DeepDive>

      <h2>Ce que ces ondes nous ont appris</h2>
      <ul>
        <li>Les couples de trous noirs existent, et fusionnent fréquemment dans l'Univers.</li>
        <li>
          Il existe des trous noirs de masse intermédiaire : la fusion GW190521 a donné un trou noir d'environ 142 masses
          solaires.
        </li>
        <li>
          En 2017, la fusion de deux étoiles à neutrons a été vue à la fois en ondes gravitationnelles et en lumière, une
          première.
        </li>
        <li>
          Les signaux concordent avec la relativité générale, y compris la « vibration » du trou noir final juste après
          la fusion.
        </li>
      </ul>
      <p>
        Pour l'avenir, l'Agence spatiale européenne prépare LISA, un détecteur spatial prévu pour les années 2030, qui
        captera les fusions de trous noirs supermassifs. En attendant, explorez les trous noirs{" "}
        <Link href={pagePath("blackHoles", "fr")}>déjà connus</Link>.
      </p>
    </>
  );
}

function English() {
  return (
    <>
      <h2>Ripples in spacetime</h2>
      <p>
        In 1916, Einstein realised that general relativity predicts waves: when masses accelerate, spacetime starts to
        vibrate, and the vibration travels at the speed of light. He doubted they could ever be measured, so faint are
        they. Indirect proof came in the 1970s with the Hulse-Taylor binary pulsar, whose orbit shrinks exactly as
        predicted.
      </p>

      <h2>GW150914, the first signal</h2>
      <p>
        On 14 September 2015, the two LIGO detectors in the United States recorded, 7 milliseconds apart, a brief
        signal: in 0.2 seconds its frequency rose from 35 to about 150 hertz as its amplitude grew. It was the signature
        of two black holes of about 36 and 29 solar masses spiralling together and merging, 1.3 billion years ago.
      </p>
      <p>
        The final black hole weighs about 62 solar masses: the equivalent of three solar masses was turned into
        gravitational waves in a fraction of a second. The discovery earned Rainer Weiss, Barry Barish and Kip Thorne
        the 2017 Nobel Prize in Physics.
      </p>
      <ChirpPlayer />

      <h2>How LIGO works</h2>
      <p>
        Each detector is an L-shaped interferometer with 4 km arms. A laser travels down both arms and recombines. When a
        wave passes, it lengthens one arm and shortens the other, slightly shifting the beams. The length change to
        measure is about a thousandth of the size of a proton.
      </p>
      <DeepDive title="The strain">
        <Eq caption="h is the wave amplitude, L the arm length and ΔL its change.">
          h = ΔL / L ≈ 10⁻²¹
        </Eq>
        <p>
          For GW150914, the peak strain reached about 10⁻²¹. On a 4 km arm, that is a change of about 10⁻¹⁸ m. The
          signal's frequency tells us the masses: the faster it rises, the heavier the pair.
        </p>
      </DeepDive>

      <h2>What these waves taught us</h2>
      <ul>
        <li>Black hole pairs exist and merge frequently across the Universe.</li>
        <li>
          Intermediate-mass black holes exist: the GW190521 merger produced a black hole of about 142 solar masses.
        </li>
        <li>In 2017, a neutron star merger was seen both in gravitational waves and in light, a first.</li>
        <li>
          The signals agree with general relativity, including the "ringing" of the final black hole just after the
          merger.
        </li>
      </ul>
      <p>
        Looking ahead, the European Space Agency is preparing LISA, a space-based detector planned for the 2030s that
        will catch mergers of supermassive black holes. Meanwhile, explore the black holes{" "}
        <Link href={pagePath("blackHoles", "en")}>we already know</Link>.
      </p>
    </>
  );
}

export default function WavesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="waves"
      locale={locale}
      kicker={fr ? "[ observer ]" : "[ observe ]"}
      intro={
        fr
          ? "Le 14 septembre 2015, deux détecteurs ont capté pour la première fois le frémissement de l'espace-temps causé par deux trous noirs qui fusionnent. Écoutez à quoi ressemble ce signal."
          : "On 14 September 2015, two detectors caught for the first time the shiver of spacetime caused by two merging black holes. Listen to what that signal sounds like."
      }
      readingMinutes={6}
      faqs={FAQS[locale]}
      externalSources={[OBSERVATION_SOURCES.gw150914, OBSERVATION_SOURCES.gw190521, OBSERVATION_SOURCES.gwosc]}
      related={["blackHoles", "fallingIn", "quiz", "teachers"]}
    >
      {fr ? <French /> : <English />}
    </TopicLayout>
  );
}
