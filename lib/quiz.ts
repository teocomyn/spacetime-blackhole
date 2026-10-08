type Localized = { fr: string; en: string };

export type QuizQuestion = {
  id: string;
  question: Localized;
  choices: Localized[];
  answer: number;
  explanation: Localized;
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "horizon",
    question: {
      fr: "Qu'est-ce qui définit l'horizon des événements d'un trou noir ?",
      en: "What defines a black hole's event horizon?",
    },
    choices: [
      { fr: "Une surface solide très dense", en: "A very dense solid surface" },
      { fr: "La frontière au-delà de laquelle même la lumière ne peut plus ressortir", en: "The boundary beyond which not even light can escape" },
      { fr: "Le bord du disque de gaz lumineux", en: "The edge of the glowing gas disk" },
    ],
    answer: 1,
    explanation: {
      fr: "L'horizon n'est pas une surface matérielle : c'est une frontière dans l'espace-temps. Une fois franchie, toutes les trajectoires mènent vers l'intérieur, lumière comprise.",
      en: "The horizon is not a material surface: it is a boundary in spacetime. Once crossed, every path leads inward, light included.",
    },
  },
  {
    id: "sun-orbit",
    question: {
      fr: "Si le Soleil était remplacé par un trou noir de même masse, que deviendrait l'orbite de la Terre ?",
      en: "If the Sun were replaced by a black hole of the same mass, what would happen to Earth's orbit?",
    },
    choices: [
      { fr: "La Terre serait aspirée", en: "Earth would be sucked in" },
      { fr: "La Terre serait éjectée", en: "Earth would be flung away" },
      { fr: "Elle resterait identique", en: "It would stay the same" },
    ],
    answer: 2,
    explanation: {
      fr: "À distance, la gravité ne dépend que de la masse. Un trou noir n'« aspire » pas plus qu'une étoile de même masse : la Terre continuerait de tourner, mais dans le froid et le noir.",
      en: "From a distance, gravity depends only on mass. A black hole does not \"suck\" more than a star of the same mass: Earth would keep orbiting, in cold and darkness.",
    },
  },
  {
    id: "earth-size",
    question: {
      fr: "Quelle taille ferait la Terre si on la comprimait en trou noir ?",
      en: "How big would Earth be if it were squeezed into a black hole?",
    },
    choices: [
      { fr: "Celle d'une bille (environ 1,8 cm de diamètre)", en: "A marble (about 1.8 cm across)" },
      { fr: "Celle d'un ballon de football", en: "A football" },
      { fr: "Celle d'une ville", en: "A city" },
    ],
    answer: 0,
    explanation: {
      fr: "Le rayon de Schwarzschild vaut 2GM/c². Pour la masse de la Terre, il est d'environ 8,9 mm, soit un diamètre de 1,8 cm.",
      en: "The Schwarzschild radius is 2GM/c². For Earth's mass it is about 8.9 mm, so a diameter of 1.8 cm.",
    },
  },
  {
    id: "hawking-who",
    question: {
      fr: "Qui a montré, en 1974, que les trous noirs émettent un rayonnement ?",
      en: "Who showed, in 1974, that black holes emit radiation?",
    },
    choices: [
      { fr: "Stephen Hawking", en: "Stephen Hawking" },
      { fr: "Albert Einstein", en: "Albert Einstein" },
      { fr: "Karl Schwarzschild", en: "Karl Schwarzschild" },
    ],
    answer: 0,
    explanation: {
      fr: "En appliquant la mécanique quantique près de l'horizon, Hawking a montré qu'un trou noir rayonne comme un corps chaud. Einstein est mort en 1955 et Schwarzschild en 1916.",
      en: "By applying quantum mechanics near the horizon, Hawking showed that a black hole radiates like a hot body. Einstein died in 1955 and Schwarzschild in 1916.",
    },
  },
  {
    id: "temperature",
    question: {
      fr: "Plus un trou noir est massif, plus sa température de Hawking est…",
      en: "The more massive a black hole, the more its Hawking temperature is…",
    },
    choices: [
      { fr: "élevée", en: "high" },
      { fr: "la même, quelle que soit la masse", en: "the same whatever the mass" },
      { fr: "basse", en: "low" },
    ],
    answer: 2,
    explanation: {
      fr: "La température est inversement proportionnelle à la masse. Un trou noir de la masse du Soleil est à environ 60 milliardièmes de kelvin ; seuls de minuscules trous noirs seraient chauds.",
      en: "Temperature is inversely proportional to mass. A Sun-mass black hole sits at about 60 billionths of a kelvin; only tiny black holes would be hot.",
    },
  },
  {
    id: "first-image",
    question: {
      fr: "Quel est le premier trou noir dont on a obtenu une image ?",
      en: "Which black hole was the first ever imaged?",
    },
    choices: [
      { fr: "Sgr A*, au centre de notre galaxie", en: "Sgr A*, at the centre of our galaxy" },
      { fr: "M87*, au cœur de la galaxie M87", en: "M87*, at the heart of the galaxy M87" },
      { fr: "Cygnus X-1", en: "Cygnus X-1" },
    ],
    answer: 1,
    explanation: {
      fr: "L'Event Horizon Telescope a publié l'image de M87* en avril 2019, puis celle de Sgr A* en mai 2022.",
      en: "The Event Horizon Telescope released the image of M87* in April 2019, then Sgr A* in May 2022.",
    },
  },
  {
    id: "first-gw",
    question: {
      fr: "Qu'a détecté LIGO le 14 septembre 2015 ?",
      en: "What did LIGO detect on 14 September 2015?",
    },
    choices: [
      { fr: "L'explosion d'une supernova", en: "A supernova explosion" },
      { fr: "Le rayonnement de Hawking d'un trou noir", en: "Hawking radiation from a black hole" },
      { fr: "Les ondes gravitationnelles de deux trous noirs qui fusionnent", en: "Gravitational waves from two merging black holes" },
    ],
    answer: 2,
    explanation: {
      fr: "Le signal GW150914 venait de deux trous noirs d'environ 36 et 29 masses solaires. C'était la première détection directe d'ondes gravitationnelles, récompensée par le prix Nobel 2017.",
      en: "The GW150914 signal came from two black holes of about 36 and 29 solar masses. It was the first direct detection of gravitational waves, recognised by the 2017 Nobel Prize.",
    },
  },
  {
    id: "fall-supermassive",
    question: {
      fr: "En tombant dans un trou noir supermassif, que ressentez-vous au moment de franchir l'horizon ?",
      en: "Falling into a supermassive black hole, what do you feel as you cross the horizon?",
    },
    choices: [
      { fr: "Rien de particulier", en: "Nothing special" },
      { fr: "Un mur de feu", en: "A wall of fire" },
      { fr: "Vous êtes étiré en spaghetti", en: "You are stretched like spaghetti" },
    ],
    answer: 0,
    explanation: {
      fr: "Pour un trou noir de plusieurs millions de masses solaires, les forces de marée à l'horizon sont faibles. Vous le traversez sans rien remarquer localement ; la spaghettification vient plus tard, près du centre.",
      en: "For a black hole of millions of solar masses, tidal forces at the horizon are weak. You cross it without noticing anything locally; spaghettification comes later, near the centre.",
    },
  },
  {
    id: "entropy",
    question: {
      fr: "L'entropie d'un trou noir (l'information qu'il peut contenir) est proportionnelle à…",
      en: "A black hole's entropy (the information it can hold) is proportional to…",
    },
    choices: [
      { fr: "son volume", en: "its volume" },
      { fr: "sa température", en: "its temperature" },
      { fr: "l'aire de son horizon", en: "the area of its horizon" },
    ],
    answer: 2,
    explanation: {
      fr: "C'est la formule S = A/4 de Bekenstein et Hawking. Que l'information se mesure à la surface et non au volume a inspiré le principe holographique.",
      en: "This is the Bekenstein-Hawking formula S = A/4. The fact that information scales with surface rather than volume inspired the holographic principle.",
    },
  },
  {
    id: "nearest",
    question: {
      fr: "À quelle distance se trouve le trou noir connu le plus proche de la Terre ?",
      en: "How far away is the nearest known black hole?",
    },
    choices: [
      { fr: "Environ 4 années-lumière", en: "About 4 light-years" },
      { fr: "Environ 1 560 années-lumière", en: "About 1,560 light-years" },
      { fr: "Environ 27 000 années-lumière", en: "About 27,000 light-years" },
    ],
    answer: 1,
    explanation: {
      fr: "Gaia BH1, découvert en 2022 grâce au satellite Gaia, tourne autour d'une étoile semblable au Soleil dans la constellation d'Ophiuchus. Sgr A*, au centre de la Galaxie, est bien plus loin.",
      en: "Gaia BH1, found in 2022 with the Gaia satellite, orbits a Sun-like star in the constellation Ophiuchus. Sgr A*, at the centre of the Galaxy, is much farther away.",
    },
  },
];
