# Emergent Spacetime

**Emergent Spacetime** est un web documentaire interactif qui explore l'idée que **l'espace-temps n'est pas fondamental, mais émerge de l'intrication quantique**.

Développé par **Teo Comyn**, [github.com/teocomyn/spacetime-blackhole](https://github.com/teocomyn/spacetime-blackhole)

## Fonctionnalités

- Scrollytelling (GSAP + Framer Motion) avec alternative statique pour l'accessibilité
- Vidéo HLS Mux en hero + réseau de qubits 3D lazy-loadé
- Navigation par ancres et i18n FR/EN
- SEO : Open Graph (image PNG générée), JSON-LD avec bibliographie, sitemap, robots, PWA manifest

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

L'URL canonique, le sitemap et les balises de partage viennent de `SITE_URL` (`lib/constants.ts`). Pour un domaine personnalisé, définir `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement Vercel.

## Inspirations

Penrose, Bekenstein & Hawking (entropie et rayonnement des trous noirs), Maldacena (AdS/CFT), Ryu-Takayanagi, Van Raamsdonk, Verlinde, Maldacena & Susskind (ER=EPR), Penington et Almheiri et al. (courbe de Page).
