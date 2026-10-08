import Link from "next/link";
import TopicLayout from "@/components/topic/TopicLayout";
import DeepDive from "@/components/topic/DeepDive";
import Eq from "@/components/topic/Eq";
import EhtImage from "@/components/topic/EhtImage";
import type { Locale } from "@/context/AppContext";
import { OBSERVATION_SOURCES } from "@/lib/content";
import { pagePath } from "@/lib/routes";

const FAQS = {
  fr: [
    {
      q: "Un trou noir peut-il avaler la Terre ?",
      a: "Non. Le trou noir connu le plus proche, Gaia BH1, se trouve à environ 1 560 années-lumière. Et à distance, un trou noir attire exactement comme une étoile de même masse : il n'« aspire » rien au-delà de son voisinage immédiat.",
    },
    {
      q: "Le Soleil deviendra-t-il un trou noir ?",
      a: "Non. Il est bien trop léger. Dans environ cinq milliards d'années, il deviendra une géante rouge puis une naine blanche. Il faut une étoile d'au moins une vingtaine de masses solaires, environ, pour finir en trou noir.",
    },
    {
      q: "Quelle est la taille d'un trou noir ?",
      a: "Le rayon de son horizon est proportionnel à sa masse : environ 3 km par masse solaire. Un trou noir de 10 masses solaires mesure 30 km de rayon ; M87* en mesure environ 128 fois la distance Terre-Soleil.",
    },
    {
      q: "Que montrent les images de l'Event Horizon Telescope ?",
      a: "Un anneau de lumière émis par du gaz très chaud, dont les rayons sont courbés autour du trou noir, et une zone centrale sombre : l'ombre. L'horizon lui-même est invisible, mais la taille de l'anneau correspond à ce que prédit la relativité générale.",
    },
  ],
  en: [
    {
      q: "Could a black hole swallow Earth?",
      a: "No. The nearest known black hole, Gaia BH1, is about 1,560 light-years away. And from a distance a black hole pulls exactly like a star of the same mass: it does not \"suck in\" anything beyond its immediate surroundings.",
    },
    {
      q: "Will the Sun become a black hole?",
      a: "No. It is far too light. In about five billion years it will become a red giant, then a white dwarf. A star needs roughly twenty solar masses or more to end as a black hole.",
    },
    {
      q: "How big is a black hole?",
      a: "Its horizon radius is proportional to its mass: about 3 km per solar mass. A 10-solar-mass black hole is 30 km in radius; M87* is about 128 times the Earth-Sun distance.",
    },
    {
      q: "What do the Event Horizon Telescope images show?",
      a: "A ring of light emitted by very hot gas whose rays are bent around the black hole, and a dark central region: the shadow. The horizon itself is invisible, but the ring's size matches what general relativity predicts.",
    },
  ],
} as const;

