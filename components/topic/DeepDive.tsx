"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { ui } from "@/lib/ui";

// Le contenu reste dans le HTML dans les deux niveaux (lisible par les moteurs) : seul l'état ouvert change.
export default function DeepDive({ title, children }: { title: string; children: ReactNode }) {
  const { locale, readingLevel } = useApp();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.open = readingLevel === "deep";
  }, [readingLevel]);

  return (
    <details
      ref={ref}
      className="group my-8 rounded-2xl border border-accent-blue/20 bg-accent-blue/[0.04] open:bg-accent-blue/[0.06]"
    >
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center gap-3 px-5 py-3 font-sans text-sm text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan [&::-webkit-details-marker]:hidden">
        <span className="rounded-full border border-accent-cyan/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
          {ui(locale).deepDive}
        </span>
        <span className="font-medium text-white">{title}</span>
        <span aria-hidden="true" className="ml-auto transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="prose-space px-5 pb-5">{children}</div>
    </details>
  );
}
