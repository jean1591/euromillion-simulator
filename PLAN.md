# Refonte SEO / UX — plan de suivi

Branche : `feat/seo-ux-overhaul` → PR unique vers `main`.
Les messages de commit sont rédigés en anglais.
Document de travail : à mettre à jour à chaque commit, à supprimer à la fusion de la PR.

## Contexte

Le site n'a qu'une route `/`, sans landing page, et capte déjà ~90 % des impressions
de la propriété `jeanrobertou.com`. L'objectif est de transformer cette audience
existante en clics, sans casser le simulateur.

### Baseline Search Console — 28 jours, 2026-08-16 → 2026-09-15

Relevée avant toute modification, à comparer après déploiement.

| Mesure | Valeur |
| --- | --- |
| Impressions (page `/`) | 1 519 |
| Clics | 11 |
| CTR | 0,72 % |
| Position moyenne | 12,27 |

Requêtes principales :

| Requête | Impressions | Clics | Position |
| --- | --- | --- | --- |
| simulateur euromillions | 295 | 1 | 9,6 |
| simulateur euromillion | 113 | 3 | 10,3 |
| simulation euromillions | 43 | 2 | 9,3 |
| simulation tirage euromillions | 29 | 1 | 9,6 |
| famille « calcul / calculateur de gain euromillions » | ~20 | 0 | 23 → 66 |

Lecture : la visibilité est acquise, le CTR ne suit pas. La famille
« calcul de gain » est hors de portée faute de contenu qui la cible.

### État d'indexation

- `https://euromillion.jeanrobertou.com/` : « Envoyée et indexée », dernier crawl 2026-09-07,
  canonical correct, `robots.txt` permissif. L'indexation n'est pas un problème.
- Aucun sitemap déclaré pour le sous-domaine.

## Search Console

- [x] Compte de service ajouté à `sc-domain:jeanrobertou.com`
- [x] Propriété `https://euromillion.jeanrobertou.com/` créée et accessible au compte de service
- [ ] Soumettre le sitemap via le MCP (`submit_sitemap`) — après déploiement du commit 11
- [ ] Re-mesurer la baseline 28 jours après déploiement

## Découpage en commits

### Socle

- [x] **1. `chore: clean up the project`**
  - supprimer `tailwind.config.ts` (doublon, `theme.extend` vide, `content` divergent de `.js`)
  - supprimer `src/app/Home.module.css` (importé nulle part)
  - supprimer `src/.DS_Store` et `public/.DS_Store`, les ajouter au `.gitignore`
  - renommer `package.json` (`jeanrobertou.com` → nom du projet)
  - corriger la typo `SimuationSettings` (`simulationSettings.tsx:7`)
  - retirer le `console.log("Reseting simulation")` (`startAndPauseButton.tsx:26`)

- [x] **2. `fix: reset the simulation when it is restarted`**
  - `startAndPauseButton.tsx:27` : `resetSimulationResults()` appelé sans `dispatch` → no-op.
    Conséquence : après une simulation terminée, le bouton ne fait plus rien, le statut
    retombe aussitôt en `Idle` via `draws.tsx:56`
  - `simulationResults/slice.ts:33` : le reset oublie `winningsArray`, utilisé par
    « Plus gros gain » et « Tirages gagnants »
  - à faire avant la migration Zustand pour garder un diff lisible

- [x] **3. `refactor: replace Redux with Zustand`**
  - supprimer `src/lib/store.ts`, `src/lib/storeProvider.tsx`, les deux slices
  - retirer `@reduxjs/toolkit` et `react-redux`
  - absorbe le double état de `drawsPerWeek.tsx` (`useState` local en parallèle du store)
  - absorbe les dépendances `useEffect` manquantes (`drawsPerWeek.tsx:16`, `draws.tsx:50`)

