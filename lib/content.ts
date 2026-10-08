export const BIBLIOGRAPHY = [
  {
    id: "penrose-1965",
    year: "1965",
    authors: "Roger Penrose",
    title: "Gravitational collapse and space-time singularities",
    venue: "Physical Review Letters 14, 57",
    url: "https://doi.org/10.1103/PhysRevLett.14.57",
  },
  {
    id: "bekenstein-1973",
    year: "1973",
    authors: "Jacob Bekenstein",
    title: "Black holes and entropy",
    venue: "Physical Review D 7, 2333",
    url: "https://doi.org/10.1103/PhysRevD.7.2333",
  },
  {
    id: "hawking-1974",
    year: "1974",
    authors: "Stephen Hawking",
    title: "Black hole explosions?",
    venue: "Nature 248, 30",
    url: "https://doi.org/10.1038/248030a0",
  },
  {
    id: "hawking-1975",
    year: "1975",
    authors: "Stephen Hawking",
    title: "Particle creation by black holes",
    venue: "Communications in Mathematical Physics 43, 199",
    url: "https://doi.org/10.1007/BF02345020",
  },
  {
    id: "maldacena-1997",
    year: "1997",
    authors: "Juan Maldacena",
    title: "The Large N limit of superconformal field theories and supergravity",
    venue: "Adv. Theor. Math. Phys. · arXiv:hep-th/9711200",
    url: "https://arxiv.org/abs/hep-th/9711200",
  },
  {
    id: "ryu-takayanagi-2006",
    year: "2006",
    authors: "Shinsei Ryu & Tadashi Takayanagi",
    title: "Holographic derivation of entanglement entropy from AdS/CFT",
    venue: "Physical Review Letters · arXiv:hep-th/0603001",
    url: "https://arxiv.org/abs/hep-th/0603001",
  },
  {
    id: "swingle-2009",
    year: "2009",
    authors: "Brian Swingle",
    title: "Entanglement renormalization and holography",
    venue: "Physical Review D 86, 065007 · arXiv:0905.1317",
    url: "https://arxiv.org/abs/0905.1317",
  },
  {
    id: "van-raamsdonk-2010",
    year: "2010",
    authors: "Mark Van Raamsdonk",
    title: "Building up spacetime with quantum entanglement",
    venue: "Gen. Rel. Grav. 42, 2323 · arXiv:1005.3035",
    url: "https://arxiv.org/abs/1005.3035",
  },
  {
    id: "verlinde-2010",
    year: "2010",
    authors: "Erik Verlinde",
    title: "On the origin of gravity and the laws of Newton",
    venue: "JHEP · arXiv:1001.0785",
    url: "https://arxiv.org/abs/1001.0785",
  },
  {
    id: "maldacena-susskind-2013",
    year: "2013",
    authors: "Juan Maldacena & Leonard Susskind",
    title: "Cool horizons for entangled black holes (ER = EPR)",
    venue: "Fortschritte der Physik · arXiv:1306.0533",
    url: "https://arxiv.org/abs/1306.0533",
  },
  {
    id: "almheiri-dong-harlow-2014",
    year: "2014",
    authors: "Ahmed Almheiri, Xi Dong & Daniel Harlow",
    title: "Bulk locality and quantum error correction in AdS/CFT",
    venue: "JHEP 2015, 163 · arXiv:1411.7041",
    url: "https://arxiv.org/abs/1411.7041",
  },
  {
    id: "pastawski-2015",
    year: "2015",
    authors: "Pastawski, Yoshida, Harlow & Preskill",
    title: "Holographic quantum error-correcting codes",
    venue: "JHEP · arXiv:1503.06237",
    url: "https://arxiv.org/abs/1503.06237",
  },
  {
    id: "penington-2019",
    year: "2019",
    authors: "Geoffrey Penington",
    title: "Entanglement wedge reconstruction and the information paradox",
    venue: "arXiv:1905.08255",
    url: "https://arxiv.org/abs/1905.08255",
  },
  {
    id: "almheiri-2019",
    year: "2019",
    authors: "Almheiri, Engelhardt, Marolf & Maxfield",
    title: "The entropy of bulk quantum fields and the entanglement wedge of an evaporating black hole",
    venue: "arXiv:1905.08762",
    url: "https://arxiv.org/abs/1905.08762",
  },
] as const;

