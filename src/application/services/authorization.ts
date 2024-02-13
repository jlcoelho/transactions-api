export interface IAuthorizationService {
  authorize(): Promise<boolean>;
}
