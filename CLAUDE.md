# Contexte projet — legiflux-contracts

legiflux-contracts est le package de contrats partagés entre **legiflux**
(Next.js) et **legiflux-api** (NestJS) — et tout futur frontend qui viendrait
taper sur legiflux-api. Installé comme dépendance Git (pas de registre npm,
pas de `publish`, voir le README du repo lui-même pour le détail du workflow
d'install/mise à jour).

## Contenu
- `src/dtos/` — forme d'une ressource telle qu'elle traverse le réseau.
- `src/commands/` — ce que legiflux envoie à legiflux-api pour une écriture
  (convention CQRS de legiflux-api).
- `src/queries/` — forme des paramètres de lecture exposés par legiflux-api.
- `src/utils/` — fonctions pures partagées entre les deux repos.

## Pourquoi ce repo est délibérément à part
Un changement ici affecte tous les consommateurs (legiflux, legiflux-api, et
au-delà) d'un coup. Une évolution de contrat est donc toujours **son propre
ticket/sa propre tâche**, jamais un effet de bord d'un changement sur
legiflux ou legiflux-api — voir la règle ci-dessous.

## Règle — code pur uniquement
- **Aucun import de framework** : pas de `next/*`, pas de `@nestjs/*`, pas
  d'ORM, pas du DOM/`window`/`document`. Ce package tourne identiquement
  côté navigateur, côté Next.js serveur, et côté NestJS.
- **Pas de logique avec effets de bord** (accès réseau, DB, fichier, horloge,
  aléatoire) — uniquement des types et des fonctions pures dans `src/utils/`.
- **Un DTO/Command/Query n'est pas l'entité du domaine** de legiflux-api :
  c'est la forme de l'information au moment où elle traverse le réseau, pas
  la représentation interne avec ses invariants.
- **Toute évolution de ce repo est délibérée et isolée** — jamais un effet
  de bord d'un changement sur legiflux ou legiflux-api.
- **Rétrocompatibilité par défaut** : retirer ou renommer un champ/Command/
  Query existant casse potentiellement plusieurs consommateurs à la fois —
  préfère ajouter un nouveau champ/type plutôt que d'en modifier un existant,
  et documente clairement tout changement cassant.
