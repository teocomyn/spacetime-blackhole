# emergent-spacetime — AI Context

Updated: 2026-10-08

## Purpose

Site bilingue (FR/EN) de vulgarisation sur les trous noirs : une expérience immersive en scrollytelling sur l'espace-temps émergent, plus des pages thématiques, des outils interactifs et des ressources pour les enseignants. Projet personnel de Teo Comyn, vitrine et support de liens vers teocomyn.com et experaise.com.

## Project classification

content-only (prototype conservé). Aucune base de données, aucun compte utilisateur, aucune donnée personnelle.

## Architecture

- Next.js 14 App Router avec deux mises en page racines : `app/(fr)` (URL sans préfixe) et `app/(en)/en`. Les deux rendent `components/layout/RootShell.tsx`. La langue vient de l'URL, transmise à `AppProvider`.
- `lib/routes.ts` est la source unique des pages (chemins FR/EN, titres, descriptions, type). Les fichiers `page.tsx` des deux langues ne font qu'appeler un composant de `components/pages/` avec `locale`.
- Pages thématiques via `components/topic/TopicLayout.tsx` (en-tête, fil d'Ariane, FAQ, sources, pages liées, JSON-LD).
- Outils dans `components/tools/` ; calculs dans `lib/physics.ts` ; données de trous noirs dans `lib/blackHoles.ts` ; bibliographie, sources d'observation et glossaire dans `lib/content.ts`.
- Lentille gravitationnelle : `components/three/lensing/` (shader de lancer de rayons de Schwarzschild, avec correction d'aberration pour un observateur immobile). Utilisée par la page « tomber dedans » et le mode trou noir de la simulation.
- Images de partage et icônes servies par des routes fixes (`/social/fr`, `/social/en`, `/brand/icon`, `/brand/apple-icon`) depuis `lib/brandImages.tsx` : les fichiers `opengraph-image`/`icon` à la racine d'`app/` ne s'appliquent pas avec deux mises en page racines.
- Vidéos : flux HLS Mux (miniatures Mux en poster) et un MP4 sur un CloudFront tiers, via `components/media/BackgroundVideo.tsx` et `lib/attachVideoSource.ts` (hls.js importé à la demande).

## Infrastructure

- Dépôt : github.com/teocomyn/spacetime-blackhole (public), branche `main`.
- Hébergement : Vercel, production sur https://spacetime-blackhole.vercel.app. Un push sur `main` déploie en environ une minute.
- `emergent-spacetime.vercel.app` n'est PAS ce site : il sert une autre application (Rust/WASM).
- Variables optionnelles : `NEXT_PUBLIC_SITE_URL` (domaine personnalisé), `GOOGLE_SITE_VERIFICATION` (Search Console).

## Commands

- Install : `npm ci`
- Dev : `npm run dev`
- Lint : `npx next lint`
- Types : `npx tsc --noEmit`
- Build : `npm run build`, puis `npx next start -p 3100` pour tester le build (config `.claude/launch.json` locale)
- Deploy : push sur `main`, uniquement avec accord explicite.

## Stable decisions

- Chaque page existe en FR et en EN avec hreflang ; `x-default` pointe vers le FR.
- Le paramètre `?mode=` de la simulation n'est écrit qu'après une action du visiteur.
- Canvas 3D et vidéos ne tournent que proches de l'écran (IntersectionObserver + `frameloop`). Le rendu par lancer de rayons a une résolution plafonnée.
- Pas de zoom molette ni de contrôles tactiles sur la simulation, pour que la page reste défilable.
- Toute affirmation scientifique débattue est au conditionnel ; chaque chiffre d'observation a une source liée ; les médias portent un badge « image réelle », « illustration artistique » ou « son synthétisé ».
- Images EHT affichées sans recadrage ni modification, avec le crédit « EHT Collaboration » et la licence CC BY 4.0 à côté.
- L'ordre Glossaire puis Singularité sur l'accueil est volontaire : le glossaire est « aspiré » vers le trou noir.
- Pas d'outil d'audience tant que le prix et l'impact RGPD ne sont pas validés.

## Known risks and constraints

- Le MP4 de la section Singularité est servi depuis un CloudFront tiers (export Higgsfield) hors de notre contrôle.
- Les images EHT sont chargées depuis cdn.eso.org (lien direct) ; si l'URL change, elles disparaissent.
- Next 14 signalé « critique » par `npm audit` ; correction proposée uniquement en Next 16 (montée majeure, React 19, r3f 9). Le site est entièrement statique.
- Avec deux mises en page racines, Next 14 n'accepte pas de page 404 globale personnalisée : la 404 par défaut est utilisée.
- Pas encore de relecture par un physicien professionnel (appel affiché sur `/sources`).

## Current delivery milestone

Feuille de route « meilleur site sur les trous noirs » livrée le 2026-10-08 : pages thématiques, outils, bilingue, SEO. Prochaine étape : Search Console, diffusion (`docs/diffusion.md`), relecture scientifique.
