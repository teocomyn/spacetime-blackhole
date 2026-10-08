# emergent-spacetime — AI Context

Updated: 2026-10-08

## Purpose

Web documentaire interactif (FR/EN) sur les trous noirs et l'idée que l'espace-temps émerge de l'intrication quantique. Projet personnel de Teo Comyn, vitrine et support de liens vers teocomyn.com et experaise.com.

## Project classification

content-only (prototype conservé). Aucune base de données, aucun compte utilisateur, aucune donnée personnelle.

## Architecture

- Next.js 14 App Router, une seule page (`app/page.tsx`) composée de sections dans `components/sections/`.
- 3D : three.js + @react-three/fiber + drei (hero et simulation), chargés en `dynamic` sans SSR.
- Animations : Framer Motion et GSAP ScrollTrigger. Canvas 2D pour Problem, Intuition, fond étoilé et particules du footer.
- i18n côté client : dictionnaire typé `lib/i18n.ts`, langue stockée en localStorage. Contenus longs (frise, glossaire, bibliographie) dans `lib/content.ts` et `TimelineSection.tsx`.
- Vidéos : flux HLS Mux et MP4 sur un CloudFront tiers, via `components/media/BackgroundVideo.tsx` et `lib/attachVideoSource.ts` (hls.js importé à la demande).
- SEO : `SITE_URL` dans `lib/constants.ts` (surchargeable par `NEXT_PUBLIC_SITE_URL`), image OG générée par `app/opengraph-image.tsx`, JSON-LD dans `app/layout.tsx`.

## Infrastructure

- Dépôt : github.com/teocomyn/spacetime-blackhole (public), branche `main`.
- Hébergement : Vercel, production sur https://spacetime-blackhole.vercel.app.
- `emergent-spacetime.vercel.app` n'est PAS ce site : il sert une autre application (Rust/WASM).

## Commands

- Install : `npm ci`
- Dev : `npm run dev`
- Lint : `npx next lint`
- Types : `npx tsc --noEmit`
- Build : `npm run build`, puis `npx next start -p 3100` pour tester le build
- Deploy : push sur `main` (déploiement Vercel), uniquement avec accord explicite.

## Stable decisions

- Une seule URL indexable (`/`). Le sitemap ne liste pas les ancres.
- Le paramètre `?mode=` de la simulation n'est écrit qu'après une action du visiteur.
- Canvas 3D et vidéos ne tournent que lorsqu'ils sont proches de l'écran (IntersectionObserver + `frameloop`).
- Pas de zoom molette ni de contrôles tactiles sur la simulation, pour que la page reste défilable.
- Toute affirmation scientifique encore débattue est formulée au conditionnel. Chaque source a un lien DOI ou arXiv vérifié.
- L'ordre Glossaire puis Singularité est volontaire : le glossaire est « aspiré » vers le trou noir.

## Known risks and constraints

- Trois MP4 de 13 à 18 Mo sont servis depuis un CloudFront tiers (export Higgsfield) hors de notre contrôle.
- La version anglaise n'est pas indexable (bascule côté client, même URL).
- three 0.183 avec @react-three/fiber 8 affiche un avertissement de dépréciation `THREE.Clock`, sans impact.
- Aucun outil de mesure d'audience.

## Current delivery milestone

Corrections de l'audit du 2026-10-07 (SEO, performance, accessibilité, exactitude scientifique), à relire puis déployer.
