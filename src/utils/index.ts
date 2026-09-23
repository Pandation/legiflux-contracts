// Fonctions PURES uniquement : aucun import de Next.js, de NestJS, d'un ORM,
// du DOM ou de quoi que ce soit qui suppose un environnement précis. Elles
// doivent tourner identiquement côté navigateur, côté Next.js serveur, et
// côté NestJS. Si une fonction a besoin d'infrastructure, elle n'a rien à
// faire ici — elle appartient à `infrastructure/` du repo qui l'utilise.
import {
  SELF_SERVICE_PARTICIPANT_ROLES,
  type SelfServiceParticipantRole,
} from "../commands/auth";

export function isSelfServiceParticipantRole(
  value: string,
): value is SelfServiceParticipantRole {
  return (SELF_SERVICE_PARTICIPANT_ROLES as readonly string[]).includes(value);
}
