import TopicLayout from "@/components/topic/TopicLayout";
import MediaBadge from "@/components/topic/MediaBadge";
import type { Locale } from "@/context/AppContext";
import { BIBLIOGRAPHY, OBSERVATION_SOURCES } from "@/lib/content";
import { ISSUES_URL } from "@/lib/ui";

export default function SourcesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <TopicLayout
      pageKey="sources"
      locale={locale}
      kicker={fr ? "[ méthode ]" : "[ method ]"}
      intro={
        fr
          ? "Ce site vulgarise, mais ne simplifie pas au point de déformer. Voici d'où viennent les chiffres, comment ils sont vérifiés et ce qui, à l'écran, est réel ou illustré."
          : "This site popularises without simplifying to the point of distortion. Here is where the numbers come from, how they are checked, and what on screen is real or illustrated."
      }
      related={["glossary", "teachers", "blackHoles", "paradox"]}
    >
      <h2>{fr ? "Comment les faits sont vérifiés" : "How facts are checked"}</h2>
      <ul>
        <li>
          {fr
            ? "Chaque chiffre d'observation renvoie à un article publié ou à une source institutionnelle (NASA, ESO, collaborations EHT, LIGO et Virgo, satellite Gaia)."
            : "Every observational figure points to a published paper or an institutional source (NASA, ESO, the EHT, LIGO and Virgo collaborations, the Gaia satellite)."}
        </li>
        <li>
          {fr
            ? "Les valeurs calculées (rayons, températures, durées) utilisent les constantes CODATA 2018 et sont contrôlées sur des cas connus, comme les 2,95 km de rayon d'un trou noir d'une masse solaire."
            : "Computed values (radii, temperatures, durations) use CODATA 2018 constants and are checked against known cases, such as the 2.95 km radius of a one-solar-mass black hole."}
        </li>
        <li>
          {fr
            ? "Quand une valeur est incertaine ou débattue, elle est présentée avec sa fourchette, et les hypothèses sont formulées au conditionnel."
            : "When a value is uncertain or debated, it is given with its range, and hypotheses are phrased as such."}
        </li>
      </ul>

      <h2>{fr ? "Réel, calculé ou illustré" : "Real, computed or illustrated"}</h2>
      <div className="not-prose my-6 space-y-4 text-sm leading-relaxed text-text-secondary">
        <p className="flex flex-wrap items-center gap-3">
          <MediaBadge kind="real" locale={locale} />
          {fr
            ? "Les images de M87* et de Sgr A* sont celles de l'Event Horizon Telescope, publiées par l'ESO sous licence CC BY 4.0 (crédit : EHT Collaboration), affichées sans modification."
            : "The images of M87* and Sgr A* are the Event Horizon Telescope's, published by ESO under CC BY 4.0 (credit: EHT Collaboration), shown unmodified."}
        </p>
        <p className="flex flex-wrap items-center gap-3">
          <MediaBadge kind="artistic" locale={locale} />
          {fr
            ? "Les vidéos d'ambiance de l'expérience sont des illustrations artistiques : elles évoquent les trous noirs sans en être des images réelles ni des simulations."
            : "The ambient videos in the experience are artistic illustrations: they evoke black holes without being real images or simulations of them."}
        </p>
        <p className="flex flex-wrap items-center gap-3">
          <MediaBadge kind="synthesized" locale={locale} />
          {fr
            ? "Le « chirp » de GW150914 est calculé dans votre navigateur à partir d'un modèle simplifié. Les enregistrements officiels sont disponibles auprès du Gravitational Wave Open Science Center."
            : "The GW150914 chirp is computed in your browser from a simplified model. Official recordings are available from the Gravitational Wave Open Science Center."}
        </p>
        <p>
          {fr
            ? "Le rendu de la lentille gravitationnelle suit la trajectoire réelle des rayons lumineux autour d'un trou noir de Schwarzschild ; seules les couleurs et la texture du disque sont stylisées. La simulation de réseau de qubits est une métaphore pédagogique, pas un calcul physique."
            : "The gravitational lensing render follows the real paths of light rays around a Schwarzschild black hole; only the disk's colours and texture are stylised. The qubit network simulation is a teaching metaphor, not a physics calculation."}
        </p>
      </div>

      <h2>{fr ? "Relecture scientifique" : "Scientific review"}</h2>
      <p>
        {fr
          ? "Ce site est un projet de vulgarisation indépendant. Il n'a pas encore été relu par un physicien professionnel. Si vous êtes chercheuse ou chercheur et souhaitez le relire, ou si vous repérez une erreur, "
          : "This site is an independent popular-science project. It has not yet been reviewed by a professional physicist. If you are a researcher willing to review it, or if you spot a mistake, "}
        <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
          {fr ? "ouvrez un ticket sur GitHub" : "open an issue on GitHub"}
        </a>
        {fr ? " : chaque correction sera vérifiée et créditée sur cette page." : ": every correction will be checked and credited on this page."}
      </p>

      <h2>{fr ? "Articles fondateurs" : "Foundational papers"}</h2>
      <ul className="not-prose space-y-3">
        {BIBLIOGRAPHY.map((item) => (
          <li key={item.id} className="rounded-xl border border-white/5 bg-bg-secondary/40 p-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              <span className="text-accent-blue">{item.year}</span>
              <span className="ml-3 text-xs uppercase tracking-wider text-text-muted">{item.authors}</span>
              <span className="mt-1 block text-white group-hover:text-accent-cyan">{item.title}</span>
              <span className="mt-1 block text-xs text-text-dim">{item.venue}</span>
            </a>
          </li>
        ))}
      </ul>

      <h2>{fr ? "Observations et données" : "Observations and data"}</h2>
      <ul>
        {Object.values(OBSERVATION_SOURCES).map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <h2>{fr ? "Crédits techniques" : "Technical credits"}</h2>
      <p>
        {fr
          ? "Police Inter (SIL Open Font License), rendu 3D avec three.js et React Three Fiber, animations avec Framer Motion et GSAP. Le code source est public sur GitHub."
          : "Inter typeface (SIL Open Font License), 3D rendering with three.js and React Three Fiber, animations with Framer Motion and GSAP. The source code is public on GitHub."}
      </p>
    </TopicLayout>
  );
}
