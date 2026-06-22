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
  finale: {
    aria: string;
    label: string;
    line1: string;
    line2: string;
    body: string;
    cta: string;
    ambientOn: string;
    ambientOff: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
    cta: string;
    labelProgram: string;
    labelVoice: string;
    quote: string;
    quoteAuthor: string;
    quoteRole: string;
    metric: string;
    metricLabel: string;
    labelSystems: string;
    labelReach: string;
    link: string;
    linkSub: string;
    linkAria: string;
    timeline: { year: string; program: string; note: string }[];
    toolsRow1: string[];
    toolsRow2: string[];
  };
  phenomena: {
    label: string;
    title: string;
    closeModal: string;
    leftCards: { id: string; title: string; subtitle: string; body: string }[];
    rightCards: { id: string; title: string; subtitle: string; body: string }[];
  };
  footer: {
    epilogue: string;
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
    finale: {
      aria: "Singularité — immersion trou noir",
      label: "[ singularité ]",
      line1: "Au-delà de l'horizon,",
      line2: "l'information ne disparaît pas.",
      body: "Les trous noirs ne sont pas des puits sans fond. Ils encodent tout ce qui tombe en eux sur leur surface — une projection holographique où l'espace-temps émerge de l'intrication.",
      cta: "Explorer les horizons",
      ambientOn: "Activer l'ambiance",
      ambientOff: "Couper l'ambiance",
    },
    capabilities: {
      title:
        "Les trous noirs ne détruisent pas l'information — ils la transforment, la compressent, la projettent.",
      subtitle:
        "De la limite de Bekenstein à ER=EPR, chaque découverte rapproche la gravité quantique d'une géométrie émergente née de l'intrication.",
      cta: "Voir les phénomènes",
      labelProgram: "Chronologie",
      labelVoice: "Voix de la physique",
      quote:
        "« Un trou noir n'est pas aussi noir qu'on le croit. Il rayonne comme un corps chaud et peut perdre de la masse. »",
      quoteAuthor: "Stephen Hawking",
      quoteRole: "Physicien théoricien — rayonnement de Hawking, 1974",
      metric: "S = A/4",
      metricLabel: "Entropie de Bekenstein-Hawking — l'information gravite à la surface",
      labelSystems: "Systèmes fondamentaux",
      labelReach: "Continuer l'exploration",
      link: "github.com/teocomyn/spacetime-blackhole",
      linkSub: "Code source · expérience interactive",
      linkAria: "Ouvrir le dépôt GitHub",
      timeline: [
        { year: "2024", program: "Intrigation & géométrie émergente", note: "Réseaux tensoriels" },
        { year: "2013", program: "ER = EPR", note: "Ponts quantiques" },
        { year: "1974", program: "Rayonnement de Hawking", note: "Évaporation" },
      ],
      toolsRow1: ["Horizon", "Accrétion", "Tidalité", "Singularité", "Photosphère"],
      toolsRow2: ["EPR", "ER=EPR", "AdS/CFT", "Firewall", "Page curve"],
    },
    phenomena: {
      label: "[ phénomènes ]",
      title: "trous noirs",
      closeModal: "Fermer",
      leftCards: [
        {
          id: "horizon",
          title: "Horizon des événements",
          subtitle: "frontière sans retour",
          body: "La surface de non-retour où la vitesse de libération dépasse celle de la lumière. Ce qui la traverse ne peut revenir — mais l'information pourrait être encodée sur cette surface en 2D.",
        },
        {
          id: "accretion",
          title: "Disque d'accrétion",
          subtitle: "matière en chute libre",
          body: "La matière spirale vers le trou noir, chauffée par frottement jusqu'à des millions de kelvins. Ce disque brûlant est l'une des sources les plus lumineuses de l'univers.",
        },
        {
          id: "lensing",
          title: "Lentille gravitationnelle",
          subtitle: "courbure extrême",
          body: "La masse colossale du trou noir courbe l'espace-temps si fortement que la lumière des étoiles derrière est déformée en arcs — un effet prédit par Einstein, observé par EHT.",
        },
      ],
      rightCards: [
        {
          id: "paradox",
          title: "Paradoxe de l'information",
          subtitle: "où va l'information ?",
          body: "Si un trou noir disparaît par évaporation, que devient l'information des objets tombés dedans ? La physique quantique dit qu'elle ne peut être détruite — d'où le paradoxe.",
        },
        {
          id: "hawking",
          title: "Rayonnement de Hawking",
          subtitle: "évaporation quantique",
          body: "Les trous noirs ne sont pas parfaitement noirs : des paires particule-antiparticule près de l'horizon font qu'ils rayonnent et perdent lentement masse — une prédiction quantique révolutionnaire.",
        },
        {
          id: "wormhole",
          title: "Trou de ver ER=EPR",
          subtitle: "intrication géométrique",
          body: "Maldacena et Susskind ont proposé que deux particules intriquées (EPR) sont connectées par un pont d'Einstein-Rosen (ER) — l'intrication comme géométrie émergente.",
        },
      ],
    },
    footer: {
      epilogue: "[ épilogue ]",
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
    finale: {
      aria: "Singularity — black hole immersion",
      label: "[ singularity ]",
      line1: "Beyond the horizon,",
      line2: "information is not lost.",
      body: "Black holes are not bottomless pits. They encode everything that falls in on their surface — a holographic projection where spacetime emerges from entanglement.",
      cta: "Explore the horizons",
      ambientOn: "Enable ambience",
      ambientOff: "Disable ambience",
    },
    capabilities: {
      title:
        "Black holes do not destroy information — they transform it, compress it, project it.",
      subtitle:
        "From Bekenstein's bound to ER=EPR, each discovery brings quantum gravity closer to an emergent geometry born from entanglement.",
      cta: "See the phenomena",
      labelProgram: "Timeline",
      labelVoice: "Voice of physics",
      quote:
        "\"A black hole is not as black as it is painted. It radiates like a hot body and can lose mass.\"",
      quoteAuthor: "Stephen Hawking",
      quoteRole: "Theoretical physicist — Hawking radiation, 1974",
      metric: "S = A/4",
      metricLabel: "Bekenstein-Hawking entropy — information gravitates at the surface",
      labelSystems: "Core systems",
      labelReach: "Keep exploring",
      link: "github.com/teocomyn/spacetime-blackhole",
      linkSub: "Source code · interactive experience",
      linkAria: "Open GitHub repository",
      timeline: [
        { year: "2024", program: "Entanglement & emergent geometry", note: "Tensor networks" },
        { year: "2013", program: "ER = EPR", note: "Quantum bridges" },
        { year: "1974", program: "Hawking radiation", note: "Evaporation" },
      ],
      toolsRow1: ["Horizon", "Accretion", "Tidal forces", "Singularity", "Photosphere"],
      toolsRow2: ["EPR", "ER=EPR", "AdS/CFT", "Firewall", "Page curve"],
    },
    phenomena: {
      label: "[ phenomena ]",
      title: "black holes",
      closeModal: "Close",
      leftCards: [
        {
          id: "horizon",
          title: "Event horizon",
          subtitle: "point of no return",
          body: "The boundary where escape velocity exceeds light speed. What crosses cannot return — yet information may be encoded on this 2D surface.",
        },
        {
          id: "accretion",
          title: "Accretion disk",
          subtitle: "matter in free fall",
          body: "Matter spirals inward, heated by friction to millions of kelvin. This blazing disk is among the brightest sources in the universe.",
        },
        {
          id: "lensing",
          title: "Gravitational lensing",
          subtitle: "extreme curvature",
          body: "The black hole's mass warps spacetime so severely that light from background stars bends into arcs — predicted by Einstein, seen by EHT.",
        },
      ],
      rightCards: [
        {
          id: "paradox",
          title: "Information paradox",
          subtitle: "where does information go?",
          body: "If a black hole evaporates away, what happens to the information of objects that fell in? Quantum mechanics forbids its destruction — hence the paradox.",
        },
        {
          id: "hawking",
          title: "Hawking radiation",
          subtitle: "quantum evaporation",
          body: "Black holes aren't perfectly black: particle-antiparticle pairs near the horizon cause them to radiate and slowly lose mass — a revolutionary quantum prediction.",
        },
        {
          id: "wormhole",
          title: "ER=EPR wormhole",
          subtitle: "geometric entanglement",
          body: "Maldacena and Susskind proposed that entangled particles (EPR) are connected by an Einstein-Rosen bridge (ER) — entanglement as emergent geometry.",
        },
      ],
    },
    footer: {
      epilogue: "[ epilogue ]",
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
