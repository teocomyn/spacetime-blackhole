# Emergent Spacetime

**Emergent Spacetime** est un web documentaire interactif qui explore l'idée que **l'espace-temps n'est pas fondamental, mais émerge de l'intrication quantique**.

Développé par **Teo Comyn** — [github.com/teocomyn/spacetime-blackhole](https://github.com/teocomyn/spacetime-blackhole)

## Fonctionnalités

- Scrollytelling (GSAP + Framer Motion) avec alternative statique pour l'accessibilité
- Vidéo HLS Mux en hero + réseau de qubits 3D lazy-loadé
- Navigation par ancres et i18n FR/EN
- SEO : Open Graph, JSON-LD, sitemap, robots, PWA manifest

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

Cible : [Vercel](https://vercel.com) — `emergent-spacetime.vercel.app`

## Inspirations

Maldacena (AdS/CFT), Susskind (ER=EPR), Hawking & Bekenstein (entropie des trous noirs), Ryu-Takayanagi, Verlinde.
