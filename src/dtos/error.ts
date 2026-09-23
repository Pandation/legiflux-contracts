/** Corps renvoyé par `DomainExceptionFilter` côté API pour toute erreur métier connue. */
export interface DomainErrorResponseDto {
  statusCode: number;
  /** Nom de l'exception du domaine (ex. `"InvalidOtpCodeException"`) — identifie le cas précis, le statut seul ne suffit pas. */
  error: string;
  message: string;
}
