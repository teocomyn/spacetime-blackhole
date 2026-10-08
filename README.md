# Emergent Spacetime

**Emergent Spacetime** est un web documentaire interactif qui explore l'idée que **l'espace-temps n'est pas fondamental, mais émerge de l'intrication quantique**.

Développé par **Teo Comyn**, [github.com/teocomyn/spacetime-blackhole](https://github.com/teocomyn/spacetime-blackhole)

## Fonctionnalités

- **Expérience** (`/` et `/en`) : scrollytelling (GSAP + Framer Motion) avec alternative statique, simulation 3D, chapitres, reprise de lecture.
- **Pages thématiques** : trous noirs, tomber dedans, rayonnement de Hawking, paradoxe de l'information, ondes gravitationnelles. Deux niveaux de lecture (« Découvrir » / « Approfondir ») et FAQ.
- **Outils** : calculateur (rayon de Schwarzschild, température de Hawking, évaporation, entropie), comparateur de taille, quiz, courbe de Page interactive, synthétiseur du chirp de GW150914.
- **Lentille gravitationnelle** calculée en GLSL : chaque pixel suit une géodésique lumineuse de Schwarzschild (`components/three/lensing/`).
- **Références** : glossaire, sources et méthode, ressources pour les enseignants.
- **Bilingue FR/EN** par l'URL (`/…` et `/en/…`), balises hreflang, sitemap bilingue.
- **SEO** : métadonnées par page, JSON-LD (Article, FAQPage, BreadcrumbList, DefinedTermSet), images de partage `/social/fr` et `/social/en`.
- **Sobriété** : canvas 3D et vidéos actifs seulement à l'écran, hls.js chargé à la demande, vidéos coupées en mode économie de données.

## Structure

- `app/(fr)` et `app/(en)/en` : deux mises en page racines (une par langue) qui partagent `components/layout/RootShell.tsx`.
- `lib/routes.ts` : registre des pages (chemins FR/EN, titres, descriptions).
- `components/pages/` : contenu des pages, partagé entre les deux langues.
- `lib/physics.ts` : constantes CODATA 2018 et formules.
- `lib/content.ts` : bibliographie, sources d'observation, glossaire.
- `docs/diffusion.md` : Search Console et brouillons de diffusion.

## Stack

- Next.js 14 (App Router)
- Three.js, @react-three/fiber, @react-three/drei
- Framer Motion, GSAP
- Tailwind CSS, next/font

## Démarrage

```bash
git clone https://github.com/teocomyn/spacetime-blackhole.git
cd spacetime-blackhole
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement

Production : [spacetime-blackhole.vercel.app](https://spacetime-blackhole.vercel.app) sur [Vercel](https://vercel.com).

L'URL canonique, le sitemap et les balises de partage viennent de `SITE_URL` (`lib/constants.ts`). Pour un domaine personnalisé, définir `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement Vercel. Pour valider Google Search Console, définir `GOOGLE_SITE_VERIFICATION` (voir `docs/diffusion.md`).

## Inspirations

Penrose, Bekenstein & Hawking (entropie et rayonnement des trous noirs), Maldacena (AdS/CFT), Ryu-Takayanagi, Van Raamsdonk, Verlinde, Maldacena & Susskind (ER=EPR), Penington et Almheiri et al. (courbe de Page).
