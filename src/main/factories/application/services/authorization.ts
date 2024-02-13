/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type IAuthorizationService } from "@/application/services";
import { AuthorizationService } from "@/infra/services/authorization.service";

export const makeAuthorizationService = (): IAuthorizationService => {
  return new AuthorizationService(process.env.AUTHORIZATION_SERVICE!);
};
