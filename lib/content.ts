export const BIBLIOGRAPHY = [
  {
    id: "hawking-1975",
    year: "1974–1975",
    authors: "Stephen Hawking",
    title: "Black hole explosions?",
    venue: "Nature / Commun. Math. Phys.",
    url: "https://arxiv.org/abs/hep-th/0507171",
  },
  {
    id: "bekenstein-1973",
    year: "1973",
    authors: "Jacob Bekenstein",
    title: "Black holes and entropy",
    venue: "Physical Review D",
    url: "https://arxiv.org/abs/gr-qc/0211048",
  },
  {
    id: "maldacena-1997",
    year: "1997",
    authors: "Juan Maldacena",
    title: "The Large N limit of superconformal field theories and supergravity",
    venue: "Adv. Theor. Math. Phys.",
    url: "https://arxiv.org/abs/hep-th/9711200",
  },
  {
    id: "ryu-takayanagi-2006",
    year: "2006",
    authors: "Shinsei Ryu & Tadashi Takayanagi",
    title: "Holographic derivation of entanglement entropy from AdS/CFT",
    venue: "Physical Review Letters",
    url: "https://arxiv.org/abs/hep-th/0603001",
  },
  {
    id: "verlinde-2010",
    year: "2010",
    authors: "Erik Verlinde",
    title: "On the origin of gravity and the laws of Newton",
    venue: "JHEP",
    url: "https://arxiv.org/abs/1001.0785",
  },
  {
    id: "maldacena-susskind-2013",
    year: "2013",
    authors: "Juan Maldacena & Leonard Susskind",
    title: "Cool horizons for entangled black holes (ER = EPR)",
    venue: "Fortschritte der Physik",
    url: "https://arxiv.org/abs/1306.0533",
  },
  {
    id: "pastawski-2015",
    year: "2015",
    authors: "Pastawski et al.",
    title: "Holographic quantum error-correcting codes",
    venue: "JHEP",
    url: "https://arxiv.org/abs/1503.06237",
  },
] as const;

export const GLOSSARY = [
  {
    id: "intrication",
    termFr: "Intrication",
    termEn: "Entanglement",
    defFr:
      "Corrélation quantique entre deux systèmes, si forte qu'ils ne peuvent plus être décrits indépendamment — même à distance.",
    defEn:
      "Quantum correlation between two systems so strong they can no longer be described independently — even at a distance.",
  },
  {
    id: "decoherence",
    termFr: "Décohérence",
    termEn: "Decoherence",
    defFr:
      "Perte de la superposition quantique par interaction avec l'environnement — l'information quantique devient classique.",
    defEn:
      "Loss of quantum superposition through environmental interaction — quantum information becomes classical.",
  },
  {
    id: "ads-cft",
    termFr: "AdS/CFT",
    termEn: "AdS/CFT",
    defFr:
      "Correspondance holographique : une théorie gravitationnelle dans un espace Anti-de Sitter est équivalente à une théorie quantique sans gravité sur sa frontière.",
    defEn:
      "Holographic correspondence: a gravitational theory in Anti-de Sitter space is equivalent to a non-gravitational quantum theory on its boundary.",
  },
  {
    id: "er-epr",
    termFr: "ER = EPR",
    termEn: "ER = EPR",
    defFr:
      "Conjecture liant les trous de ver d'Einstein-Rosen (ER) aux paires intriquées (EPR) : l'intrication est un raccourci géométrique.",
    defEn:
      "Conjecture linking Einstein-Rosen wormholes (ER) to EPR entangled pairs: entanglement is a geometric shortcut.",
  },
  {
    id: "holographie",
    termFr: "Principe holographique",
    termEn: "Holographic principle",
    defFr:
      "L'information d'un volume d'espace peut être encodée sur sa surface — comme un hologramme en 2D encode une scène 3D.",
    defEn:
      "Information in a volume of space can be encoded on its boundary — like a 2D hologram encoding a 3D scene.",
  },
  {
    id: "de-sitter",
    termFr: "De Sitter / Anti-de Sitter",
    termEn: "De Sitter / Anti-de Sitter",
    defFr:
      "Deux types de courbure cosmologique : de Sitter (positive, notre univers accéléré) vs Anti-de Sitter (négative, où l'holographie est mieux maîtrisée).",
    defEn:
      "Two cosmological curvatures: de Sitter (positive, our accelerating universe) vs Anti-de Sitter (negative, where holography is best understood).",
  },
] as const;
