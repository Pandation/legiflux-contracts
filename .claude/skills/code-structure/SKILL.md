---
name: code-structure
description: >-
  Aide à décider où placer un nouveau fichier et comment découper un module dans
  le projet courant : quelle couche, quel dossier, quelles dépendances
  autorisées, comment nommer. À utiliser avant de créer de nouveaux fichiers ou
  de restructurer un module.
---

# Où placer le code

## Méthode (à appliquer dans ce repo précis)
1. **Cartographie rapide** : liste les dossiers de premier niveau du code source
   et déduis la convention (par couche : `domain`/`application`/`infrastructure` ;
   par feature : `features/<nom>/…` ; framework : `app/`, `components/`, `lib/`).
2. **Place le nouveau code dans la même logique**. Ne crée pas une nouvelle
   racine de convention parallèle.
3. **Un module = un dossier** quand il a plus d'un fichier (impl + types + test +
   sous-composants colocalisés).

## Règles de dépendances
- Logique métier pure : aucun import de framework, d'I/O, de SDK tiers.
- Les adaptateurs (DB, HTTP, Stripe, fichiers) dépendent du métier, pas l'inverse.
- L'UI consomme l'application/métier via des fonctions ou hooks dédiés, pas en
  appelant directement la base ou l'API tierce.
- Un import « qui remonte » d'une couche basse vers une couche haute = signal de
  mauvais placement : revois le découpage.

## Nommage
- Reprends la casse et les suffixes déjà présents (`*Service`, `*Repository`,
  `use*`, `*.schema.ts`…).
- Nom de fichier = nom du symbole principal exporté.

## Checklist avant de créer un fichier
- [ ] Un fichier/dossier équivalent n'existe pas déjà.
- [ ] L'emplacement suit une convention visible ailleurs dans le repo.
- [ ] Les imports ne violent pas le sens des dépendances.
- [ ] Le test est colocalisé.