function French() {
  return (
    <>
      <h2>Une définition simple</h2>
      <p>
        Un trou noir est une région de l'espace où la matière est si concentrée que rien ne peut en ressortir, pas même
        la lumière. Sa frontière s'appelle l'<strong>horizon des événements</strong>. Ce n'est pas une surface solide :
        c'est une limite de non-retour, au-delà de laquelle toutes les trajectoires mènent vers l'intérieur.
      </p>
      <p>
        N'importe quelle masse peut devenir un trou noir si on la comprime assez. La Terre devrait tenir dans une bille
        d'environ 1,8 cm de diamètre ; le Soleil, dans une boule de 6 km.
      </p>
      <DeepDive title="Le rayon de Schwarzschild">
        <Eq caption="G est la constante de gravitation, M la masse et c la vitesse de la lumière.">
          r<sub>s</sub> = 2GM / c²
        </Eq>
        <p>
          Karl Schwarzschild a trouvé cette solution des équations d'Einstein en 1916, quelques semaines après leur
          publication. Le rayon de l'horizon croît proportionnellement à la masse : environ 2,95 km par masse solaire.
          Testez d'autres masses avec le <Link href={pagePath("calculator", "fr")}>calculateur</Link>.
        </p>
      </DeepDive>

      <h2>Comment naît un trou noir</h2>
      <p>
        La plupart des trous noirs que nous connaissons sont des cadavres d'étoiles. Une étoile massive brûle son
        combustible pendant quelques millions d'années ; quand son cœur ne produit plus assez d'énergie pour résister
        à son propre poids, il s'effondre en une fraction de seconde. Selon la masse et la composition de l'étoile,
        l'effondrement laisse une étoile à neutrons ou un trou noir, avec ou sans explosion de supernova.
      </p>
      <p>
        Le seuil n'est pas net : les modèles suggèrent qu'il faut une étoile de départ d'environ 20 à 25 masses solaires
        au moins, mais la rotation, la composition chimique et la présence d'une étoile compagne changent l'issue. Les
        plus petits trous noirs connus pèsent environ 3 masses solaires, et la frontière avec les étoiles à neutrons
        reste débattue.
      </p>
      <p>
        Les trous noirs grossissent ensuite en avalant du gaz ou en fusionnant entre eux, ce que les détecteurs d'ondes
        gravitationnelles observent depuis 2015. L'origine des trous noirs supermassifs, déjà présents moins d'un
        milliard d'années après le Big Bang, reste une question ouverte.
      </p>

      <h2>Quatre familles</h2>
      <ul>
        <li>
          <strong>Stellaires</strong>, de quelques masses solaires à une centaine : les restes d'étoiles massives,
          comme Cygnus X-1 ou Gaia BH1.
        </li>
        <li>
          <strong>Intermédiaires</strong>, d'une centaine à environ cent mille masses solaires : longtemps
          introuvables, ils sont désormais attestés, par exemple par la fusion GW190521 qui a produit un trou noir
          d'environ 142 masses solaires.
        </li>
        <li>
          <strong>Supermassifs</strong>, de cent mille à plus de dix milliards de masses solaires : au centre de presque
          toutes les grandes galaxies. Celui de la galaxie Holm 15A, mesuré directement par le mouvement de ses étoiles,
          atteint environ 40 milliards de masses solaires.
        </li>
        <li>
          <strong>Primordiaux</strong> : hypothétiques, ils se seraient formés juste après le Big Bang. Aucun n'a été
          détecté à ce jour.
        </li>
      </ul>

      <h2>Anatomie d'un trou noir</h2>
      <ul>
        <li>
          <strong>L'horizon</strong> : la frontière de non-retour, de rayon r<sub>s</sub>.
        </li>
        <li>
          <strong>La sphère de photons</strong>, à 1,5 r<sub>s</sub> : la lumière peut y tourner en orbite. Elle
          dessine l'ombre visible sur les images de l'EHT.
        </li>
        <li>
          <strong>Le disque d'accrétion</strong> : du gaz qui spirale vers le trou noir et chauffe jusqu'à émettre des
          rayons X. Pour un trou noir sans rotation, sa dernière orbite stable est à 3 r<sub>s</sub>.
        </li>
        <li>
          <strong>Les jets</strong> : certains trous noirs projettent de la matière à une vitesse proche de celle de la
          lumière, sur des milliers d'années-lumière. M87 en possède un célèbre.
        </li>
        <li>
          <strong>La singularité</strong> : là où la relativité générale prédit une densité infinie et cesse de
          s'appliquer. Penrose a montré en 1965 qu'elle est inévitable dans un effondrement ; une théorie quantique de la
          gravité devrait la remplacer.
        </li>
      </ul>
      <DeepDive title="Et si le trou noir tourne ?">
        <p>
          Les trous noirs réels tournent presque tous sur eux-mêmes. Ils sont alors décrits par la solution de Kerr
          (1963) : l'horizon rétrécit, la dernière orbite stable se rapproche, et une région appelée ergosphère entraîne
          l'espace-temps dans sa rotation. Les chiffres de ce site concernent le cas le plus simple, sans rotation.
        </p>
      </DeepDive>

      <h2>Les trous noirs que l'on connaît</h2>
      <ul>
        <li>
          <strong>Cygnus X-1</strong> : environ 21 masses solaires à 7 200 années-lumière. Repéré par ses rayons X, il
          est devenu dans les années 1970 le premier objet largement accepté comme trou noir.
        </li>
        <li>
          <strong>Gaia BH1</strong> : 9,6 masses solaires à environ 1 560 années-lumière, dans la constellation
          d'Ophiuchus. Découvert en 2022 grâce au satellite Gaia, c'est le trou noir connu le plus proche de nous.
        </li>
        <li>
          <strong>Gaia BH3</strong> : 33 masses solaires à environ 1 930 années-lumière, annoncé en 2024. C'est le plus
          massif des trous noirs stellaires connus dans la Voie lactée.
        </li>
        <li>
          <strong>Sgr A*</strong> : environ 4,3 millions de masses solaires, au centre de notre galaxie, à 27 000
          années-lumière. Sa masse est mesurée grâce aux étoiles qui tournent autour, un travail récompensé par le prix
          Nobel 2020 (Reinhard Genzel et Andrea Ghez, avec Roger Penrose).
        </li>
        <li>
          <strong>M87*</strong> : 6,5 milliards de masses solaires, à 55 millions d'années-lumière. Le premier trou noir
          photographié.
        </li>
      </ul>

      <div className="not-prose my-10 grid items-start gap-5 sm:grid-cols-2">
        <EhtImage which="m87" locale="fr" />
        <EhtImage which="sgrA" locale="fr" />
      </div>

      <h2>Comment voit-on un objet invisible ?</h2>
      <p>
        Un trou noir n'émet rien, mais il trahit sa présence de quatre façons : par le mouvement des étoiles qui
        l'entourent, par la lumière du gaz qu'il chauffe, par les{" "}
        <Link href={pagePath("waves", "fr")}>ondes gravitationnelles</Link> qu'il émet en fusionnant, et par son ombre.
        Pour obtenir les images ci-dessus, l'Event Horizon Telescope a combiné des radiotélescopes répartis sur toute la
        planète, observant à 1,3 mm de longueur d'onde, comme un télescope virtuel de la taille de la Terre.
      </p>
      <p>
        Et si vous vous demandez ce qui arriverait en tombant dedans, la réponse est{" "}
        <Link href={pagePath("fallingIn", "fr")}>sur cette page</Link>.
      </p>
    </>
  );
}

