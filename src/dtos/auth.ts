// Réponses de `legiflux-api` sur `/auth/*` (voir
// `auth-session-response.mapper.ts` côté API). Les dates sont des chaînes
// ISO 8601 : jamais d'objet Date à travers la frontière réseau.
export interface ProfileResponseDto {
  /** `ProfileKind` côté API (ex. `"BENEFICIARY"`, `"ORGANISM"`, `"ADMIN"`). */
  kind: string;
  /** Rôles déjà exercés par ce profil sur au moins un dossier (ex. `["CANDIDATE"]`). */
  types: string[];
  createdAt: string;
}

export interface CurrentUserResponseDto {
  id: string;
  email: string;
  emailVerifiedAt: string | null;
  profiles: ProfileResponseDto[];
}

/**
 * Le refresh token n'apparaît jamais ici : c'est un cookie `httpOnly` posé
 * par `legiflux-api` sur son propre domaine.
 */
export interface AuthSessionResponseDto {
  accessToken: string;
  accessTokenExpiresAt: string;
  user: CurrentUserResponseDto;
}
