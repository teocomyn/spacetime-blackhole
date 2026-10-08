# Diffusion et référencement

Brouillons prêts à publier. Rien n'a été posté : chaque publication se fait depuis ton compte, après avoir relu les règles de la communauté visée (beaucoup de subreddits limitent l'autopromotion).

## 1. Google Search Console (15 min)

1. Ouvrir Search Console, ajouter la propriété « Préfixe de l'URL » `https://spacetime-blackhole.vercel.app` (ou le domaine définitif).
2. Choisir la validation par balise HTML et copier uniquement la valeur de `content`.
3. Dans Vercel, ajouter la variable d'environnement `GOOGLE_SITE_VERIFICATION` avec cette valeur, puis redéployer. Le site ajoute alors la balise tout seul (`components/layout/RootShell.tsx`).
4. Valider, puis soumettre `https://spacetime-blackhole.vercel.app/sitemap.xml` (24 URL, FR et EN, avec hreflang).
5. Demander l'indexation de `/`, `/trous-noirs`, `/tomber-dans-un-trou-noir` et `/en`.

Si un domaine personnalisé est branché, définir aussi `NEXT_PUBLIC_SITE_URL` sur Vercel pour que les URL canoniques suivent.

## 2. Hacker News (Show HN)

**Titre** : Show HN: A ray-traced black hole you can fall into, with the physics explained

**Premier commentaire** :

> I built a free bilingual (FR/EN) site about black holes. The part I am proudest of: every pixel of the "falling in" page traces a light ray through the Schwarzschild metric in a fragment shader, including the local-frame aberration for a static observer, so near the horizon you see the whole sky shrink into a bright disk.
>
> There is also a Hawking temperature and evaporation calculator, a size comparison from Gaia BH1 to TON 618, a synthesized GW150914 chirp, and an interactive Page curve for the information paradox. Every figure links to its paper (DOI or arXiv).
>
> It has not been reviewed by a professional physicist yet; corrections are very welcome via GitHub issues.
>
> https://spacetime-blackhole.vercel.app/en

## 3. Reddit

**r/space ou r/Astronomy** (vérifier le jour autorisé pour l'autopromotion)

Titre : I made a free interactive site where you can fall into a ray-traced black hole, compute Hawking temperatures and hear GW150914

> Each page explains one thing (what black holes are, falling in, Hawking radiation, the information paradox, gravitational waves) with a "go deeper" mode for the equations. Images of M87* and Sgr A* are the EHT's (CC BY 4.0), everything else is computed in your browser. Feedback from physicists especially welcome.
>
> https://spacetime-blackhole.vercel.app/en

**r/PhysicsStudents ou r/AskPhysics** (angle pédagogique)

Titre : Interactive Page curve and Schwarzschild ray tracer for teaching black hole physics

> Built for students and teachers: a slider that traces Hawking's curve versus the Page curve, a calculator for r_s, T_H and evaporation time, and five classroom activities with answer keys (weighing Sgr A* from S2's orbit with Kepler's third law, reading the M87* image). Free, no sign-up.
>
> https://spacetime-blackhole.vercel.app/en/teachers

**r/france ou r/sciences** (FR)

Titre : J'ai fait un site gratuit pour comprendre les trous noirs (et tomber dedans, virtuellement)

> Rendu physique de la lentille gravitationnelle, calculateur de température de Hawking, son de la première fusion de trous noirs, courbe de Page interactive et activités pour les profs. Toutes les sources sont liées. Les retours de physiciens sont les bienvenus.
>
> https://spacetime-blackhole.vercel.app

## 4. Enseignants

- Union des professeurs de physique et de chimie (UdPPC) : proposer la page `/enseignants` comme ressource, en mettant en avant l'activité Kepler / S2 (programme de terminale, « Mouvement dans un champ de gravitation »).
- Groupes de profs de physique-chimie sur les réseaux sociaux.
- Clubs et associations d'astronomie (Association française d'astronomie), planétariums, fêtes de la science.

Message court :

> Bonjour, j'ai créé une ressource gratuite sur les trous noirs avec cinq activités corrigées, de la seconde au supérieur, dont une qui pèse le trou noir central de la Voie lactée à partir de l'orbite de l'étoile S2 avec la troisième loi de Kepler. Tout est sourcé. Je serais ravi d'avoir votre avis : https://spacetime-blackhole.vercel.app/enseignants

## 5. Vulgarisateurs et relecture scientifique

- Chaînes et blogs de vulgarisation en astrophysique : proposer un lien vers `/tomber-dans-un-trou-noir` (le rendu est l'élément le plus partageable).
- Relecture : écrire à un ou deux chercheurs en gravitation ou en astrophysique (laboratoires français : IAP, LUPM, APC) en demandant une relecture de `/paradoxe-de-l-information` et `/tomber-dans-un-trou-noir`. Créditer la relecture sur `/sources` une fois faite.

## 6. Ce qui reste à mesurer

Aucun outil d'audience n'est installé. Avant d'en ajouter un (Vercel Web Analytics ou autre), vérifier le prix et les conséquences RGPD (un outil sans cookie évite le bandeau de consentement).
