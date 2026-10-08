import type { ReactNode } from "react";

export default function Eq({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="my-6 rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-center">
      <div className="font-serif text-[clamp(1.15rem,2.4vw,1.5rem)] italic tracking-wide text-white">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 font-sans text-xs not-italic leading-relaxed text-text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
