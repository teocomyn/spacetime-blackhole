import type { Locale } from "@/context/AppContext";
import type { SimMode } from "@/lib/types";

type Dictionary = {
  skipLink: string;
  navAria: string;
  reduceEffects: string;
  langToggle: string;
  hero: {
    credit: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    scroll: string;
    videoLabel: string;
  };
  problem: {
    staticTitle: string;
    staticSummary: string;
    text1: string;
    sceneTitle: string;
    sceneDesc: string;
    actorTitle: string;
    actorDesc: string;
    text3Title: string;
    text3Desc: string;
    explosion: string;
    text4: string;
    grLabel: string;
    grSub: string;
    qmLabel: string;
    qmSub: string;
  };
  intuition: {
    staticTitle: string;
    text1Title: string;
    text1Desc: string;
    text2Title: string;
    text2Desc: string;
    text3Title: string;
    text3Line1: string;
    text3Line2: string;
  };
  simulation: {
    loading: string;
    disclaimer: string;
    panelTitle: string;
    collapse: string;
    expand: string;
    modes: Record<
      SimMode,
      { label: string; desc: string; aria: string }
    >;
    entanglement: string;
    mass: string;
    epr: string;
    rebuild: string;
  };
  timeline: {
    title: string;
    subtitle: string;
  };
  unknowns: {
    title: string;
    subtitle: string;
  };
  bibliography: {
    title: string;
    subtitle: string;
  };
  glossary: {
    title: string;
    subtitle: string;
  };
  footer: {
    line1: string;
    line2: string;
    quote: string;
    replaySim: string;
    backTop: string;
    credits: string;
    source: string;
  };
};

