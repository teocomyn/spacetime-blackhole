"use client";

import { motion, type MotionValue } from "framer-motion";

interface Props {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function EmergenceRing({ opacity, scale }: Props) {
  return (
    <motion.div
      style={{ opacity, scale }}
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative flex h-[min(88vw,560px)] w-[min(88vw,560px)] items-center justify-center">
        {/* Singularity glow */}
        <div className="absolute inset-[28%] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.14)_0%,rgba(60,160,255,0.06)_40%,transparent_72%)] blur-2xl" />
        <div className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(255,100,40,0.08)_0%,transparent_70%)] blur-xl" />

        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,229,255,0.55)" />
              <stop offset="50%" stopColor="rgba(60,160,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,120,40,0.25)" />
            </linearGradient>
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Einstein ring arcs */}
          <ellipse
            cx="200"
            cy="200"
            rx="168"
            ry="52"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.8"
            transform="rotate(-18 200 200)"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="168"
            ry="52"
            stroke="rgba(60,160,255,0.12)"
            strokeWidth="0.6"
            transform="rotate(22 200 200)"
          />

          {/* Outer orbit ring */}
          <circle
            cx="200"
            cy="200"
            r="165"
            stroke="url(#ringGrad)"
            strokeWidth="0.6"
            opacity="0.45"
          />

          {/* Dashed entanglement ring — rotates via CSS */}
          <g className="origin-center animate-[spin_90s_linear_infinite]" style={{ transformOrigin: "200px 200px" }}>
            <circle
              cx="200"
              cy="200"
              r="138"
              stroke="rgba(0,229,255,0.22)"
              strokeWidth="0.5"
              strokeDasharray="2 10"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = 200 + 138 * Math.cos(rad);
              const y = 200 + 138 * Math.sin(rad);
              return (
                <circle key={deg} cx={x} cy={y} r="2.2" fill="rgba(0,229,255,0.7)" />
              );
            })}
          </g>

          {/* Counter-rotating inner ring */}
          <g className="origin-center animate-[spin_45s_linear_infinite_reverse]" style={{ transformOrigin: "200px 200px" }}>
            <circle
              cx="200"
              cy="200"
              r="108"
              stroke="rgba(60,160,255,0.28)"
              strokeWidth="0.8"
              strokeDasharray="1 6"
            />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = 200 + 108 * Math.cos(rad);
              const y = 200 + 108 * Math.sin(rad);
              return (
                <circle key={deg} cx={x} cy={y} r="1.8" fill="rgba(255,255,255,0.55)" />
              );
            })}
          </g>

          {/* Event horizon */}
          <circle
            cx="200"
            cy="200"
            r="78"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            filter="url(#ringGlow)"
          />
          <circle cx="200" cy="200" r="74" fill="rgba(0,0,0,0.55)" />
          <circle
            cx="200"
            cy="200"
            r="74"
            stroke="rgba(0,229,255,0.15)"
            strokeWidth="0.5"
          />

          {/* Photon sphere pulse */}
          <circle
            cx="200"
            cy="200"
            r="88"
            stroke="rgba(255,120,40,0.2)"
            strokeWidth="0.4"
            className="animate-pulse"
          />
        </svg>
      </div>
    </motion.div>
  );
}
