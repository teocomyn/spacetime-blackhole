"use client";

import BackgroundVideo from "@/components/media/BackgroundVideo";
import { BLACKHOLE_VIDEOS } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

function CapCardShade({ heavy = false }: { heavy?: boolean }) {
  return (
    <div
      className="cap-cardshade pointer-events-none absolute inset-0"
      style={{
        background: heavy
          ? "linear-gradient(180deg, rgb(5 12 14 / 0.3), transparent 34%), linear-gradient(0deg, rgb(5 12 14 / 0.78), transparent 48%)"
          : "linear-gradient(180deg, rgb(5 12 14 / 0.18), transparent 34%), linear-gradient(0deg, rgb(5 12 14 / 0.32), transparent 56%)",
      }}
    />
  );
}

function CapLabel({ children, left }: { children: React.ReactNode; left?: boolean }) {
  return (
    <p
      className={`relative z-[1] text-[11px] font-bold uppercase tracking-[0.18em] text-white/78 ${
        left ? "" : "flex justify-center p-6"
      }`}
    >
      {children}
    </p>
  );
}

export default function BlackHoleCapabilitiesSection() {
  const { locale } = useApp();
  const t = useTranslation(locale);

  return (
    <section
      id="horizons"
      className="capabilities relative z-[70] min-h-screen bg-[#050608] px-[clamp(16px,3.8vw,72px)] py-[clamp(34px,4vw,72px)] text-white"
    >
      <header className="capabilities__header mx-auto mb-[clamp(24px,3vw,42px)] flex max-w-[1820px] flex-col items-start justify-between gap-8 lg:flex-row lg:gap-8">
        <div className="max-w-[860px]">
          <h2 className="m-0 max-w-[920px] font-sans text-[clamp(29px,3.2vw,54px)] font-light leading-[1.08] tracking-[-0.02em] text-white">
            {t.capabilities.title}
          </h2>
          <p className="mt-[18px] max-w-[760px] font-sans text-[clamp(14px,1vw,17px)] font-normal leading-[1.62] text-white/55">
            {t.capabilities.subtitle}
          </p>
        </div>
        <a
          href="#phenomena"
          className="capabilities__button inline-flex min-h-[48px] shrink-0 items-center gap-2.5 self-start rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12),0_18px_44px_rgb(0_0_0_/_0.35)] backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          {t.capabilities.cta}
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="capabilities__grid mx-auto grid min-h-[clamp(620px,72vh,780px)] max-w-[1820px] grid-cols-1 gap-[clamp(14px,1.25vw,22px)] lg:grid-cols-2 xl:grid-cols-3">
        {/* Column 1 — tall video + timeline */}
        <div className="capabilities__stack grid gap-[clamp(14px,1.25vw,22px)]">
          <article className="cap-card cap-card--tall cap-card--media relative min-h-[560px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0a0c10] shadow-[0_22px_60px_rgb(0_0_0_/_0.45)] lg:min-h-[620px] xl:min-h-0 xl:row-span-2">
            <BackgroundVideo
              src={BLACKHOLE_VIDEOS.accretionHls}
              className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
            />
            <CapCardShade heavy />
            <CapLabel>{t.capabilities.labelProgram}</CapLabel>
            <div className="cap-cardtimeline absolute bottom-5 left-5 right-5 z-[1] grid gap-3">
              {t.capabilities.timeline.map((row) => (
                <div
                  key={row.year}
                  className="grid grid-cols-[52px_14px_minmax(0,1fr)] items-center gap-2.5 text-xs text-white/76 sm:grid-cols-[58px_16px_minmax(0,1fr)_auto]"
                >
                  <span>{row.year}</span>
                  <span className="h-[5px] w-[5px] rounded-full bg-white/62" />
                  <span className="text-[clamp(13px,0.95vw,15px)] font-semibold text-white">
                    {row.program}
                  </span>
                  <span className="hidden text-white/58 sm:block">{row.note}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Column 2 — quote + metric */}
        <div className="capabilities__stack grid grid-rows-[minmax(210px,0.74fr)_minmax(270px,1fr)] gap-[clamp(14px,1.25vw,22px)]">
          <article className="cap-card cap-card--quote flex flex-col justify-between rounded-[18px] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6">
            <CapLabel left>{t.capabilities.labelVoice}</CapLabel>
            <blockquote className="my-[clamp(22px,2.4vw,34px)] mb-5 font-sans text-[clamp(15px,1vw,18px)] leading-[1.62] text-white/85">
              {t.capabilities.quote}
            </blockquote>
            <footer>
              <cite className="block font-sans text-[15px] not-italic text-white">
                {t.capabilities.quoteAuthor}
              </cite>
              <p className="mt-1 font-sans text-sm leading-normal text-white/50">
                {t.capabilities.quoteRole}
              </p>
            </footer>
          </article>

          <article className="cap-card cap-card--metric cap-card--video-panel relative block min-h-[320px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0a0c10]">
            <BackgroundVideo
              src={BLACKHOLE_VIDEOS.collapseMp4}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <CapCardShade heavy />
            <div className="cap-cardmetric absolute inset-0 z-[1] text-center">
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[clamp(72px,7.4vw,134px)] font-extralight leading-[0.9] text-white drop-shadow-[0_12px_32px_rgb(0_0_0_/_0.3)]">
                {t.capabilities.metric}
              </p>
              <p className="absolute bottom-6 left-6 right-6 font-sans text-[clamp(14px,1.05vw,18px)] leading-snug text-white/82">
                {t.capabilities.metricLabel}
              </p>
            </div>
          </article>
        </div>

        {/* Column 3 — marquee + contact */}
        <div className="capabilities__stack capabilitiesstack--systems grid gap-[clamp(14px,1.25vw,22px)] lg:col-span-2 lg:grid-cols-2 lg:grid-rows-[minmax(260px,1fr)_auto] xl:col-span-1 xl:grid-cols-1 xl:grid-rows-[minmax(420px,1.45fr)_auto]">
          <article className="cap-card cap-card--tools cap-card--tools-media cap-card--video-panel relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[18px] border border-white/[0.08] xl:min-h-[420px]">
            <BackgroundVideo
              src={BLACKHOLE_VIDEOS.wormholeHls}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <CapCardShade />
            <CapLabel>{t.capabilities.labelSystems}</CapLabel>
            <div className="tool-marquee relative z-[1] grid gap-3.5 overflow-hidden px-0 pb-2 pt-6 [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]">
              <div className="tool-marquee__row flex w-max animate-marquee-left gap-3">
                {[...t.capabilities.toolsRow1, ...t.capabilities.toolsRow1].map((tag, i) => (
                  <span
                    key={`r1-${tag}-${i}`}
                    className="inline-flex min-h-[54px] items-center gap-2 rounded-[14px] border border-white/20 bg-white/[0.12] px-4 text-[13px] font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.24)] backdrop-blur-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="tool-marquee__row flex w-max animate-marquee-right gap-3">
                {[...t.capabilities.toolsRow2, ...t.capabilities.toolsRow2].map((tag, i) => (
                  <span
                    key={`r2-${tag}-${i}`}
                    className="inline-flex min-h-[54px] items-center gap-2 rounded-[14px] border border-white/20 bg-white/[0.12] px-4 text-[13px] font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.24)] backdrop-blur-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="cap-card cap-card--contact relative flex min-h-[118px] flex-row items-center justify-between gap-5 rounded-[18px] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] py-5 pl-6 pr-[76px]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                {t.capabilities.labelReach}
              </p>
              <a
                href="https://github.com/teocomyn/spacetime-blackhole"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 block font-sans text-[clamp(18px,1.45vw,24px)] font-normal text-white hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                {t.capabilities.link}
              </a>
              <p className="mt-1.5 font-sans text-sm leading-normal text-white/50">
                {t.capabilities.linkSub}
              </p>
            </div>
            <a
              href="https://github.com/teocomyn/spacetime-blackhole"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.capabilities.linkAria}
              className="absolute right-4 top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white text-black transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              ↗
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
