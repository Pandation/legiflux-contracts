# @legiflux/contracts

Contrats partagés entre **legiflux** (Next.js) et **legiflux-api** (NestJS) :
types de DTO, Commands/Queries CQRS, et fonctions utilitaires **pures**. Source
de vérité unique pour ce qui traverse la frontière réseau entre les deux repos
— et pour tout futur frontend qui viendrait taper sur legiflux-api.

## Ce n'est PAS un package publié

Pas de registre npm, pas de `npm publish`, pas de versioning semver. C'est une
dépendance Git installée directement depuis ce repo :

```json
{
  "dependencies": {
    "@legiflux/contracts": "github:Pandation/legiflux-contracts#main"
  }
}
```

`npm`/`pnpm` clone ce repo au moment de l'install et exécute automatiquement
le script `prepare` (voir `package.json`), qui compile `src/` → `dist/` — donc
pas de build à committer, le `dist/` reste dans `.gitignore`.

## Workflow

1. Le contrat change → **un ticket dédié**, `Projet = legiflux-contracts`
   (pas un effet de bord d'un ticket legiflux ou legiflux-api : un contrat
   partagé entre plusieurs consommateurs se fait évoluer délibérément, pas en
   passant).
2. PR mergée sur `main`.
3. Dans legiflux et/ou legiflux-api : `pnpm update @legiflux/contracts` (ou
   `npm update`) pour tirer la dernière version.

Si `pnpm install` ne relance pas le build automatiquement (ça arrive selon la
config des scripts d'install), forcer avec `pnpm rebuild @legiflux/contracts`.

## Règle : uniquement du code pur

- `src/dtos/` — forme d'une ressource telle qu'elle traverse le réseau (pas
  l'entité du domaine legiflux-api, qui peut avoir des méthodes/invariants
  que le DTO n'a pas).
- `src/commands/` — ce que legiflux envoie à legiflux-api pour une écriture
  (convention CQRS de legiflux-api).
- `src/queries/` — forme des paramètres de lecture exposés par legiflux-api.
- `src/utils/` — fonctions **pures** seulement : aucun import de Next.js, de
  NestJS, d'un ORM, du DOM. Une fonction qui a besoin d'infrastructure
  n'a rien à faire ici, elle appartient au repo qui l'utilise.

Contenu actuel : auth (`/auth/*` : session, utilisateur courant, rôles
self-service, corps de signin/signup/OTP), erreurs métier
(`DomainErrorResponseDto`), health et procédures (`/procedures/*`).

## Consommation

- **legiflux** : importe les DTOs dans `infrastructure/` (adaptateurs HTTP)
  et réexporte les rôles self-service depuis `domain/auth/participant-role.ts`.
- **legiflux-api** : les classes Swagger de `infrastructure/http/` font
  `implements` des DTOs d'ici, ce qui garantit à la compilation que la
  réponse réelle respecte le contrat.

Le repo est **public** pour que la CI, Docker et Vercel puissent l'installer
sans token : n'y mettre que des types et des fonctions pures, jamais de
secret.

## Dev local

```bash
pnpm install   # ou npm install
pnpm build     # tsc src/ → dist/
pnpm typecheck # sans émission
```