export const GLOSSARY = [
  {
    id: "horizon",
    termFr: "Horizon des événements",
    termEn: "Event horizon",
    defFr:
      "Frontière d'un trou noir au-delà de laquelle rien, pas même la lumière, ne peut ressortir. Ce n'est pas une surface matérielle : un observateur en chute libre la traverse sans rien remarquer localement.",
    defEn:
      "The boundary of a black hole beyond which nothing, not even light, can escape. It is not a material surface: a freely falling observer crosses it without noticing anything locally.",
  },
  {
    id: "singularite",
    termFr: "Singularité",
    termEn: "Singularity",
    defFr:
      "Région où la relativité générale prédit une courbure infinie et cesse de s'appliquer. Penrose (1965) a montré que, sous des hypothèses générales, un effondrement gravitationnel y conduit inévitablement. Une théorie quantique de la gravité devrait la remplacer.",
    defEn:
      "A region where general relativity predicts infinite curvature and stops applying. Penrose (1965) showed that, under general assumptions, gravitational collapse inevitably leads to one. A quantum theory of gravity should replace it.",
  },
  {
    id: "sphere-photons",
    termFr: "Sphère de photons",
    termEn: "Photon sphere",
    defFr:
      "Région située à 1,5 fois le rayon de l'horizon (pour un trou noir sans rotation) où la lumière peut tourner en orbite. Elle délimite l'« ombre » du trou noir observée par l'Event Horizon Telescope.",
    defEn:
      "A region at 1.5 times the horizon radius (for a non-rotating black hole) where light can orbit. It outlines the black hole \"shadow\" observed by the Event Horizon Telescope.",
  },
  {
    id: "disque-accretion",
    termFr: "Disque d'accrétion",
    termEn: "Accretion disk",
    defFr:
      "Disque de gaz qui spirale vers le trou noir. Chauffé à des millions de degrés par frottement, il émet des rayons X et rend visible un objet qui, lui, n'émet rien.",
    defEn:
      "A disk of gas spiralling into the black hole. Heated to millions of degrees by friction, it emits X-rays and makes visible an object that emits nothing itself.",
  },
  {
    id: "forces-maree",
    termFr: "Forces de marée",
    termEn: "Tidal forces",
    defFr:
      "Différence d'attraction entre deux points d'un même corps. Près d'un trou noir de masse stellaire, elle étire les objets en longueur : c'est la « spaghettification ».",
    defEn:
      "The difference in gravitational pull between two points of the same body. Near a stellar-mass black hole, it stretches objects lengthwise: \"spaghettification\".",
  },
  {
    id: "rayonnement-hawking",
    termFr: "Rayonnement de Hawking",
    termEn: "Hawking radiation",
    defFr:
      "Rayonnement thermique émis par un trou noir sous l'effet de la mécanique quantique (Hawking, 1974). Sa température est inversement proportionnelle à la masse : un trou noir stellaire est plus froid que le fond diffus cosmologique.",
    defEn:
      "Thermal radiation emitted by a black hole because of quantum mechanics (Hawking, 1974). Its temperature is inversely proportional to the mass: a stellar black hole is colder than the cosmic microwave background.",
  },
  {
    id: "entropie-bh",
    termFr: "Entropie de Bekenstein-Hawking",
    termEn: "Bekenstein-Hawking entropy",
    defFr:
      "S = A/4 en unités de Planck : l'entropie d'un trou noir est proportionnelle à l'aire de son horizon, pas à son volume. C'est le premier indice du principe holographique.",
    defEn:
      "S = A/4 in Planck units: a black hole's entropy is proportional to its horizon area, not its volume. It is the first hint of the holographic principle.",
  },
  {
    id: "paradoxe-information",
    termFr: "Paradoxe de l'information",
    termEn: "Information paradox",
    defFr:
      "Si un trou noir s'évapore en rayonnement purement thermique, l'information sur ce qui y est tombé semble détruite, ce que la mécanique quantique interdit. Ce conflit guide la recherche depuis 1976.",
    defEn:
      "If a black hole evaporates into purely thermal radiation, the information about what fell in seems destroyed, which quantum mechanics forbids. This conflict has driven research since 1976.",
  },
  {
    id: "courbe-page",
    termFr: "Courbe de Page",
    termEn: "Page curve",
    defFr:
      "Évolution attendue de l'entropie du rayonnement de Hawking si l'information est préservée : elle croît, puis redescend après le « temps de Page », quand le trou noir a perdu environ la moitié de son entropie. Des calculs de 2019 utilisant des « îlots » l'ont retrouvée.",
    defEn:
      "The expected evolution of the entropy of Hawking radiation if information is preserved: it rises, then falls after the \"Page time\", once the black hole has lost about half its entropy. 2019 calculations using \"islands\" reproduced it.",
  },
  {
    id: "firewall",
    termFr: "Firewall (mur de feu)",
    termEn: "Firewall",
    defFr:
      "Hypothèse (Almheiri, Marolf, Polchinski, Sully, 2012) selon laquelle préserver l'information imposerait un mur d'énergie à l'horizon, contredisant le principe d'équivalence. ER = EPR est l'une des réponses proposées.",
    defEn:
      "A proposal (Almheiri, Marolf, Polchinski, Sully, 2012) that preserving information would require a wall of energy at the horizon, contradicting the equivalence principle. ER = EPR is one of the proposed answers.",
  },
  {
    id: "intrication",
    termFr: "Intrication",
    termEn: "Entanglement",
    defFr:
      "Corrélation quantique entre deux systèmes, si forte qu'ils ne peuvent plus être décrits indépendamment, même à distance.",
    defEn:
      "Quantum correlation between two systems so strong they can no longer be described independently, even at a distance.",
  },
  {
    id: "decoherence",
    termFr: "Décohérence",
    termEn: "Decoherence",
    defFr:
      "Perte de la superposition quantique par interaction avec l'environnement : l'information quantique devient classique.",
    defEn:
      "Loss of quantum superposition through interaction with the environment: quantum information becomes classical.",
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
      "Conjecture liant les trous de ver d'Einstein-Rosen (ER) aux paires intriquées (EPR) : l'intrication serait un raccourci géométrique.",
    defEn:
      "Conjecture linking Einstein-Rosen wormholes (ER) to EPR entangled pairs: entanglement would be a geometric shortcut.",
  },
  {
    id: "holographie",
    termFr: "Principe holographique",
    termEn: "Holographic principle",
    defFr:
      "L'information d'un volume d'espace peut être encodée sur sa surface, comme un hologramme en 2D encode une scène 3D.",
    defEn:
      "Information in a volume of space can be encoded on its boundary, like a 2D hologram encoding a 3D scene.",
  },
  {
    id: "de-sitter",
    termFr: "De Sitter / Anti-de Sitter",
    termEn: "De Sitter / Anti-de Sitter",
    defFr:
      "Deux types de courbure cosmologique : de Sitter (positive, notre univers en expansion accélérée) et Anti-de Sitter (négative, où l'holographie est la mieux maîtrisée).",
    defEn:
      "Two cosmological curvatures: de Sitter (positive, our accelerating universe) and Anti-de Sitter (negative, where holography is best understood).",
  },
] as const;

export type GlossaryId = (typeof GLOSSARY)[number]["id"];
