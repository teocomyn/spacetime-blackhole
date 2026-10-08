import Link from "next/link";
import TopicLayout from "@/components/topic/TopicLayout";
import DeepDive from "@/components/topic/DeepDive";
import Eq from "@/components/topic/Eq";
import FallSequence from "@/components/tools/FallSequence";
import type { Locale } from "@/context/AppContext";
import { OBSERVATION_SOURCES } from "@/lib/content";
import { pagePath } from "@/lib/routes";

const FAQS = {
  fr: [
    {
      q: "Peut-on survivre à la traversée de l'horizon ?",
      a: "Pour un trou noir supermassif, l'horizon lui-même ne vous ferait rien : les forces de marée y sont faibles. Mais une fois à l'intérieur, la rencontre avec la singularité est inévitable. Pour un trou noir stellaire, vous seriez détruit bien avant l'horizon.",
    },
    {
      q: "Combien de temps dure la chute à l'intérieur ?",
      a: "Pour un trou noir sans rotation, le temps entre l'horizon et la singularité, mesuré par celui qui tombe, est au plus πGM/c³ : environ 66 secondes pour Sgr A*, 0,15 milliseconde pour un trou noir de 10 masses solaires.",
    },
    {
      q: "Verrait-on défiler tout le futur de l'Univers ?",
      a: "Non, c'est une idée reçue. C'est l'observateur extérieur qui ne vous voit jamais franchir l'horizon. Vous, en tombant, ne voyez qu'une portion limitée de l'histoire extérieure avant d'atteindre la singularité.",
    },
    {
      q: "Le rendu de cette page est-il réaliste ?",
      a: "La déformation du ciel et du disque est calculée en suivant la trajectoire réelle des rayons de lumière autour d'un trou noir de Schwarzschild. Les couleurs du disque et la texture du gaz sont, elles, stylisées.",
    },
  ],
  en: [
    {
      q: "Could you survive crossing the horizon?",
      a: "For a supermassive black hole, the horizon itself would do nothing to you: tidal forces there are weak. But once inside, meeting the singularity is unavoidable. For a stellar black hole, you would be destroyed long before the horizon.",
    },
    {
      q: "How long does the fall inside last?",
      a: "For a non-rotating black hole, the time from horizon to singularity, as measured by the one falling, is at most πGM/c³: about 66 seconds for Sgr A*, 0.15 milliseconds for a 10-solar-mass black hole.",
    },
    {
      q: "Would you see the whole future of the Universe flash by?",
      a: "No, that is a myth. It is the outside observer who never sees you cross the horizon. You, falling in, only see a limited stretch of outside history before reaching the singularity.",
    },
    {
      q: "Is the render on this page realistic?",
      a: "The warping of the sky and the disk is computed by following the real paths of light rays around a Schwarzschild black hole. The disk colours and gas texture are stylised.",
    },
  ],
} as const;

function French() {
  return (
    <>
      <p>
        Faites défiler : la caméra plonge vers l'horizon. Chaque pixel de l'image suit un rayon de lumière dévié par le
        trou noir. Le sélecteur en haut compare un trou noir stellaire et Sgr A*, le géant du centre de notre galaxie.
      </p>
      <FallSequence />

      <h2>Spaghettification : une question de taille</h2>
      <p>
        La gravité diminue avec la distance. Vos pieds, plus proches du trou noir, sont donc tirés plus fort que votre
        tête : c'est la force de marée. Près d'un petit trou noir, elle devient énorme bien avant l'horizon. Près d'un
        géant, elle reste douce jusqu'à l'intérieur, parce que l'horizon est très loin du centre.
      </p>
      <DeepDive title="Le calcul de la marée">
        <Eq caption="Écart d'accélération entre deux points séparés de L, à la distance r d'une masse M.">
          Δa ≈ 2GML / r³
        </Eq>
        <p>
          À l'horizon, r = 2GM/c², donc Δa ∝ 1/M² : plus le trou noir est massif, plus la marée y est faible. Pour un
          corps de 2 m, l'écart dépasse 100 g vers 1 700 km du centre d'un trou noir de 10 masses solaires, dont
          l'horizon ne mesure que 30 km. À l'horizon de Sgr A*, il n'est que de un dix-millième de g environ.
        </p>
      </DeepDive>

      <h2>Le temps, vu de loin et vu de près</h2>
      <p>
        Près d'un trou noir, le temps s'écoule plus lentement que loin de lui. Un observateur resté à distance voit vos
        signaux arriver de plus en plus espacés et de plus en plus rouges ; à l'horizon, ce ralentissement devient
        infini et votre image s'efface sans jamais franchir la frontière. Pour vous, rien de tel : votre montre
        continue de battre normalement.
      </p>
      <DeepDive title="La dilatation gravitationnelle du temps">
        <Eq caption="Rythme d'une horloge immobile à la distance r, comparé à une horloge très lointaine.">
          dτ / dt = √(1 − r<sub>s</sub> / r)
        </Eq>
        <p>
          À deux fois le rayon de l'horizon, une horloge immobile bat environ 30 % moins vite qu'une horloge lointaine.
          L'effet existe aussi sur Terre, en beaucoup plus petit : les horloges des satellites GPS doivent en tenir
          compte.
        </p>
      </DeepDive>

      <h2>Ce que l'on voit en tombant</h2>
      <p>
        La lumière de l'Univers extérieur se concentre dans un disque de plus en plus petit au-dessus de vous, tandis que
        l'ombre du trou noir envahit le reste du ciel. La NASA a publié en 2024 une simulation de cette plongée pour un
        trou noir de la masse de Sgr A* : la caméra franchit l'horizon puis est détruite par les marées environ 13
        secondes plus tard.
      </p>

      <h2>Et la singularité ?</h2>
      <p>
        À l'intérieur de l'horizon, l'espace et le temps échangent en quelque sorte leurs rôles : le centre n'est plus un
        endroit vers lequel on se dirige, mais un instant inscrit dans votre futur. Aucune poussée de fusée ne permet de
        l'éviter, elle ne ferait au contraire que raccourcir le trajet. Ce que devient la matière à cet endroit, seule
        une théorie quantique de la gravité pourra le dire.
      </p>
      <p>
        Pour comparer d'autres trous noirs, essayez le <Link href={pagePath("calculator", "fr")}>calculateur</Link>.
      </p>
    </>
  );
}

