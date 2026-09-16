// Exemple à remplacer par les DTOs réels du domaine "dossier" dès le premier
// contrat concret partagé entre legiflux et legiflux-api. Un DTO = la forme
// d'une ressource telle qu'elle traverse le réseau (pas l'entité du domaine
// côté legiflux-api, qui peut avoir des méthodes/invariants que le DTO n'a pas).
export interface DossierDTO {
  id: string;
  reference: string;
  status: string;
  createdAt: string; // ISO 8601 — jamais un objet Date à travers la frontière réseau
}
