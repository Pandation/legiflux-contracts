// Réponses de `legiflux-api` sur `/procedures/*` (voir
// `procedure-response.mapper.ts` côté API).
export interface ProcedureSummaryResponseDto {
  id: string;
  templateTitle: string;
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
  status: string;
  createdAt: string;
  updatedAt: string;
  steps: ProcedureStepResponseDto[];
}

export interface UploadProcedureDocumentResponseDto {
  documentId: string;
  subStepStatus: string;
}