function English() {
  return (
    <>
      <p>
        Scroll down: the camera dives towards the horizon. Every pixel of the image follows a light ray bent by the black
        hole. The switch at the top compares a stellar black hole with Sgr A*, the giant at the centre of our galaxy.
      </p>
      <FallSequence />

      <h2>Spaghettification: a matter of size</h2>
      <p>
        Gravity weakens with distance. Your feet, closer to the black hole, are pulled harder than your head: that is the
        tidal force. Near a small black hole it becomes enormous long before the horizon. Near a giant it stays gentle
        until you are inside, because the horizon is very far from the centre.
      </p>
      <DeepDive title="Computing the tide">
        <Eq caption="Difference in acceleration between two points L apart, at distance r from a mass M.">
          Δa ≈ 2GML / r³
        </Eq>
        <p>
          At the horizon r = 2GM/c², so Δa ∝ 1/M²: the more massive the black hole, the weaker the tide there. For a 2 m
          body, the difference exceeds 100 g at about 1,700 km from the centre of a 10-solar-mass black hole, whose
          horizon is only 30 km in radius. At Sgr A*'s horizon it is only about one ten-thousandth of a g.
        </p>
      </DeepDive>

      <h2>Time, seen from afar and up close</h2>
      <p>
        Near a black hole, time runs slower than far away. An observer at a distance sees your signals arrive more and
        more spread out and redder; at the horizon this slowdown becomes infinite and your image fades without ever
        crossing the boundary. For you, nothing of the sort: your watch keeps ticking normally.
      </p>
      <DeepDive title="Gravitational time dilation">
        <Eq caption="Rate of a clock held at distance r, compared with a very distant clock.">
          dτ / dt = √(1 − r<sub>s</sub> / r)
        </Eq>
        <p>
          At twice the horizon radius, a clock held in place runs about 30% slower than a distant one. The effect exists
          on Earth too, far smaller: GPS satellite clocks must account for it.
        </p>
      </DeepDive>

      <h2>What you see as you fall</h2>
      <p>
        Light from the outside Universe gathers into a smaller and smaller disk above you, while the black hole's shadow
        fills the rest of the sky. In 2024 NASA released a simulation of this plunge for a black hole with the mass of
        Sgr A*: the camera crosses the horizon and is torn apart by tides about 13 seconds later.
      </p>

      <h2>And the singularity?</h2>
      <p>
        Inside the horizon, space and time in a sense swap roles: the centre is no longer a place you head towards but a
        moment written in your future. No rocket thrust can avoid it; it would only shorten the trip. What happens to
        matter there, only a quantum theory of gravity will tell.
      </p>
      <p>
        To compare other black holes, try the <Link href={pagePath("calculator", "en")}>calculator</Link>.
      </p>
    </>
  );
}

export default function FallingInPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="fallingIn"
      locale={locale}
      kicker={fr ? "[ expérience de pensée ]" : "[ thought experiment ]"}
      intro={
        fr
          ? "Tout dépend de la taille du trou noir. Près d'un petit, vous êtes étiré avant même d'atteindre l'horizon ; dans un géant, vous le traversez sans rien sentir. Puis le temps fait le reste."
          : "It all depends on the size of the black hole. Near a small one you are stretched before even reaching the horizon; into a giant one you cross it without feeling a thing. Then time does the rest."
      }
      readingMinutes={7}
      faqs={FAQS[locale]}
      externalSources={[OBSERVATION_SOURCES.nasaPlunge, OBSERVATION_SOURCES.gravity2022]}
      related={["blackHoles", "calculator", "hawking", "scale"]}
    >
      {fr ? <French /> : <English />}
    </TopicLayout>
  );
}
