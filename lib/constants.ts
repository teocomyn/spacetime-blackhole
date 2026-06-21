export const SITE_URL = "https://emergent-spacetime.vercel.app";

export const HERO_VIDEO_HLS =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const SECTIONS = [
  { id: "hero", labelFr: "Accueil", labelEn: "Home" },
  { id: "problem", labelFr: "Conflit", labelEn: "Conflict" },
  { id: "intuition", labelFr: "Intuition", labelEn: "Intuition" },
  { id: "simulation", labelFr: "Simulation", labelEn: "Simulation" },
  { id: "timeline", labelFr: "Timeline", labelEn: "Timeline" },
  { id: "unknowns", labelFr: "Inconnus", labelEn: "Unknowns" },
  { id: "bibliography", labelFr: "Sources", labelEn: "Sources" },
  { id: "glossary", labelFr: "Glossaire", labelEn: "Glossary" },
] as const;

export const SIM_MODES = [
  "entanglement",
  "blackhole",
  "wormhole",
  "decoherence",
] as const;