- [x] **4. `test: cover generateDraw and winningsCalculator`**
  - ajouter Vitest (aucune infra de test aujourd'hui)
  - épingle la logique de gains avant de l'exposer en contenu au commit 13

### UX

- [x] **5. `fix: labels and accessibility`**
  - libellé `2 tirages par semaines` statique alors que le switch bascule 1↔2,
    plus la faute d'accord (`simulationSettings.tsx:20`)
  - `Switch.Label` manquant (`drawsPerWeek.tsx`)
  - deux tuiles intitulées « Gains » dans `resultsCard.tsx` (montant et pourcentage)
  - boules rendues en `<p>` sans rôle ni libellé des numéros gagnants (`draw.tsx`)

- [x] **6. `fix: stabilise the first render`**
  - remplacer les gardes `isClient` (`myNumbers.tsx:19`, `draws.tsx:57`) par un état
    initial déterministe — elles vident le premier rendu et provoquent un saut de mise en page
  - retirer l'`overflow-y-scroll` permanent du `Panel`

- [x] **7. `feat: let users pick their own numbers`**
  - `myNumbers.tsx` n'affiche qu'un tirage aléatoire en lecture seule

- [x] **8. `feat: simulation controls`**
  - cadence fixe à 25 ms/tirage (`draws.tsx:47`) → ≈21 s pour 208 semaines :
    vitesse réglable et saut au résultat
  - `weeksSelector.tsx:7` : boutons cumulatifs uniquement, ni retrait ni remise à zéro,
    total courant non affiché à côté

- [x] **9. `perf: cap the draw list`**
  - la liste grossissait sans borne et se re-rendait intégralement à chaque tirage
  - plafonnée aux 100 derniers tirages gagnants plutôt que virtualisée :
    les agrégats sont calculés au fil de l'eau, donc la mémoire est bornée
    et aucune dépendance n'est ajoutée

- [x] **10. `feat: persist the simulation`**
  - middleware `persist` de Zustand, direct une fois le commit 3 fait
  - aujourd'hui un rechargement perd tout et régénère des numéros

### SEO

- [x] **11. `fix(seo): sitemap and robots on the right domain`**
  - `public/sitemap.xml` liste `https://www.jeanrobertou.com/`, pas l'URL du simulateur
  - `public/robots.txt` pointe vers le sitemap du mauvais domaine
  - passer en `sitemap.ts` / `robots.ts`
  - hygiène, pas un blocage : la page est déjà indexée

- [x] **12. `feat(seo): complete metadata`**
  - `layout.tsx:11` réduit à `title` + `description`
  - ajouter `metadataBase`, canonical, Open Graph, Twitter
  - resserrer le titre : le suffixe `- Jean Robertou` consomme des pixels pour un CTR à 0,72 %
  - image OG dédiée (`public/hero-profile.png` vient du portfolio)

- [x] **13. `feat(seo): prize tiers, winnings and odds section`**
  - la table existe dans `winningsCalculator.ts:16` mais n'est révélée qu'au compte-gouttes
    pendant une simulation, et seulement pour les tirages gagnants
  - l'extraire en donnée partagée, la rendre côté serveur sous le simulateur
  - préciser qu'il s'agit de montants moyens
  - sortir le prix du ticket `2.5`, codé en dur deux fois dans `resultsCard.tsx`
  - cible la famille « calcul gain euromillions », aujourd'hui en position 23 à 66

- [x] **14. `feat(seo): FAQ and JSON-LD`**
  - `WebApplication` + `FAQPage`

### Mesure

- [ ] **15. `chore: analytics`**
  - sans instrumentation, aucun des commits précédents n'est mesurable

## Hors périmètre de cette PR

- Routes dédiées par intention (« calculateur de gain », « probabilités ») :
  à décider après avoir mesuré l'effet du commit 13.
- Montée de Next 14.1.0 → 15 : PR séparée, pour garder le diff isolable en cas de régression.

## Point de coupure

Si la PR est trop lourde à relire d'un bloc, couper entre les commits 10 et 11 :
socle + UX d'un côté, SEO de l'autre.
