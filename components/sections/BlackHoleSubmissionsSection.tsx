"use client";

import { useCallback, useState } from "react";
import BackgroundVideo from "@/components/media/BackgroundVideo";
import PhenomenonModal from "@/components/ui/PhenomenonModal";
import { BLACKHOLE_VIDEOS, PHENOMENON_VIDEOS } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

type PhenomenonCard = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
};

function HexCard({
  card,
  onOpen,
}: {
  card: PhenomenonCard;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(card.id)}
      className="group relative block h-[5em] w-full max-w-[20em] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon
          points="14,0 100,0 100,86 86,100 0,100 0,14"
          fill="none"
          stroke="rgba(255, 120, 40, 0.28)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="transition-colors group-hover:stroke-accent-orange/60"
        />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="px-4 text-center text-white">
          <p className="text-[13px] font-semibold leading-tight">{card.title}</p>
          <p className="text-[12px] font-normal leading-tight text-white/70">{card.subtitle}</p>
        </div>
      </div>
    </button>
  );
}

export default function BlackHoleSubmissionsSection() {
  const { locale } = useApp();
  const t = useTranslation(locale);
  const [activeId, setActiveId] = useState<string | null>(null);

  const allCards = [...t.phenomena.leftCards, ...t.phenomena.rightCards];
  const active = allCards.find((c) => c.id === activeId) ?? null;

  const close = useCallback(() => setActiveId(null), []);

  return (
    <section
      id="phenomena"
      className="relative z-[70] flex min-h-screen flex-col justify-center overflow-hidden bg-[#030305] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,100,30,0.08),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-start justify-center gap-10 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="order-2 flex flex-col items-center gap-4 lg:order-1 lg:mt-36 lg:items-start">
          {t.phenomena.leftCards.map((card) => (
            <HexCard key={card.id} card={card} onOpen={setActiveId} />
          ))}
        </div>

        <div className="order-1 flex flex-1 flex-col items-center justify-start lg:order-2">
          <div className="flex flex-col items-center gap-2 uppercase text-accent-orange">
            <span className="text-xs tracking-[0.24em] text-white/50">{t.phenomena.label}</span>
            <h2 className="font-sans text-[44px] font-semibold tracking-tight text-white sm:text-[54px]">
              {t.phenomena.title}
            </h2>
          </div>
          <div className="relative mt-6 h-[220px] w-[220px] sm:mt-8 sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px]">
            <div className="absolute -inset-4 rounded-full bg-accent-orange/10 blur-3xl" />
            <BackgroundVideo
              src={BLACKHOLE_VIDEOS.horizonMp4}
              className="relative h-full w-full object-cover ring-1 ring-white/10"
              lazy
            />
          </div>
        </div>

        <div className="order-3 flex flex-col items-center gap-4 lg:mt-36 lg:items-end">
          {t.phenomena.rightCards.map((card) => (
            <HexCard key={card.id} card={card} onOpen={setActiveId} />
          ))}
        </div>
      </div>

      {active && (
        <PhenomenonModal
          open={Boolean(activeId)}
          onClose={close}
          title={active.title}
          subtitle={active.subtitle}
          body={active.body}
          videoSrc={PHENOMENON_VIDEOS[active.id]}
          closeLabel={t.phenomena.closeModal}
        />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 sm:h-56"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,3,5,0) 0%, rgba(3,3,5,0.7) 60%, #030305 100%)",
        }}
      />
    </section>
  );
}
