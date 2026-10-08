import Link from "next/link";
import TopicLayout from "@/components/topic/TopicLayout";
import DeepDive from "@/components/topic/DeepDive";
import PageCurve from "@/components/tools/PageCurve";
import type { Locale } from "@/context/AppContext";
import { pagePath } from "@/lib/routes";

const FAQS = {
  fr: [
    {
      q: "Le paradoxe de l'information est-il résolu ?",
      a: "Pas complètement. Depuis 2019, des calculs montrent que l'entropie du rayonnement suit bien la courbe de Page, ce qui indique que l'information ressort. Mais on ne sait pas encore décrire en détail comment elle est encodée dans le rayonnement, ni comment cela s'applique à notre Univers.",
    },
    {
      q: "Hawking a-t-il changé d'avis ?",
      a: "Oui. En 2004, il a reconnu publiquement que l'information n'était probablement pas détruite, et a perdu un pari célèbre contre le physicien John Preskill.",
    },
    {
      q: "Qu'est-ce que l'« information » ici ?",
      a: "Tout ce qui permet de distinguer deux états de départ : la composition d'un livre et celle d'une étoile ne donnent pas le même trou noir en apparence, mais la mécanique quantique exige que la différence reste inscrite quelque part.",
    },
  ],
  en: [
    {
      q: "Has the information paradox been solved?",
      a: "Not entirely. Since 2019, calculations show that the radiation entropy does follow the Page curve, which indicates that information comes out. But we cannot yet describe in detail how it is encoded in the radiation, nor how this applies to our Universe.",
    },
    {
      q: "Did Hawking change his mind?",
      a: "Yes. In 2004 he publicly accepted that information was probably not destroyed, and lost a famous bet to physicist John Preskill.",
    },
    {
      q: "What does \"information\" mean here?",
      a: "Everything that tells two starting states apart: a book and a star may produce black holes that look the same, but quantum mechanics requires the difference to remain written somewhere.",
    },
  ],
} as const;

function French() {
  return (
    <>
      <h2>Le problème</h2>
      <p>
        La mécanique quantique repose sur un principe strict : l'information ne se perd jamais. Brûlez un livre, et en
        principe, en mesurant parfaitement la fumée, la lumière et les cendres, on pourrait reconstituer chaque page.
        Les lois sont réversibles.
      </p>
      <p>
        Or le <Link href={pagePath("hawking", "fr")}>rayonnement de Hawking</Link> est thermique : il ne dépend que de la
        masse, de la charge et de la rotation du trou noir, pas de ce qui y est tombé. Si le trou noir s'évapore
        entièrement, l'information semble effacée de l'Univers. En 1976, Hawking conclut que la gravité viole la
        mécanique quantique. Beaucoup de physiciens refusent cette conclusion : l'un des deux piliers de la physique
        doit céder.
      </p>

      <h2>La courbe de Page</h2>
      <p>
        En 1993, Don Page propose un test : suivre l'entropie du rayonnement au fil de l'évaporation. Si l'information
        est perdue, elle grimpe jusqu'au bout. Si l'information est préservée, elle doit monter, atteindre un maximum
        vers le milieu de la vie du trou noir, puis redescendre jusqu'à zéro. Faites varier le temps :
      </p>
      <PageCurve />
      <DeepDive title="Pourquoi l'entropie doit redescendre">
        <p>
          L'entropie mesure ici l'intrication entre le rayonnement et le trou noir. Au début, chaque particule émise est
          intriquée avec le trou noir, et cette intrication grandit. Mais un trou noir ne peut pas être intriqué au-delà
          de sa propre entropie, qui diminue en s'évaporant. Passé le « temps de Page », les nouvelles particules doivent
          donc être intriquées avec les anciennes, et l'entropie totale du rayonnement décroît jusqu'à zéro : un état
          pur, qui contient toute l'information.
        </p>
      </DeepDive>

      <h2>2012 : le mur de feu</h2>
      <p>
        Almheiri, Marolf, Polchinski et Sully poussent le raisonnement à bout : si l'information ressort, les particules
        émises tardivement ne peuvent pas être à la fois intriquées avec le rayonnement ancien et avec leur partenaire
        derrière l'horizon. Il faudrait alors rompre cette intrication, ce qui créerait un « mur de feu » d'énergie à
        l'horizon, en contradiction avec l'idée qu'un observateur en chute libre n'y remarque rien.
      </p>

      <h2>2013 : ER = EPR</h2>
      <p>
        Juan Maldacena et Leonard Susskind proposent une issue : deux systèmes intriqués seraient reliés par un trou de
        ver microscopique. L'intérieur du trou noir et le rayonnement lointain ne seraient alors pas deux régions
        indépendantes, et le conflit disparaîtrait. Cette conjecture rejoint l'idée centrale de ce site : la géométrie
        de l'espace-temps serait faite d'intrication.
      </p>

      <h2>2019 : les îlots</h2>
      <p>
        Deux équipes, celle de Geoffrey Penington et celle d'Almheiri, Engelhardt, Marolf et Maxfield, montrent que
        lorsque l'on calcule l'entropie du rayonnement en tenant compte de la géométrie de l'espace-temps, une région à
        l'intérieur du trou noir, appelée depuis « îlot », doit être comptée avec le rayonnement. Le résultat reproduit
        exactement la courbe de Page. Pour la première fois, un calcul fondé sur la gravité indique que l'information
        ressort.
      </p>
      <p>
        Ces calculs ont été faits dans des modèles simplifiés, souvent en espace Anti-de Sitter. Savoir comment
        l'information est concrètement encodée dans le rayonnement, et ce qu'il en est dans notre Univers, reste l'une
        des grandes questions de la physique.
      </p>
    </>
  );
}

