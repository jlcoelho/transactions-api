/* eslint-disable no-useless-catch */
import { Controller } from "./controller";
import { ok, type HttpResponse, badRequest } from "../helpers/http";
import { type IUseCase } from "@/shared/application/usecase/usecase.interface";
import { ValidationBuilder } from "../validation";
import { isLeft } from "@/shared/domain/validators/either";
import { type CreateUserInput } from "@/application/usecases/create-user/create-user.input";
import { type IValidator } from "@/shared/domain/validators/validator";
import { type TypeClient } from "@/domain/enums/type-client.enum";
import { type CreateUserOutput } from "@/application/usecases/create-user/create-user.output";

type HttpRequest = {
  name: string;
  document: string;
  typeClient: TypeClient;
  email: string;
  password: string;
  balance?: number;
};

export class CreateUserController extends Controller {
  constructor(
    private readonly createUserUseCase: IUseCase<
      CreateUserInput,
      CreateUserOutput
    >,
  ) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.createUserUseCase.execute(httpRequest);
      if (isLeft(result)) {
        const error = result.value;

        return badRequest(error);
      }
      const user = result.value;
      return ok(user);
    } catch (error) {
      throw error;
    }
  }

  override buildValidators(httpRequest: HttpRequest): IValidator[] {
    const entries = Object.entries(httpRequest);
    const validation: IValidator[] = [];

    entries.forEach(([fieldName, value]: [string, any]) => {
      if (fieldName !== "balance") {
        validation.push(
          ...ValidationBuilder.of({
            value,
            fieldName,
          })
            .required()
            .build(),
        );
      }
    });
    return validation;
  }
}
