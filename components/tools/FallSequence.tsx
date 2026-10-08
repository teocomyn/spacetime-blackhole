"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useIntersectionActive } from "@/hooks/useIntersectionActive";
import { SOLAR_MASS, formatDuration, formatLength, formatNumber, maxProperTimeToSingularity, schwarzschildRadius, tidalAccelerationAtHorizon, tidalRadius } from "@/lib/physics";

const LensingCanvas = dynamic(() => import("@/components/three/lensing/LensingCanvas"), { ssr: false });

type Kind = "stellar" | "supermassive";
const MASSES: Record<Kind, number> = { stellar: 10 * SOLAR_MASS, supermassive: 4.3e6 * SOLAR_MASS };

function numbers(kind: Kind, locale: "fr" | "en") {
  const m = MASSES[kind];
  const rs = schwarzschildRadius(m);
  const spaghetti = tidalRadius(m, 2, 1000);
  return {
    rs: formatLength(rs, locale),
    spaghetti: formatLength(spaghetti, locale),
    spaghettiRatio: formatNumber(spaghetti / rs, locale, 2),
    tideAtHorizon: formatNumber(tidalAccelerationAtHorizon(m, 2) / 9.81, locale, 2),
    tau: formatDuration(maxProperTimeToSingularity(m), locale),
    outside: spaghetti > rs,
  };
}

const TEXT = {
  fr: {
    toggle: "Type de trou noir",
    stellar: "Stellaire (10 masses solaires)",
    supermassive: "Supermassif (Sgr A*)",
    beats: (n: ReturnType<typeof numbers>) => [
      {
        title: "À 30 fois le rayon de l'horizon",
        body: `L'horizon ne mesure que ${n.rs} de rayon, mais il déforme déjà tout le ciel. La lumière du disque situé derrière le trou noir passe au-dessus et en dessous de lui : c'est la lentille gravitationnelle, calculée ici rayon par rayon.`,
      },
      {
        title: "Les forces de marée",
        body: n.outside
          ? `Vos pieds sont plus attirés que votre tête. Dès ${n.spaghetti} du centre, soit ${n.spaghettiRatio} fois le rayon de l'horizon, l'écart dépasse 100 g : vous êtes étiré en spaghetti bien avant d'atteindre l'horizon.`
          : `Pour un trou noir aussi massif, la marée reste douce : à l'horizon, l'écart entre votre tête et vos pieds n'est que de ${n.tideAtHorizon} g. Vous ne sentez rien de particulier.`,
      },
      {
        title: "Vu de loin, vous vous figez",
        body: "Un ami resté à distance vous voit ralentir, rougir puis vous figer au bord de l'horizon, de plus en plus pâle. La dilatation du temps devient infinie à l'horizon : il ne vous voit jamais le franchir.",
      },
      {
        title: "Le passage de l'horizon",
        body: "Pour vous, le franchissement prend un temps fini et rien ne le signale localement. Le ciel se concentre en un disque lumineux de plus en plus petit, puis la dernière lumière de l'Univers extérieur s'efface.",
      },
      {
        title: "Vers la singularité",
        body: `À l'intérieur, toutes les directions du futur mènent au centre. La singularité n'est plus un lieu devant vous mais un instant de votre avenir, atteint au plus ${n.tau} après l'horizon.`,
      },
    ],
    note: "Rendu calculé pour un observateur immobile à chaque distance. Un observateur en chute libre verrait le ciel un peu moins comprimé (aberration de la lumière). Les durées et distances sont calculées pour un trou noir de Schwarzschild, sans rotation.",
  },
  en: {
    toggle: "Black hole type",
    stellar: "Stellar (10 solar masses)",
    supermassive: "Supermassive (Sgr A*)",
    beats: (n: ReturnType<typeof numbers>) => [
      {
        title: "At 30 times the horizon radius",
        body: `The horizon is only ${n.rs} in radius, yet it already warps the whole sky. Light from the disk behind the black hole passes above and below it: gravitational lensing, computed here ray by ray.`,
      },
      {
        title: "Tidal forces",
        body: n.outside
          ? `Your feet are pulled harder than your head. From ${n.spaghetti} from the centre, ${n.spaghettiRatio} times the horizon radius, the difference exceeds 100 g: you are stretched into spaghetti long before reaching the horizon.`
          : `For such a massive black hole the tide stays gentle: at the horizon, the difference between your head and feet is only ${n.tideAtHorizon} g. You feel nothing special.`,
      },
      {
        title: "Seen from afar, you freeze",
        body: "A friend watching from a distance sees you slow down, redden, then freeze at the edge of the horizon, fading away. Time dilation becomes infinite at the horizon: they never see you cross it.",
      },
      {
        title: "Crossing the horizon",
        body: "For you, crossing takes a finite time and nothing marks it locally. The sky shrinks into a smaller and smaller bright disk, then the last light from the outside Universe fades.",
      },
      {
        title: "Towards the singularity",
        body: `Inside, every future direction leads to the centre. The singularity is no longer a place ahead of you but a moment in your future, reached at most ${n.tau} after the horizon.`,
      },
    ],
    note: "Rendered for an observer hovering at each distance. A freely falling observer would see the sky slightly less compressed (aberration of light). Durations and distances are for a non-rotating Schwarzschild black hole.",
  },
} as const;