function English() {
  return (
    <>
      <h2>The problem</h2>
      <p>
        Quantum mechanics rests on a strict principle: information is never lost. Burn a book, and in principle, by
        measuring the smoke, light and ashes perfectly, you could rebuild every page. The laws are reversible.
      </p>
      <p>
        Yet <Link href={pagePath("hawking", "en")}>Hawking radiation</Link> is thermal: it depends only on the black
        hole's mass, charge and spin, not on what fell in. If the black hole evaporates entirely, the information seems
        erased from the Universe. In 1976 Hawking concluded that gravity violates quantum mechanics. Many physicists
        rejected that conclusion: one of the two pillars of physics has to give.
      </p>

      <h2>The Page curve</h2>
      <p>
        In 1993, Don Page proposed a test: follow the entropy of the radiation as the black hole evaporates. If
        information is lost, it keeps rising to the end. If information is preserved, it must rise, peak around the
        middle of the black hole's life, then fall back to zero. Move the time slider:
      </p>
      <PageCurve />
      <DeepDive title="Why the entropy has to come down">
        <p>
          Here entropy measures the entanglement between the radiation and the black hole. At first, each emitted
          particle is entangled with the black hole, and that entanglement grows. But a black hole cannot be entangled
          beyond its own entropy, which shrinks as it evaporates. After the "Page time", new particles must therefore be
          entangled with earlier ones, and the total radiation entropy falls to zero: a pure state carrying all the
          information.
        </p>
      </DeepDive>

      <h2>2012: the firewall</h2>
      <p>
        Almheiri, Marolf, Polchinski and Sully pushed the argument to the limit: if information comes out, late
        particles cannot be entangled both with the early radiation and with their partner behind the horizon. That
        entanglement would have to break, creating a "firewall" of energy at the horizon, contradicting the idea that a
        freely falling observer notices nothing there.
      </p>

      <h2>2013: ER = EPR</h2>
      <p>
        Juan Maldacena and Leonard Susskind proposed a way out: two entangled systems would be linked by a microscopic
        wormhole. The black hole interior and the distant radiation would then not be independent regions, and the
        conflict would vanish. This conjecture echoes the central idea of this site: spacetime geometry would be made of
        entanglement.
      </p>

      <h2>2019: islands</h2>
      <p>
        Two teams, Geoffrey Penington's and that of Almheiri, Engelhardt, Marolf and Maxfield, showed that when the
        radiation entropy is computed taking spacetime geometry into account, a region inside the black hole, since
        called an "island", must be counted together with the radiation. The result reproduces the Page curve exactly.
        For the first time, a gravity-based calculation indicated that information comes out.
      </p>
      <p>
        These calculations were done in simplified models, often in Anti-de Sitter space. How the information is
        actually encoded in the radiation, and what happens in our own Universe, remains one of the big questions in
        physics.
      </p>
    </>
  );
}

export default function ParadoxPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="paradox"
      locale={locale}
      kicker={fr ? "[ énigme ouverte ]" : "[ open puzzle ]"}
      intro={
        fr
          ? "Si un trou noir s'évapore en rayonnement thermique, que devient tout ce qui y est tombé ? Depuis 1976, cette question oppose relativité générale et mécanique quantique. Les calculs de 2019 ont changé la donne."
          : "If a black hole evaporates into thermal radiation, what happens to everything that fell in? Since 1976 this question has pitted general relativity against quantum mechanics. The 2019 calculations changed the picture."
      }
      readingMinutes={8}
      faqs={FAQS[locale]}
      sources={[
        "hawking-1976",
        "page-1993",
        "amps-2012",
        "maldacena-susskind-2013",
        "penington-2019",
        "almheiri-2019",
        "ammz-2019",
      ]}
      related={["hawking", "glossary", "sources", "blackHoles"]}
    >
      {fr ? <French /> : <English />}
    </TopicLayout>
  );
}
