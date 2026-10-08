import type { Locale } from "@/context/AppContext";

type PageEntry = {
  path: Record<Locale, string>;
  title: Record<Locale, string>;
  navLabel: Record<Locale, string>;
  description: Record<Locale, string>;
  kind: "home" | "topic" | "tool" | "reference";
};

export const PAGES = {
  home: {
    path: { fr: "/", en: "/en" },
    title: {
      fr: "L'espace n'existe pas : trous noirs et espace-temps émergent",
      en: "Space does not exist: black holes and emergent spacetime",
    },
    navLabel: { fr: "Accueil", en: "Home" },
    description: {
      fr: "Une expérience interactive sur les trous noirs, le rayonnement de Hawking et l'idée que l'espace-temps émerge de l'intrication quantique.",
      en: "An interactive experience about black holes, Hawking radiation and the idea that spacetime emerges from quantum entanglement.",
    },
    kind: "home",
  },
  blackHoles: {
    path: { fr: "/trous-noirs", en: "/en/black-holes" },
    title: {
      fr: "Qu'est-ce qu'un trou noir ? Formation, types et trous noirs observés",
      en: "What is a black hole? Formation, types and observed black holes",
    },
    navLabel: { fr: "Les trous noirs", en: "Black holes" },
    description: {
      fr: "Comment naît un trou noir, quels types existent, de Gaia BH1 à M87*, et comment on les a photographiés et entendus.",
      en: "How black holes form, which types exist, from Gaia BH1 to M87*, and how we photographed and heard them.",
    },
    kind: "topic",
  },
  fallingIn: {
    path: { fr: "/tomber-dans-un-trou-noir", en: "/en/falling-into-a-black-hole" },
    title: {
      fr: "Que se passe-t-il si on tombe dans un trou noir ?",
      en: "What happens if you fall into a black hole?",
    },
    navLabel: { fr: "Tomber dedans", en: "Falling in" },
    description: {
      fr: "Spaghettification, dilatation du temps, traversée de l'horizon : la chute dans un trou noir, étape par étape, avec un rendu de la lentille gravitationnelle.",
      en: "Spaghettification, time dilation, crossing the horizon: falling into a black hole step by step, with a gravitational lensing render.",
    },
    kind: "topic",
  },
  hawking: {
    path: { fr: "/rayonnement-de-hawking", en: "/en/hawking-radiation" },
    title: {
      fr: "Le rayonnement de Hawking : pourquoi les trous noirs s'évaporent",
      en: "Hawking radiation: why black holes evaporate",
    },
    navLabel: { fr: "Rayonnement de Hawking", en: "Hawking radiation" },
    description: {
      fr: "La découverte de 1974 qui a donné une température aux trous noirs, la formule de Hawking et le temps d'évaporation, expliqués simplement.",
      en: "The 1974 discovery that gave black holes a temperature, Hawking's formula and the evaporation time, explained simply.",
    },
    kind: "topic",
  },
  paradox: {
    path: { fr: "/paradoxe-de-l-information", en: "/en/information-paradox" },
    title: {
      fr: "Le paradoxe de l'information et la courbe de Page",
      en: "The black hole information paradox and the Page curve",
    },
    navLabel: { fr: "Paradoxe de l'information", en: "Information paradox" },
    description: {
      fr: "Un trou noir détruit-il l'information ? Le paradoxe de Hawking, la courbe de Page interactive et les « îlots » de 2019.",
      en: "Do black holes destroy information? Hawking's paradox, an interactive Page curve and the 2019 \"islands\".",
    },
    kind: "topic",
  },
  waves: {
    path: { fr: "/ondes-gravitationnelles", en: "/en/gravitational-waves" },
    title: {
      fr: "Ondes gravitationnelles : entendre deux trous noirs fusionner",
      en: "Gravitational waves: hearing two black holes merge",
    },
    navLabel: { fr: "Ondes gravitationnelles", en: "Gravitational waves" },
    description: {
      fr: "GW150914, le premier signal d'ondes gravitationnelles, expliqué et rendu audible avec un synthétiseur de « chirp ».",
      en: "GW150914, the first gravitational wave signal, explained and made audible with a chirp synthesizer.",
    },
    kind: "topic",
  },
  calculator: {
    path: { fr: "/calculateur", en: "/en/calculator" },
    title: {
      fr: "Calculateur de trou noir : rayon de Schwarzschild, température de Hawking",
      en: "Black hole calculator: Schwarzschild radius, Hawking temperature",
    },
    navLabel: { fr: "Calculateur", en: "Calculator" },
    description: {
      fr: "Choisissez une masse et obtenez le rayon de l'horizon, la température de Hawking, le temps d'évaporation et l'entropie du trou noir.",
      en: "Pick a mass and get the horizon radius, Hawking temperature, evaporation time and entropy of the black hole.",
    },
    kind: "tool",
  },
  scale: {
    path: { fr: "/comparateur", en: "/en/size-comparison" },
    title: {
      fr: "Comparateur de taille des trous noirs, de Gaia BH1 à TON 618",
      en: "Black hole size comparison, from Gaia BH1 to TON 618",
    },
    navLabel: { fr: "Comparateur", en: "Size comparison" },
    description: {
      fr: "Comparez l'horizon des trous noirs à Paris, à la Terre, au Soleil et au Système solaire, à la même échelle.",
      en: "Compare black hole horizons with Paris, Earth, the Sun and the Solar System, at the same scale.",
    },
    kind: "tool",
  },
  quiz: {
    path: { fr: "/quiz", en: "/en/quiz" },
    title: {
      fr: "Quiz trous noirs : testez vos connaissances",
      en: "Black hole quiz: test your knowledge",
    },
    navLabel: { fr: "Quiz", en: "Quiz" },
    description: {
      fr: "Dix questions sur les trous noirs, l'horizon, Hawking et les ondes gravitationnelles, avec une explication à chaque réponse.",
      en: "Ten questions about black holes, horizons, Hawking and gravitational waves, with an explanation for every answer.",
    },
    kind: "tool",
  },
  glossary: {
    path: { fr: "/glossaire", en: "/en/glossary" },
    title: {
      fr: "Glossaire des trous noirs et de la gravité quantique",
      en: "Glossary of black holes and quantum gravity",
    },
    navLabel: { fr: "Glossaire", en: "Glossary" },
    description: {
      fr: "Horizon, singularité, sphère de photons, courbe de Page, ER = EPR : les termes clés définis simplement.",
      en: "Event horizon, singularity, photon sphere, Page curve, ER = EPR: key terms defined simply.",
    },
    kind: "reference",
  },
  sources: {
    path: { fr: "/sources", en: "/en/sources" },
    title: {
      fr: "Sources et méthode : articles scientifiques et crédits",
      en: "Sources and method: scientific papers and credits",
    },
    navLabel: { fr: "Sources", en: "Sources" },
    description: {
      fr: "Les articles fondateurs cités sur ce site, avec leurs liens DOI et arXiv, les crédits des images et la méthode de vérification.",
      en: "The foundational papers cited on this site with their DOI and arXiv links, image credits and how facts are checked.",
    },
    kind: "reference",
  },
  teachers: {
    path: { fr: "/enseignants", en: "/en/teachers" },
    title: {
      fr: "Trous noirs en classe : ressources pour les enseignants",
      en: "Black holes in the classroom: resources for teachers",
    },
    navLabel: { fr: "Enseignants", en: "Teachers" },
    description: {
      fr: "Activités prêtes à l'emploi autour des trous noirs : ordres de grandeur, dilatation des durées, lecture d'une image EHT.",
      en: "Ready-to-use activities about black holes: orders of magnitude, time dilation, reading an EHT image.",
    },
    kind: "reference",
  },
} as const satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof PAGES;

export const TOPIC_KEYS = ["blackHoles", "fallingIn", "hawking", "paradox", "waves"] as const;
export const TOOL_KEYS = ["calculator", "scale", "quiz"] as const;
export const REFERENCE_KEYS = ["glossary", "sources", "teachers"] as const;

export function pagePath(key: PageKey, locale: Locale): string {
  return PAGES[key].path[locale];
}

export function findPageByPath(pathname: string): { key: PageKey; locale: Locale } | null {
  const clean = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  for (const key of Object.keys(PAGES) as PageKey[]) {
    for (const locale of ["fr", "en"] as const) {
      if (PAGES[key].path[locale] === clean) return { key, locale };
    }
  }
  return null;
}
