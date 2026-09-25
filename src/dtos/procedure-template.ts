// Modèles de démarche tels que `legiflux-api` les expose sur
// `/admin/procedure-templates/*` (réservé aux comptes ADMIN, voir
// `procedure-template-response.mapper.ts` côté API).

export const SUB_STEP_TYPES = ["INPUT", "UPLOAD", "VALIDATION", "DECISION"] as const;
export type SubStepType = (typeof SUB_STEP_TYPES)[number];

/** Nature de la valeur saisie par une sous-étape `INPUT`. */
export const INPUT_TYPES = ["RICH_TEXT", "TEXT", "NUMBER", "BOOLEAN"] as const;
export type InputType = (typeof INPUT_TYPES)[number];

export interface ProcedureTemplateSubStepDto {
  type: SubStepType;
  title: string;
  description: string;
  /** Présent (et obligatoire) uniquement pour `type: "INPUT"`. */
  inputType?: InputType;
  /** `INPUT` uniquement. */
  required?: boolean;
  /** `UPLOAD` uniquement. */
  acceptedMimeTypes?: string[];
}

export interface ProcedureTemplateStepDto {
  title: string;
  description: string;
  /** Où en est la démarche tant que l'étape n'est pas terminée. */
  actualSituationLabel: string;
  /** Ce qui est attendu pour faire avancer l'étape. */
  pendingActionLabel: string;
  /** Affiché une fois l'étape terminée. */
  afterCompletedLabel: string;
  subSteps: ProcedureTemplateSubStepDto[];
}

/** Rôle prévu par le modèle, et kind de profil requis pour le tenir. */
export interface ProcedureTemplateRoleDto {
  role: string;
  requiredKind: string;
  label: string;
}

export interface ProcedureTemplateSummaryResponseDto {
  id: string;
  /** Non `null` pour un modèle utilisé par l'application : il ne peut pas être supprimé. */
  code: string | null;
  title: string;
  description: string;
  stepsCount: number;
  /** Dossiers créés depuis ce modèle : il ne peut pas être supprimé tant qu'il y en a. */
  proceduresCount: number;
  updatedAt: string;
}

export interface ProcedureTemplateResponseDto {
  id: string;
  code: string | null;
  title: string;
  description: string;
  steps: ProcedureTemplateStepDto[];
  roles: ProcedureTemplateRoleDto[];
}

/** Réponse de `POST /admin/procedure-templates`. */
export interface CreateProcedureTemplateResponseDto {
  procedureTemplateId: string;
}
