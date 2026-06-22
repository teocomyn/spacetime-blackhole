"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useApp } from "@/context/AppContext";
import { useIntersectionActive } from "@/hooks/useIntersectionActive";

interface Props {
  src: string;
  className?: string;
  poster?: string;
  lazy?: boolean;
  playbackRate?: number;
}

export default function BackgroundVideo({
  src,
  className = "",
  poster,
  lazy = false,
  playbackRate = 1,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, reducedEffects } = useApp();
  const isHls = src.includes(".m3u8");
  const isVisible = useIntersectionActive(containerRef, 0.08);
  const shouldPlay = !lazy || isVisible;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || reducedEffects || !shouldPlay) return;

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
  }, [src, isHls, reducedMotion, reducedEffects, shouldPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay || reducedMotion || reducedEffects) {
      video.pause();
    } else if (video.src || video.currentSrc) {
      void video.play().catch(() => {});
    }
  }, [shouldPlay, reducedMotion, reducedEffects]);

  if (reducedMotion || reducedEffects) {
    return (
      <div
        ref={lazy ? containerRef : undefined}
        className={`bg-[radial-gradient(circle_at_center,rgba(255,120,40,0.15),transparent_70%)] ${className}`}
        aria-hidden="true"
      />
    );
  }

  const videoEl = (
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

  if (lazy) {
    return (
      <div ref={containerRef} className="relative h-full w-full">
        {videoEl}
      </div>
    );
  }

  return videoEl;
}
