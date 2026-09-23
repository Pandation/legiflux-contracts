// Réponses de `legiflux-api` sur `/procedures/*` (voir
// `procedure-response.mapper.ts` côté API).

/** Acteur d'une démarche, tel qu'exposé aux autres participants. */
export interface ProcedureParticipantResponseDto {
  /** Rôle joué sur CETTE démarche (ex. `"AGENCY"`, `"CANDIDATE"`). */
  role: string;
  email: string;
}

export interface ProcedureSummaryResponseDto {
  id: string;
  templateTitle: string;
  /** Libellé libre donné à la création (ex. le bien : `"T3 · Marseille 6e"`), `null` si aucun. */
  label: string | null;
  /** Rôle(s) de l'utilisateur courant sur cette démarche. */
  viewerRoles: string[];
  participants: ProcedureParticipantResponseDto[];
  status: string;
  stepsDone: number;
  stepsTotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProcedureDocumentResponseDto {
  documentId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface ProcedureSubStepResponseDto {
  id: string;
  order: number;
  type: string;
  label: string;
  status: string;
  document: ProcedureDocumentResponseDto | null;
}

export interface ProcedureStepResponseDto {
  id: string;
  order: number;
  title: string;
  description: string;
  beforeDoneLabel: string;
  afterDoneLabel: string;
  status: string;
  subSteps: ProcedureSubStepResponseDto[];
}

export interface ProcedureDetailResponseDto {
  id: string;
  templateTitle: string;
  label: string | null;
  viewerRoles: string[];
  participants: ProcedureParticipantResponseDto[];
  status: string;
  createdAt: string;
  updatedAt: string;
  steps: ProcedureStepResponseDto[];
}

export interface UploadProcedureDocumentResponseDto {
  documentId: string;
  subStepStatus: string;
}

/** Réponse de `POST /procedures`. */
export interface CreateProcedureResponseDto {
  procedureId: string;
  /** `false` si la démarche a été créée mais que l'email d'invitation n'a pas pu partir. */
  invitationSent: boolean;
}