export const translations: Record<Locale, Dictionary> = {
  fr: {
    skipLink: "Aller au contenu principal",
    navAria: "Navigation des sections",
    reduceEffects: "Réduire les effets",
    langToggle: "English",
    hero: {
      credit: "Développé par Teo Comyn",
      title: "L'ESPACE N'EXISTE PAS",
      subtitle1: "L'univers n'est pas fait de matière dans l'espace-temps.",
      subtitle2: "L'espace-temps est la façon dont l'information s'organise.",
      scroll: "Descendre pour comprendre",
      videoLabel: "Vidéo d'ambiance cosmologique en arrière-plan",
    },
    problem: {
      staticTitle: "Le conflit GR / MQ",
      staticSummary:
        "La relativité générale décrit un espace-temps lisse et continu. La mécanique quantique décrit un monde discret et probabiliste. Les combiner au cœur d'un trou noir ou du Big Bang produit des infinis incontrôlables.",
      text1:
        "Depuis un siècle, la physique possède deux théories extraordinairement précises.",
      sceneTitle: "LA SCÈNE",
      sceneDesc:
        "La relativité générale dit que l'espace-temps est un tissu lisse et continu. La masse le courbe. La courbure dicte le mouvement.",
      actorTitle: "L'ACTEUR",
      actorDesc:
        "La mécanique quantique dit que tout est granulaire, discret, probabiliste. Les particules n'existent pas avant d'être mesurées.",
      text3Title: "Mais quand on essaie de les combiner...",
      text3Desc:
        "Ce qui est pourtant indispensable pour décrire le cœur d'un trou noir ou le Big Bang. Comment quantifier l'acteur qui est aussi la scène ?",
      explosion: "Les équations explosent.",
      text4: "On obtient des infinis. Incontrôlables.",
      grLabel: "RELATIVITÉ GÉNÉRALE",
      grSub: "Continu, lisse, déformable",
      qmLabel: "MÉCANIQUE QUANTIQUE",
      qmSub: "Discret, probabiliste, granulaire",
    },
    intuition: {
      staticTitle: "L'émergence de l'espace-temps",
      text1Title: "Et si la question elle-même était mal posée ?",
      text1Desc:
        "On cherche à \"marier\" la gravité et la mécanique quantique. Mais c'est comme demander comment marier la température et les atomes.",
      text2Title: "La température n'est pas fondamentale.",
      text2Desc:
        "Elle n'existe pas au niveau microscopique. C'est une illusion statistique qui émerge de l'agitation d'un très grand nombre de molécules.",
      text3Title: "L'espace-temps est la même chose.",
      text3Line1: "Pas une scène fixe. Pas un ingrédient fondamental de l'univers.",
      text3Line2: "Une illusion macroscopique qui émerge de l'information quantique.",
    },
    simulation: {
      loading: "Chargement de la simulation WebGL…",
      disclaimer:
        "Visualisation conceptuelle — métaphore pédagogique, pas une simulation numérique des équations de la physique.",
      panelTitle: "Tableau de contrôle",
      collapse: "Masquer les contrôles",
      expand: "Afficher les contrôles",
      modes: {
        entanglement: {
          label: "Réseau d'intrication",
          desc: "L'espace-temps émerge des liens d'intrication quantique entre qubits. La distance devient l'inverse de l'intrication.",
          aria: "Mode réseau d'intrication",
        },
        blackhole: {
          label: "Trou noir (effondrement)",
          desc: "Quand l'intrication se concentre excessivement, la géométrie s'effondre. Un trou noir se forme et déchire l'espace-temps.",
          aria: "Mode trou noir",
        },
        wormhole: {
          label: "ER = EPR (Trou de ver)",
          desc: "Deux régions très intriquées mais éloignées créent un pont d'Einstein-Rosen — un raccourci dans l'espace-temps émergent.",
          aria: "Mode trou de ver ER=EPR",
        },
        decoherence: {
          label: "Décohérence",
          desc: "Si l'intrication se brise, l'espace-temps se déconnecte. Sans intrication → pas de géométrie → pas de gravité.",
          aria: "Mode décohérence",
        },
      },
      entanglement: "Intrication globale",
      mass: "Masse du trou noir",
      epr: "Intrication EPR",
      rebuild: "Reconstruire l'espace-temps",
    },
    timeline: {
      title: "Un changement de paradigme",
      subtitle: "Cinquante ans d'indices convergents",
    },
    unknowns: {
      title: "Ce que l'on ne sait pas",
      subtitle:
        "Le concept est très probablement le bon. Mais connaître la direction n'est pas la même chose que trouver le chemin.",
    },
    bibliography: {
      title: "Pour aller plus loin",
      subtitle: "Articles fondateurs et lectures recommandées",
    },
    glossary: {
      title: "Glossaire",
      subtitle: "Termes clés de la physique holographique",
    },
    footer: {
      line1: "L'espace-temps n'est pas",
      line2: "C'est le contenu.",
      quote: "Et peut-être qu'un jour, les trous noirs éclaireront nos chemins.",
      replaySim: "Rejouer la simulation",
      backTop: "Remonter au début",
      credits:
        "BASÉ SUR LES TRAVAUX DE: MALDACENA, PENROSE, HAWKING, RYU, TAKAYANAGI, VERLINDE, SUSSKIND",
      source: "CODE SOURCE",
    },
  },
  en: {
    skipLink: "Skip to main content",
    navAria: "Section navigation",
    reduceEffects: "Reduce effects",
    langToggle: "Français",
    hero: {
      credit: "Built by Teo Comyn",
      title: "SPACE DOES NOT EXIST",
      subtitle1: "The universe is not matter inside spacetime.",
      subtitle2: "Spacetime is how quantum information organizes itself.",
      scroll: "Scroll to understand",
      videoLabel: "Cosmological ambient background video",
    },
    problem: {
      staticTitle: "The GR / QM conflict",
      staticSummary:
        "General relativity describes smooth, continuous spacetime. Quantum mechanics describes a discrete, probabilistic world. Combining them at a black hole core or the Big Bang yields uncontrollable infinities.",
      text1:
        "For a century, physics has possessed two extraordinarily precise theories.",
      sceneTitle: "THE STAGE",
      sceneDesc:
        "General relativity says spacetime is a smooth, continuous fabric. Mass curves it. Curvature dictates motion.",
      actorTitle: "THE ACTOR",
      actorDesc:
        "Quantum mechanics says everything is granular, discrete, probabilistic. Particles do not exist before measurement.",
      text3Title: "But when we try to combine them...",
      text3Desc:
        "Yet this is essential to describe a black hole's core or the Big Bang. How do you quantize the actor that is also the stage?",
      explosion: "The equations blow up.",
      text4: "We get infinities. Uncontrollable ones.",
      grLabel: "GENERAL RELATIVITY",
      grSub: "Continuous, smooth, deformable",
      qmLabel: "QUANTUM MECHANICS",
      qmSub: "Discrete, probabilistic, granular",
    },
    intuition: {
      staticTitle: "Emergent spacetime",
      text1Title: "What if the question itself is wrong?",
      text1Desc:
        "We try to \"marry\" gravity and quantum mechanics. But that's like asking how to marry temperature and atoms.",
      text2Title: "Temperature is not fundamental.",
      text2Desc:
        "It does not exist at the microscopic level. It is a statistical illusion that emerges from the motion of countless molecules.",
      text3Title: "Spacetime is the same.",
      text3Line1: "Not a fixed stage. Not a fundamental ingredient of the universe.",
      text3Line2: "A macroscopic illusion emerging from quantum information.",
    },
    simulation: {
      loading: "Loading WebGL simulation…",
      disclaimer:
        "Conceptual visualization — a pedagogical metaphor, not a numerical simulation of physics equations.",
      panelTitle: "Control panel",
      collapse: "Hide controls",
      expand: "Show controls",
      modes: {
        entanglement: {
          label: "Entanglement network",
          desc: "Spacetime emerges from quantum entanglement links between qubits. Distance becomes the inverse of entanglement.",
          aria: "Entanglement network mode",
        },
        blackhole: {
          label: "Black hole (collapse)",
          desc: "When entanglement concentrates too much, geometry collapses. A black hole forms and tears spacetime apart.",
          aria: "Black hole mode",
        },
        wormhole: {
          label: "ER = EPR (Wormhole)",
          desc: "Two highly entangled but distant regions create an Einstein-Rosen bridge — a shortcut in emergent spacetime.",
          aria: "ER=EPR wormhole mode",
        },
        decoherence: {
          label: "Decoherence",
          desc: "If entanglement breaks, spacetime disconnects. No entanglement → no geometry → no gravity.",
          aria: "Decoherence mode",
        },
      },
      entanglement: "Global entanglement",
      mass: "Black hole mass",
      epr: "EPR entanglement",
      rebuild: "Rebuild spacetime",
    },
    timeline: {
      title: "A paradigm shift",
      subtitle: "Fifty years of converging clues",
    },
    unknowns: {
      title: "What we don't know",
      subtitle:
        "The concept is very likely right. But knowing the direction is not the same as finding the path.",
    },
    bibliography: {
      title: "Further reading",
      subtitle: "Foundational papers and recommended sources",
    },
    glossary: {
      title: "Glossary",
      subtitle: "Key terms in holographic physics",
    },
    footer: {
      line1: "Spacetime is not",
      line2: "It is the content.",
      quote: "And perhaps one day, black holes will light our way.",
      replaySim: "Replay simulation",
      backTop: "Back to top",
      credits:
        "BASED ON WORK BY: MALDACENA, PENROSE, HAWKING, RYU, TAKAYANAGI, VERLINDE, SUSSKIND",
      source: "SOURCE CODE",
    },
  },
};

export function useTranslation(locale: Locale) {
  return translations[locale];
}
