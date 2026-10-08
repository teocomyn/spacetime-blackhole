// hls.js n'est téléchargé que pour un flux HLS sur un navigateur qui ne le lit pas nativement (Safari le lit seul).
export function attachVideoSource(
  video: HTMLVideoElement,
  src: string,
  onAttached: () => void
): () => void {
  let cancelled = false;
  let destroyHls: (() => void) | null = null;

  if (src.includes(".m3u8") && !video.canPlayType("application/vnd.apple.mpegurl")) {
    void import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      const hls = new Hls({ enableWorker: true, capLevelToPlayerSize: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      destroyHls = () => hls.destroy();
      onAttached();
    });
  } else {
    video.src = src;
    onAttached();
  }

  return () => {
    cancelled = true;
    destroyHls?.();
    video.removeAttribute("src");
    video.load();
  };
}
