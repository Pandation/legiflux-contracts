// Une Command = ce que legiflux envoie à legiflux-api pour une écriture (voir
// la convention CQRS de legiflux-api). Exemple à remplacer par les Commands
// réelles au fur et à mesure des tickets.
export interface CreateDossierCommand {
  reference: string;
}
