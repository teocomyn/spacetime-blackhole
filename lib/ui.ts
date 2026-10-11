import type { Locale } from "@/context/AppContext";

export const UI = {
  fr: {
    menu: "Menu",
    closeMenu: "Fermer le menu",
    groupTopics: "Comprendre",
    groupTools: "Outils interactifs",
    groupReference: "Références",
    readingLevel: "Niveau de lecture",
    discover: "Découvrir",
    deep: "Approfondir",
    deepDive: "Approfondir",
    faqTitle: "Questions fréquentes",
    sourcesTitle: "Sources",
    relatedTitle: "Pour continuer",
    breadcrumbHome: "Accueil",
    reportError: "Signaler une erreur",
    reportErrorHint: "Une imprécision ? Ouvrez un ticket sur GitHub, chaque correction est vérifiée et créditée.",
    credits: "Réalisé par",
    realImage: "Image réelle",
    artistic: "Illustration artistique",
    synthesized: "Son synthétisé",
    computed: "Rendu physique en temps réel",
    cursorHintFine: "Bougez la souris : votre curseur courbe la lumière comme un trou noir.",
    cursorHintTouch: "Touchez l'écran : votre doigt courbe la lumière comme un trou noir.",
    updated: "Mis à jour le",
    readingTime: (minutes: number) => `${minutes} min de lecture`,
    backToExperience: "Revenir à l'expérience",
    exploreKicker: "[ aller plus loin ]",
    exploreTitle: "Explorer les trous noirs",
    exploreSubtitle:
      "Des pages pour comprendre en détail, des outils pour manipuler les ordres de grandeur, et des ressources pour la classe.",
    resumeLabel: "Reprendre la lecture",
    resumeDismiss: "Ignorer",
    experienceLength: "≈ 15 min · 11 chapitres",
    seeFullGlossary: "Voir les 16 définitions",
    seeAllSources: "Toutes les sources et la méthode",
  },
  en: {
    menu: "Menu",
    closeMenu: "Close menu",
    groupTopics: "Understand",
    groupTools: "Interactive tools",
    groupReference: "Reference",
    readingLevel: "Reading level",
    discover: "Discover",
    deep: "Go deeper",
    deepDive: "Go deeper",
    faqTitle: "Frequently asked questions",
    sourcesTitle: "Sources",
    relatedTitle: "Keep exploring",
    breadcrumbHome: "Home",
    reportError: "Report an error",
    reportErrorHint: "Spotted an inaccuracy? Open an issue on GitHub; every correction is checked and credited.",
    credits: "Built by",
    realImage: "Real image",
    artistic: "Artistic illustration",
    synthesized: "Synthesized sound",
    computed: "Real-time physics render",
    cursorHintFine: "Move your mouse: your cursor bends light like a black hole.",
    cursorHintTouch: "Touch the screen: your finger bends light like a black hole.",
    updated: "Updated",
    readingTime: (minutes: number) => `${minutes} min read`,
    backToExperience: "Back to the experience",
    exploreKicker: "[ go further ]",
    exploreTitle: "Explore black holes",
    exploreSubtitle:
      "Pages to understand in depth, tools to play with orders of magnitude, and resources for the classroom.",
    resumeLabel: "Resume reading",
    resumeDismiss: "Dismiss",
    experienceLength: "≈ 15 min · 11 chapters",
    seeFullGlossary: "See all 16 definitions",
    seeAllSources: "All sources and method",
  },
} as const;

export function ui(locale: Locale) {
  return UI[locale];
}

export const ISSUES_URL = "https://github.com/teocomyn/spacetime-blackhole/issues/new";

export function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
