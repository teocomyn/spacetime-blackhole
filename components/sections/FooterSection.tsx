"use client";

import AccretionParticles from "@/components/effects/AccretionParticles";
import BackgroundVideo from "@/components/media/BackgroundVideo";
import { BLACKHOLE_VIDEOS } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export default function FooterSection() {
  const { locale } = useApp();
  const t = useTranslation(locale);

  return (
    <section
      id="footer"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      <BackgroundVideo
        src={BLACKHOLE_VIDEOS.accretionHls}
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        lazy={false}
      />
      <AccretionParticles />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.88)_100%)]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/25 to-black/50" />

      <div className="relative z-10 px-4 text-center">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
          {t.footer.epilogue}
        </p>

        <h2 className="font-sans text-[clamp(2rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-white">
          {t.footer.line1}
          <br />
          <span className="text-white/55">{locale === "fr" ? "le contenant." : "the container."}</span>
        </h2>
        <h2 className="mt-2 font-sans text-[clamp(2rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-accent-orange">
          {t.footer.line2}
        </h2>

        <p className="mx-auto mt-10 max-w-lg font-sans text-lg leading-relaxed text-white/65">
          {t.footer.quote}
        </p>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                document.getElementById("simulation")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex min-h-[48px] items-center rounded-full border border-accent-orange/30 bg-accent-orange/10 px-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange backdrop-blur-md transition-colors hover:bg-accent-orange/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              {t.footer.replaySim}
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex min-h-[48px] items-center rounded-full border border-white/15 bg-white/[0.06] px-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              {t.footer.backTop}
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-2 font-sans text-[10px] uppercase tracking-wider text-white/40">
            <p>{t.footer.credits}</p>
            <p>
              {locale === "fr" ? "Développé par Teo Comyn." : "Built by Teo Comyn."}{" "}
              <a
                href="https://github.com/teocomyn/spacetime-blackhole"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                {t.footer.source}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
