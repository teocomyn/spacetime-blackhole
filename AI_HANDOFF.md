# AI Handoff

Updated: 2026-10-08
Agent/tool: Claude Code
Branch: main (poussé sur origin avec l'accord explicite de Teo)

## Completed

- Audit du 2026-10-07 corrigé et déployé (commit 082fcc6) : URL canonique, sources, performance, accessibilité.
- Architecture bilingue : `app/(fr)` et `app/(en)/en`, langue portée par l'URL, hreflang, sitemap de 24 URL, métadonnées et images de partage par langue.
- Pages : trous noirs, tomber dedans, rayonnement de Hawking, paradoxe de l'information, ondes gravitationnelles, calculateur, comparateur, quiz, glossaire, sources et méthode, enseignants (FR et EN).
- Outils : calculateur, comparateur d'échelle, quiz rééquilibré, courbe de Page interactive, synthétiseur du chirp GW150914, séquence de chute avec lentille gravitationnelle en GLSL (correction d'aberration de l'observateur immobile).
- Accueil : section Horizons remplacée par « Observés » (images EHT créditées, chirp, Gaia BH1/BH3), section « Explorer », durée et chapitres, reprise de lecture, badges « illustration artistique », posters Mux, vidéos coupées en mode économie de données, simulation « trou noir » rendue par le shader.
- Faits vérifiés par recherche (EHT, LIGO, Gaia, TON 618, programme de terminale 2019) et références contrôlées sur arXiv et doi.org.
- `docs/diffusion.md` : procédure Search Console et brouillons de diffusion.

## Validation

- `npx tsc --noEmit` OK, `npx next lint` sans avertissement, `npm run build` OK (33 pages statiques).
- Build testé en local avec Chrome headless : toutes les pages répondent 200 avec la bonne langue et le bon lien vers la traduction ; images de partage et icônes présentes sur chaque page ; calculateur, quiz (10 questions), comparateur mobile sans débordement, rendu de la lentille de loin et près de l'horizon, mode trou noir de la simulation, images EHT chargées.

## Uncommitted or sensitive areas

- `.claude/launch.json` (configuration locale de prévisualisation) n'est pas suivi par Git.

## Blockers and decisions needed

- Search Console : créer la propriété et définir `GOOGLE_SITE_VERIFICATION` sur Vercel (compte de Teo).
- Diffusion : publier les brouillons de `docs/diffusion.md` depuis les comptes de Teo.
- Relecture scientifique par un physicien, à créditer sur `/sources`.
- Héberger le MP4 de la Singularité sur Mux ; éventuellement auto-héberger les images EHT.
- Montée de version vers Next 16 (alerte `npm audit`).
- Outil d'audience : à choisir après vérification du prix et du RGPD.

## Next concrete action

- Vérifier la production après déploiement, puis lancer Search Console et soumettre le sitemap.
