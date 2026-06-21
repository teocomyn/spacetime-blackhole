"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { HERO_VIDEO_HLS } from "@/lib/constants";
import { useApp } from "@/context/AppContext";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, reducedEffects } = useApp();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || reducedEffects) return;

    const src = HERO_VIDEO_HLS;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      void video.play().catch(() => {});
      return;
    }

    if (!Hls.isSupported()) return;

    const hls = new Hls({ enableWorker: true });
    hls.loadSource(src);
    hls.attachMedia(video);
    void video.play().catch(() => {});

    return () => {
      hls.destroy();
    };
  }, [reducedMotion, reducedEffects]);

  if (reducedMotion || reducedEffects) return null;

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 z-[1] h-full w-full object-cover opacity-40 mix-blend-screen"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  );
}
