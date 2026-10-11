"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

const BackdropCanvas = dynamic(() => import("@/components/three/lensing/BackdropCanvas"), { ssr: false });

// Sections dont le fond est transparent : le trou noir n'est rendu que lorsque l'une d'elles est à l'écran.
const SEE_THROUGH = ["hero", "timeline", "unknowns", "bibliography", "glossary", "singularity"];

export default function SpacetimeBackdrop() {
  const { reducedEffects, reducedMotion } = useApp();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(visible.size > 0);
      },
      { threshold: 0 }
    );
    for (const id of SEE_THROUGH) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  if (reducedEffects) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-black" aria-hidden="true">
      <BackdropCanvas active={active} animate={!reducedMotion} />
    </div>
  );
}
