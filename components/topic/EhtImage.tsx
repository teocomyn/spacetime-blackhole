import type { Locale } from "@/context/AppContext";
import MediaBadge from "@/components/topic/MediaBadge";

export const EHT_IMAGES = {
  m87: {
    src: "https://cdn.eso.org/images/publicationjpg/eso1907a.jpg",
    width: 4000,
    height: 2330,
    page: "https://www.eso.org/public/images/eso1907a/",
    alt: {
      fr: "Image de M87* par l'Event Horizon Telescope : un anneau lumineux orangé, plus brillant en bas, autour d'un disque sombre.",
      en: "Event Horizon Telescope image of M87*: a glowing orange ring, brighter at the bottom, around a dark disk.",
    },
    caption: {
      fr: "M87*, publiée le 10 avril 2019. Anneau de 42 microsecondes d'arc, trou noir de 6,5 milliards de masses solaires à 55 millions d'années-lumière.",
      en: "M87*, released 10 April 2019. A 42-microarcsecond ring around a 6.5-billion-solar-mass black hole 55 million light-years away.",
    },
  },
  sgrA: {
    src: "https://cdn.eso.org/images/publicationjpg/eso2208-eht-mwa.jpg",
    width: 4000,
    height: 4000,
    page: "https://www.eso.org/public/images/eso2208-eht-mwa/",
    alt: {
      fr: "Image de Sgr A* par l'Event Horizon Telescope : un anneau lumineux à trois zones brillantes autour d'un centre sombre.",
      en: "Event Horizon Telescope image of Sgr A*: a glowing ring with three bright spots around a dark centre.",
    },
    caption: {
      fr: "Sgr A*, publiée le 12 mai 2022. Le trou noir du centre de la Voie lactée : environ 4,3 millions de masses solaires, à 27 000 années-lumière.",
      en: "Sgr A*, released 12 May 2022. The black hole at the centre of the Milky Way: about 4.3 million solar masses, 27,000 light-years away.",
    },
  },
} as const;

export default function EhtImage({
  which,
  locale,
  className = "",
}: {
  which: keyof typeof EHT_IMAGES;
  locale: Locale;
  className?: string;
}) {
  const image = EHT_IMAGES[which];
  return (
    <figure className={`not-prose overflow-hidden rounded-2xl border border-white/10 bg-black ${className}`}>
      <div className="relative">
        {/* Image hébergée par l'ESO sous licence CC BY 4.0, affichée sans modification. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt[locale]}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <MediaBadge kind="real" locale={locale} className="absolute left-3 top-3" />
      </div>
      <figcaption className="space-y-1 border-t border-white/10 p-4 text-xs leading-relaxed text-text-secondary">
        <p>{image.caption[locale]}</p>
        <p className="text-text-muted">
          {locale === "fr" ? "Crédit : " : "Credit: "}
          <a href={image.page} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white">
            EHT Collaboration
          </a>{" "}
          ·{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/20 underline-offset-2 hover:text-white"
          >
            CC BY 4.0
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