function English() {
  return (
    <>
      <h2>A simple definition</h2>
      <p>
        A black hole is a region of space where matter is so concentrated that nothing can get out, not even light. Its
        boundary is called the <strong>event horizon</strong>. It is not a solid surface: it is a point of no return,
        beyond which every path leads inward.
      </p>
      <p>
        Any mass can become a black hole if it is squeezed enough. Earth would have to fit in a marble about 1.8 cm
        across; the Sun, in a ball 6 km across.
      </p>
      <DeepDive title="The Schwarzschild radius">
        <Eq caption="G is the gravitational constant, M the mass and c the speed of light.">
          r<sub>s</sub> = 2GM / c²
        </Eq>
        <p>
          Karl Schwarzschild found this solution of Einstein's equations in 1916, a few weeks after they were published.
          The horizon radius grows in proportion to the mass: about 2.95 km per solar mass. Try other masses with the{" "}
          <Link href={pagePath("calculator", "en")}>calculator</Link>.
        </p>
      </DeepDive>

      <h2>How black holes form</h2>
      <p>
        Most known black holes are dead stars. A massive star burns its fuel for a few million years; when its core no
        longer produces enough energy to hold up its own weight, it collapses in a fraction of a second. Depending on
        the star's mass and composition, the collapse leaves a neutron star or a black hole, with or without a supernova.
      </p>
      <p>
        The threshold is not sharp: models suggest a starting mass of roughly 20 to 25 solar masses or more, but
        rotation, chemical composition and a companion star change the outcome. The lightest known black holes weigh
        about 3 solar masses, and the boundary with neutron stars is still debated.
      </p>
      <p>
        Black holes then grow by swallowing gas or merging with each other, which gravitational wave detectors have
        observed since 2015. How supermassive black holes formed, already present less than a billion years after the
        Big Bang, remains an open question.
      </p>

      <h2>Four families</h2>
      <ul>
        <li>
          <strong>Stellar-mass</strong>, from a few to about a hundred solar masses: the remains of massive stars, such
          as Cygnus X-1 or Gaia BH1.
        </li>
        <li>
          <strong>Intermediate-mass</strong>, from about a hundred to a hundred thousand solar masses: long missing,
          they are now attested, for example by the GW190521 merger, which produced a black hole of about 142 solar
          masses.
        </li>
        <li>
          <strong>Supermassive</strong>, from a hundred thousand to more than ten billion solar masses: at the centre of
          almost every large galaxy. The one in the galaxy Holm 15A, measured directly from the motion of its stars,
          reaches about 40 billion solar masses.
        </li>
        <li>
          <strong>Primordial</strong>: hypothetical, formed just after the Big Bang. None has been detected so far.
        </li>
      </ul>

      <h2>Anatomy of a black hole</h2>
      <ul>
        <li>
          <strong>The horizon</strong>: the boundary of no return, with radius r<sub>s</sub>.
        </li>
        <li>
          <strong>The photon sphere</strong>, at 1.5 r<sub>s</sub>: light can orbit there. It outlines the shadow seen
          in the EHT images.
        </li>
        <li>
          <strong>The accretion disk</strong>: gas spiralling inward and heating up until it emits X-rays. For a
          non-rotating black hole, its innermost stable orbit is at 3 r<sub>s</sub>.
        </li>
        <li>
          <strong>Jets</strong>: some black holes launch matter at nearly the speed of light over thousands of
          light-years. M87 has a famous one.
        </li>
        <li>
          <strong>The singularity</strong>: where general relativity predicts infinite density and stops applying.
          Penrose showed in 1965 that it is unavoidable in a collapse; a quantum theory of gravity should replace it.
        </li>
      </ul>
      <DeepDive title="What if the black hole spins?">
        <p>
          Real black holes almost all spin. They are then described by the Kerr solution (1963): the horizon shrinks,
          the innermost stable orbit moves closer, and a region called the ergosphere drags spacetime around with it.
          The numbers on this site are for the simplest, non-rotating case.
        </p>
      </DeepDive>

      <h2>The black holes we know</h2>
      <ul>
        <li>
          <strong>Cygnus X-1</strong>: about 21 solar masses, 7,200 light-years away. Spotted through its X-rays, it
          became in the 1970s the first object widely accepted as a black hole.
        </li>
        <li>
          <strong>Gaia BH1</strong>: 9.6 solar masses, about 1,560 light-years away in the constellation Ophiuchus.
          Found in 2022 with the Gaia satellite, it is the nearest known black hole.
        </li>
        <li>
          <strong>Gaia BH3</strong>: 33 solar masses, about 1,930 light-years away, announced in 2024. It is the most
          massive stellar black hole known in the Milky Way.
        </li>
        <li>
          <strong>Sgr A*</strong>: about 4.3 million solar masses, at the centre of our galaxy, 27,000 light-years
          away. Its mass comes from the stars orbiting it, work recognised by the 2020 Nobel Prize (Reinhard Genzel and
          Andrea Ghez, together with Roger Penrose).
        </li>
        <li>
          <strong>M87*</strong>: 6.5 billion solar masses, 55 million light-years away. The first black hole ever
          imaged.
        </li>
      </ul>

      <div className="not-prose my-10 grid items-start gap-5 sm:grid-cols-2">
        <EhtImage which="m87" locale="en" />
        <EhtImage which="sgrA" locale="en" />
      </div>

      <h2>How do you see something invisible?</h2>
      <p>
        A black hole emits nothing, but it gives itself away in four ways: through the motion of nearby stars, the light
        of the gas it heats, the <Link href={pagePath("waves", "en")}>gravitational waves</Link> it emits when merging,
        and its shadow. To get the images above, the Event Horizon Telescope combined radio telescopes across the
        planet, observing at a wavelength of 1.3 mm, like a virtual telescope the size of Earth.
      </p>
      <p>
        And if you are wondering what would happen if you fell in, the answer is{" "}
        <Link href={pagePath("fallingIn", "en")}>on this page</Link>.
      </p>
    </>
  );
}

