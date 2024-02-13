import { type IValidator } from "@/shared/domain/validators/validator";
import { type HttpResponse, badRequest, serverError } from "../helpers/http";
import { ValidationComposite } from "../validation";

export abstract class Controller {
  abstract perform(httpRequest: any): Promise<HttpResponse>;

  buildValidators(httpRequest: any): IValidator[] {
    return [];
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest);
    if (error !== undefined) return badRequest(error);
    try {
      return await this.perform(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest);
    return new ValidationComposite(validators).validate();
  }
}