const BEAT_RANGES: [number, number, number, number][] = [
  [0, 0.02, 0.14, 0.2],
  [0.2, 0.25, 0.34, 0.39],
  [0.39, 0.44, 0.54, 0.6],
  [0.6, 0.65, 0.84, 0.89],
  [0.9, 0.93, 0.99, 1.01],
];

// De 30 à 2 rayons d'horizon, puis une approche finale étirée jusqu'à 1,02 :
// c'est là que le ciel visible se contracte en un disque lumineux.
function distanceAt(p: number) {
  if (p < 0.6) return 30 * Math.pow(2 / 30, p / 0.6);
  return 2 * Math.pow(1.02 / 2, Math.min((p - 0.6) / 0.3, 1));
}

function Beat({ progress, range, title, body }: { progress: ReturnType<typeof useScroll>["scrollYProgress"]; range: [number, number, number, number]; title: string; body: string }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [24, 0]);
  // Le centrage vit sur un conteneur fixe : la transformation animée de Framer écraserait un translate CSS.
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-[12vh] flex justify-center">
      <motion.div
        style={{ opacity, y }}
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-md"
      >
        <h3 className="font-sans text-xl font-light text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{body}</p>
      </motion.div>
    </div>
  );
}

export default function FallSequence() {
  const { locale, reducedMotion, reducedEffects } = useApp();
  const t = TEXT[locale];
  const [kind, setKind] = useState<Kind>("supermassive");
  const [maxSteps, setMaxSteps] = useState(180);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionActive(ref, 0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const distance = useTransform(scrollYProgress, distanceAt);
  const blackout = useTransform(scrollYProgress, [0.89, 0.94], [0, 1]);
  const beats = t.beats(numbers(kind, locale));

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) setMaxSteps(120);
  }, []);

  const toggle = (
    <div role="radiogroup" aria-label={t.toggle} className="flex flex-wrap gap-2">
      {(["supermassive", "stellar"] as const).map((k) => (
        <button
          key={k}
          type="button"
          role="radio"
          aria-checked={kind === k}
          onClick={() => setKind(k)}
          className={`min-h-[40px] rounded-full border px-4 text-xs backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
            kind === k ? "border-accent-cyan/50 bg-accent-cyan/15 text-accent-cyan" : "border-white/15 bg-black/40 text-text-secondary hover:text-white"
          }`}
        >
          {k === "stellar" ? t.stellar : t.supermassive}
        </button>
      ))}
    </div>
  );

  if (reducedEffects) {
    return (
      <div className="not-prose my-10 space-y-6">
        {toggle}
        <ol className="space-y-4">
          {beats.map((beat) => (
            <li key={beat.title} className="rounded-2xl border border-white/10 bg-bg-secondary/50 p-5">
              <h3 className="font-sans text-lg text-white">{beat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{beat.body}</p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-text-muted">{t.note}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="not-prose relative left-1/2 my-12 h-[520vh] w-screen -translate-x-1/2">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <LensingCanvas distance={distance} active={inView} animate={!reducedMotion} maxSteps={maxSteps} />
        </div>
        <motion.div style={{ opacity: blackout }} className="pointer-events-none absolute inset-0 bg-black" />
        <div className="absolute left-4 right-4 top-20 flex justify-center">{toggle}</div>
        <div aria-hidden="true">
          {beats.map((beat, i) => (
            <Beat key={beat.title} progress={scrollYProgress} range={BEAT_RANGES[i]} title={beat.title} body={beat.body} />
          ))}
        </div>
        <p className="absolute bottom-3 left-4 right-4 text-center text-[10px] leading-snug text-white/40">{t.note}</p>
      </div>
      <ol className="sr-only">
        {beats.map((beat) => (
          <li key={beat.title}>
            <h3>{beat.title}</h3>
            <p>{beat.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
