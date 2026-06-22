"use client";

import { useState } from "react";
import BackgroundVideo from "@/components/media/BackgroundVideo";

interface Props {
  src: string;
  className?: string;
  lazy?: boolean;
}

export default function VideoLayer({
  src,
  className = "absolute inset-0 h-full w-full scale-[1.02] object-cover transition-transform duration-700 group-hover:scale-110",
  lazy = true,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <BackgroundVideo
          src={src}
          className={className}
          lazy={lazy}
          playbackRate={hovered ? 1.6 : 1}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-accent-deep/0 transition-colors duration-500 group-hover:bg-accent-deep/[0.08]" />
    </>
  );
}
