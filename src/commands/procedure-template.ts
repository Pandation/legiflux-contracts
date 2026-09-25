import type { ProcedureTemplateRoleDto, ProcedureTemplateStepDto } from "../dtos/procedure-template";

/**
 * `POST /admin/procedure-templates` (création) et
 * `PUT /admin/procedure-templates/:id` (remplacement complet). Réservé aux
 * comptes ADMIN. Les dossiers déjà ouverts ne sont pas modifiés par un PUT.
 */
export interface SaveProcedureTemplateCommand {
  title: string;
  /** 300 caractères maximum. */
  description: string;
  steps: ProcedureTemplateStepDto[];
  roles: ProcedureTemplateRoleDto[];
}
