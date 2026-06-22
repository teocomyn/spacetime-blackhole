"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion, MotionValue, useTransform } from "framer-motion";
import { BLACKHOLE_VIDEOS, HERO_VIDEO_HLS } from "@/lib/constants";
import { useApp } from "@/context/AppContext";

function useHlsVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  src: string,
  enabled: boolean
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    if (src.includes(".m3u8")) {
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
  }, [src, enabled, videoRef]);
}

interface Props {
  scrollProgress: MotionValue<number>;
}

export default function HeroVideoCrossfade({ scrollProgress }: Props) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, reducedEffects } = useApp();

  const opacityA = useTransform(scrollProgress, [0, 0.45, 0.85], [1, 0.35, 0]);
  const opacityB = useTransform(scrollProgress, [0, 0.35, 0.75], [0, 0.65, 1]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.08]);

  const enabled = !reducedMotion && !reducedEffects;
  useHlsVideo(videoARef, HERO_VIDEO_HLS, enabled);
  useHlsVideo(videoBRef, BLACKHOLE_VIDEOS.accretionHls, enabled);

  if (!enabled) return null;

  return (
    <motion.div style={{ scale }} className="absolute inset-0 z-[1]">
      <motion.video
        ref={videoARef}
        style={{ opacity: opacityA }}
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <motion.video
        ref={videoBRef}
        style={{ opacity: opacityB }}
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    </motion.div>
  );
}
