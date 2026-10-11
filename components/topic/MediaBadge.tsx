import type { Locale } from "@/context/AppContext";
import { ui } from "@/lib/ui";

export type MediaKind = "real" | "artistic" | "synthesized" | "computed";

export default function MediaBadge({
  kind,
  locale,
  className = "",
}: {
  kind: MediaKind;
  locale: Locale;
  className?: string;
}) {
  const t = ui(locale);
  const label =
    kind === "real" ? t.realImage : kind === "artistic" ? t.artistic : kind === "computed" ? t.computed : t.synthesized;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${kind === "real" || kind === "computed" ? "bg-accent-cyan" : "bg-white/40"}`}
      />
      {label}
    </span>
  );
}
