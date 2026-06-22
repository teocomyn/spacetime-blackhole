"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useApp } from "@/context/AppContext";

interface Props {
  src: string;
  className?: string;
  poster?: string;
}

export default function BackgroundVideo({ src, className = "", poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, reducedEffects } = useApp();
  const isHls = src.includes(".m3u8");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || reducedEffects) return;

    if (isHls) {
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
      return () => hls.destroy();
    }

    video.src = src;
    void video.play().catch(() => {});
  }, [src, isHls, reducedMotion, reducedEffects]);

  if (reducedMotion || reducedEffects) {
    return (
      <div
        className={`bg-[radial-gradient(circle_at_center,rgba(255,120,40,0.15),transparent_70%)] ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-hidden="true"
    />
  );
}
