export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackhole.the42laws.fr"
).replace(/\/$/, "");

export const HERO_VIDEO_HLS =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

// Miniatures servies gratuitement par Mux pour chaque identifiant de lecture public.
export const HERO_VIDEO_POSTER =
  "https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/thumbnail.webp?time=1&width=1280";

export const BLACKHOLE_VIDEOS = {
  accretionHls:
    "https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8",
  accretionPoster:
    "https://image.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE/thumbnail.webp?time=1&width=1280",
  singularityMp4:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
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
