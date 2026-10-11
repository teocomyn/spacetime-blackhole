"use client";

import type { PointerEvent } from "react";

// Gestionnaires à poser sur un élément portant la classe .tilt : les variables CSS suivent le pointeur.
export function useTilt(max = 8) {
  return {
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (event.pointerType !== "mouse") return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--glare", "1");
    },
    onPointerLeave(event: PointerEvent<HTMLElement>) {
      const el = event.currentTarget;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--glare", "0");
    },
  };
}
