"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { attachVideoSource } from "@/lib/attachVideoSource";
import { useHasEntered, useIntersectionActive } from "@/hooks/useIntersectionActive";

interface Props {
  src: string;
  className?: string;
  wrapperClassName?: string;
  poster?: string;
  lazy?: boolean;
  playbackRate?: number;
}

export default function BackgroundVideo({
  src,
  className = "",
  wrapperClassName = "absolute inset-0",
  poster,
  lazy = true,
  playbackRate = 1,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, reducedEffects, saveData } = useApp();
  const enabled = !reducedMotion && !reducedEffects && !saveData;

  const isVisible = useIntersectionActive(containerRef, 0, "200px 0px");
  const visibleRef = useRef(isVisible);
  visibleRef.current = isVisible;
  const hasEntered = useHasEntered(isVisible);
  const shouldLoad = enabled && (!lazy || hasEntered);

  // Attache la source une seule fois, puis la lecture suit la visibilité.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    return attachVideoSource(video, src, () => {
      if (visibleRef.current) void video.play().catch(() => {});
    });
  }, [src, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (isVisible) void video.play().catch(() => {});
    else video.pause();
  }, [src, isVisible, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  // Le conteneur reste le même élément dans les deux cas pour que l'observateur de visibilité le suive.
  return (
    <div ref={containerRef} className={wrapperClassName}>
      {enabled ? (
        <video
          ref={videoRef}
          className={className}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
        />
      ) : (
        <div
          className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(45,90,140,0.15),transparent_70%)]"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
