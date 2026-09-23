/**
 * `POST /procedures` — une agence ouvre un dossier de location pour un bien
 * et invite le candidat par email. Réservé aux comptes ayant le rôle
 * `AGENCY`.
 */
export interface CreateProcedureCommand {
  /** Le bien concerné (ex. `"T3 · Marseille 6e"`), affiché à tous les acteurs. */
  label: string;
  candidateEmail: string;
  /** Utilisé pour personnaliser l'email d'invitation, jamais stocké. */
  candidateName?: string;
}
