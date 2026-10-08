# AI Handoff

Updated: 2026-10-08
Agent/tool: Claude Code
Branch: main (rien n'est commité)

## Completed

- SEO : `SITE_URL` pointe vers la vraie production, avec un titre et une description centrés sur les trous noirs. Image OG en PNG, icônes 48 px et Apple 180 px, sitemap réduit à `/`, JSON-LD enrichi (14 citations, sujets liés à Wikipédia), `?mode=` écrit seulement au clic.
- Sources : liens Bekenstein et Hawking corrigés (DOI). Ajout de Penrose 1965, Hawking 1975, Swingle, Van Raamsdonk, Almheiri-Dong-Harlow, Penington et Almheiri et al. 2019, tous vérifiés sur arXiv et doi.org.
- Contenu : frise réordonnée et nuancée (ajout de Van Raamsdonk 2010 et de la courbe de Page 2019), 10 entrées de glossaire sur les trous noirs, citation de Hawking vérifiable, coquilles « Intrigation » et « Tidalité » corrigées, bandeau Horizons relié au glossaire.
- Performance : simulation montée à l'approche et figée hors écran, hero 3D et vidéos en pause hors écran, vidéo du footer différée, hls.js à la demande (JS de la page passé de 224 à 68 Ko), fond étoilé redessiné seulement au défilement, halo sans `shadowBlur`, plus de rendu React par image en mode Décohérence, police DM Sans retirée.
- Bugs : défilement bloqué par la simulation (molette et tactile), titre du hero coupé sur mobile, classes d'ombre Tailwind cassées, curseur natif masqué sans curseur de remplacement, `lang` non synchronisé.
- Accessibilité : `aria-live` ne lit plus le FPS en boucle, nom du titre, contenu pour lecteurs d'écran complet et sans doublon, contraste `--text-muted` à 5,6:1, cibles de navigation de 32 px, onglets au clavier, bouton FX nommé, textes anglais manquants.
- Hygiène : `.gitignore` restauré, code mort supprimé, `next.config.mjs` avec en-têtes de sécurité de base, page d'erreur sans message technique, README à jour.

## Validation

- `npx tsc --noEmit` : OK. `npx next lint` : aucune erreur. `npm run build` : OK.
- Build testé sur le port 3100 avec Chrome headless. Desktop 1280×800 : chargement différé de la simulation et des vidéos, pause hors écran, molette non bloquée, secours hls.js testé. Mobile 375×812 : titre sur 2 lignes, aucun chevauchement entre navigation et panneau, `touch-action` non bloqué. Robots, sitemap, image OG et en-têtes contrôlés.

## Uncommitted or sensitive areas

- Tout le travail ci-dessus est dans l'arbre de travail, non commité. Les suppressions sont indexées via `git rm`.
- `app/favicon.ico` a été supprimé par l'utilisateur avant la session (remplacé par `app/icon.tsx`), conservé ainsi.
- Nouveaux fichiers d'outillage non suivis : `.claude/launch.json`, `.cursor/`, `AGENTS.md`, `CLAUDE.md`.

## Blockers and decisions needed

- Commit et push sur `main` (déclenche le déploiement Vercel) : accord explicite de Teo requis.
- Héberger les 3 MP4 sur Mux (compte de Teo) au lieu du CloudFront tiers.
- Choix d'un outil d'audience (Vercel Web Analytics ou autre) : vérifier le prix avant.
- Domaine personnalisé éventuel : définir `NEXT_PUBLIC_SITE_URL` sur Vercel.

## Next concrete action

- Relire le diff, committer, pousser, puis vérifier la production (canonique, image OG via le Sharing Debugger de LinkedIn et Facebook) et soumettre le sitemap dans Google Search Console.
