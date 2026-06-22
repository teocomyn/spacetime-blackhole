export const SITE_URL = "https://emergent-spacetime.vercel.app";

export const HERO_VIDEO_HLS =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const BLACKHOLE_VIDEOS = {
  accretionHls:
    "https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8",
  wormholeHls:
    "https://stream.mux.com/PkFsoKeakRLgL01gjf02CRcSbsJ600Z00NvLr9eRZ92pLbA.m3u8",
  collapseMp4:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4",
  horizonMp4:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4",
  singularityMp4:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
} as const;

export const PHENOMENON_VIDEOS: Record<string, string> = {
  horizon: BLACKHOLE_VIDEOS.horizonMp4,
  accretion: BLACKHOLE_VIDEOS.accretionHls,
  lensing: BLACKHOLE_VIDEOS.collapseMp4,
  paradox: BLACKHOLE_VIDEOS.singularityMp4,
  hawking: BLACKHOLE_VIDEOS.wormholeHls,
  wormhole: BLACKHOLE_VIDEOS.wormholeHls,
};

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
  { id: "horizons", labelFr: "Horizons", labelEn: "Horizons" },
  { id: "phenomena", labelFr: "Phénomènes", labelEn: "Phenomena" },
] as const;

export const SIM_MODES = [
  "entanglement",
  "blackhole",
  "wormhole",
  "decoherence",
] as const;
