import { type IAuthorizationService } from "@/application/services/authorization";

export class AuthorizationService implements IAuthorizationService {
  constructor(private readonly url: string) {}

  async authorize(): Promise<boolean> {
    try {
      const response = await fetch(this.url);
      const responseJson = await response.json();
      return responseJson.message === "Autorizado";
    } catch {
      return false;
    }
  }
}
