// Corps des écritures `/auth/*` envoyées à legiflux-api (voir
// `dto/sign-in.dto.ts`, `dto/sign-up.dto.ts`, `dto/request-email-otp.dto.ts`
// côté API).

/**
 * Méthode d'authentification côté HTTP. Distincte de `AuthProvider` (domaine
 * de legiflux-api) : `EMAIL_OTP` n'est pas une identité persistée.
 */
export const AUTH_METHODS = ["EMAIL_OTP", "GOOGLE"] as const;

export type AuthMethod = (typeof AUTH_METHODS)[number];

/**
 * Rôles qu'un utilisateur peut s'attribuer lui-même via `POST /auth/signup`.
 * `AGENCY_EMPLOYEE` (invitation par une agence) n'est jamais atteignable en
 * self-service.
 */
export const SELF_SERVICE_PARTICIPANT_ROLES = [
  "CANDIDATE",
  "GUARANTOR",
  "LANDLORD",
  "AGENCY",
] as const;

export type SelfServiceParticipantRole = (typeof SELF_SERVICE_PARTICIPANT_ROLES)[number];

/** `POST /auth/otp/request` */
export interface RequestEmailOtpCommand {
  email: string;
}

/**
 * `POST /auth/signin` — `email` + `code` requis si `provider = EMAIL_OTP`,
 * `idToken` (ID token Google) requis si `provider = GOOGLE`.
 */
export interface SignInCommand {
  provider: AuthMethod;
  email?: string;
  code?: string;
  idToken?: string;
}

/** `POST /auth/signup` — mêmes règles que `SignInCommand`, plus le rôle choisi. */
export interface SignUpCommand extends SignInCommand {
  role: SelfServiceParticipantRole;
}
