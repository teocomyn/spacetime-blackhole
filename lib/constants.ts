export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackhole.the42laws.fr"
).replace(/\/$/, "");

export const BLACKHOLE_VIDEOS = {
  accretionHls:
    "https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8",
  // Miniature servie gratuitement par Mux pour chaque identifiant de lecture public.
  accretionPoster:
    "https://image.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE/thumbnail.webp?time=1&width=1280",
} as const;

export const SECTIONS = [
  { id: "hero", labelFr: "Accueil", labelEn: "Home" },
  { id: "problem", labelFr: "Conflit", labelEn: "Conflict" },
  { id: "intuition", labelFr: "Intuition", labelEn: "Intuition" },
  { id: "simulation", labelFr: "Simulation", labelEn: "Simulation" },
  { id: "timeline", labelFr: "Timeline", labelEn: "Timeline" },
  { id: "unknowns", labelFr: "Inconnus", labelEn: "Unknowns" },
  { id: "bibliography", labelFr: "Sources", labelEn: "Sources" },
  { id: "glossary", labelFr: "Glossaire", labelEn: "Glossary" },
  { id: "singularity", labelFr: "Singularité", labelEn: "Singularity" },
  { id: "horizons", labelFr: "Observés", labelEn: "Observed" },
  { id: "explore", labelFr: "Explorer", labelEn: "Explore" },
] as const;

export const SIM_MODES = [
  "entanglement",
  "blackhole",
  "wormhole",
  "decoherence",
] as const;
