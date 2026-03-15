# Emergent Spacetime 🌌

**Emergent Spacetime** est un projet de web documentaire interactif et immersif qui vulgarise le concept le plus pointu de la physique théorique moderne : l'idée que **l'espace-temps n'est pas fondamental, mais qu'il émerge de l'intrication quantique**.

Développé par **Teo Comyn**.

![Preview](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000) *(Image illustrative)*

## 🎯 Le Concept

Le projet traduit visuellement le paradigme holographique et la conjecture **ER=EPR** (proposée par Juan Maldacena et Leonard Susskind en 2013). À travers une expérience à défilement interactif ("scrollytelling") et des **simulations WebGL en temps réel 3D**, le site illustre comment l'information quantique (réseaux de tenseurs, intrication de qubits) tisse purement et simplement la géométrie de notre univers.

## 🚀 Fonctionnalités Clés

- **Simulations 3D Interactives (Three.js / React Three Fiber)** : Moteur permettant d'expérimenter 4 modes de physique quantique :
  - *Réseau d'Intrication* : Un maillage de qubits dont la distance définit la géométrie.
  - *Trou Noir* : Simulation d'effondrement et disque d'accrétion dynamique (Frame Dragging).
  - *Trou de Ver (ER = EPR)* : Pont paramétrique entre de l'information intriquée.
  - *Décohérence* : Brisure de la géométrie et perte de l'information.
- **Scrollytelling (Framer Motion & GSAP)** : Révélations au défilement, transitions cinématographiques entre les échelles (macroscopique/thermodynamique vs quantique).
- **Design System Premium** : Ambiance sombre ("dark mode"), grain SVG cinématique, typographie moderne (Instrument Serif, Geist Mono, Satoshi), animations typographiques de précision.

## 🛠 Technique & Stack

Ce projet repousse les limites de l'intégration web 3D et du rendu React :

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- **3D & WebGL** : [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei) (Utilisation de `InstancedMesh`, shaders, et Custom Geometries)
- **Animations** : [Framer Motion](https://www.framer.com/motion/) (Scroll & micro-interactions UI) et [GSAP](https://gsap.com/) (ScrollTrigger pour les séquences narratives)
- **Stylisation** : [Tailwind CSS](https://tailwindcss.com/)
- **Déploiement cible** : Vercel

## 💻 Démarrage Local

Pour lancer le simulateur sur votre machine :

1. **Cloner le repository**
   ```bash
   git clone https://github.com/teocomyn/spacetime-blackhole.git
   cd spacetime-blackhole
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📚 Inspirations Physiques

Ce projet s'appuie sur la vulgarisation des travaux de recherche des physiciens :
- **Juan Maldacena** (Correspondance AdS/CFT)
- **Leonard Susskind** (Principe Holographique, ER=EPR)
- **Jacob Bekenstein & Stephen Hawking** (Entropie des trous noirs)
- **Shinsei Ryu & Tadashi Takayanagi** (Entropie d'intrication holographique)
- **Erik Verlinde** (Gravité entropique)

---

Créé avec curiosité intellectuelle et passion pour le code graphique. ✨