export default function BlackHolesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="blackHoles"
      locale={locale}
      kicker={fr ? "[ comprendre ]" : "[ understand ]"}
      intro={
        fr
          ? "Longtemps une curiosité mathématique, les trous noirs sont aujourd'hui photographiés, pesés et entendus. Voici ce qu'ils sont, comment ils naissent et ceux que l'on connaît."
          : "Long a mathematical curiosity, black holes are now photographed, weighed and heard. Here is what they are, how they form and the ones we know."
      }
      readingMinutes={8}
      faqs={FAQS[locale]}
      sources={["penrose-1965"]}
      externalSources={[
        OBSERVATION_SOURCES.nasaTypes,
        OBSERVATION_SOURCES.eht2019,
        OBSERVATION_SOURCES.eht2022,
        OBSERVATION_SOURCES.gravity2022,
        OBSERVATION_SOURCES.cygnusX1,
        OBSERVATION_SOURCES.gaiaBh1,
        OBSERVATION_SOURCES.gaiaBh3,
        OBSERVATION_SOURCES.gw190521,
        OBSERVATION_SOURCES.holm15a,
        OBSERVATION_SOURCES.esoCopyright,
      ]}
      related={["fallingIn", "hawking", "waves", "scale"]}
    >
      {fr ? <French /> : <English />}
    </TopicLayout>
  );
}
