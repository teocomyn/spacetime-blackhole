# AI Handoff

Updated: 2026-10-11
Agent/tool: Claude Code
Branch: main (feat/live-black-hole fusionnée en avance rapide et poussée le 2026-10-11, avec l'accord de Teo)

## Completed

- Production sur https://blackhole.the42laws.fr (CNAME Hostinger vers Vercel, certificat Let's Encrypt), URL canonique basculée (commit 8f6f4d1 sur main).
- Branche `feat/live-black-hole` (commit 7c7eaa0) : l'accueil devient une plongée dans un trou noir calculé en temps réel.
  - Fond fixe `SpacetimeBackdrop` : caméra pilotée par le défilement (images clés par section), parallaxe souris, dérive lente, qualité adaptative (résolution et nombre de pas).
  - Le curseur ou le doigt agit comme une lentille gravitationnelle ponctuelle (anneau d'Einstein) dans le shader.
  - Hero : titre attiré par le curseur, bascule 3D au défilement ; vidéo Mux et canvas de qubits retirés au profit du rendu en direct.
  - Singularité : la caméra s'approche, le disque l'enveloppe, puis elle se retourne vers l'Univers réduit à un disque lumineux. Vidéo MP4 tierce retirée.
  - Apparitions 3D au défilement en CSS (`animation-timeline: view()`), inclinaison des cartes à la souris (`hooks/useTilt.ts`).

## Validation

- `npx tsc --noEmit` OK, `npx next lint` sans avertissement, `npm run build` OK.
- Captures en Chrome headless (rendu logiciel SwiftShader) : hero desktop et mobile, lentille du curseur, frise, Singularité à 30 % et 95 %. Pas de débordement horizontal sur mobile.
- Mise en production validée par Teo le 2026-10-11. Fluidité sur appareils réels non mesurée par l'agent : à surveiller (qualité adaptative en place).

## Uncommitted or sensitive areas

- `.claude/launch.json` (configuration locale de prévisualisation) n'est pas suivi par Git.

## Blockers and decisions needed

- Search Console, diffusion, relecture scientifique, montée vers Next 16 : inchangés (voir `docs/diffusion.md`).

## Next concrete action

- Recueillir les retours de Teo sur le rendu réel (fluidité, lisibilité) et ajuster les images clés de caméra dans `components/three/lensing/BackdropCanvas.tsx` si besoin.
