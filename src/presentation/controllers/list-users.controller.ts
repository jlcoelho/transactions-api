/* eslint-disable no-useless-catch */
import { Controller } from "./controller";
import { ok, type HttpResponse, badRequest } from "../helpers/http";
import { type IUseCase } from "@/shared/application/usecase/usecase.interface";
import { ValidationBuilder } from "../validation";
import { isLeft } from "@/shared/domain/validators/either";
import { type IValidator } from "@/shared/domain/validators/validator";
import { type ListUsersInput } from "@/application/usecases/list-users/list-users.input";
import { type ListUsersOutput } from "@/application/usecases/list-users/list-users.output";

type HttpRequest = {
  take: number;
  skip: number;
};

export class ListUsersController extends Controller {
  constructor(
    private readonly listUsersUseCase: IUseCase<
      ListUsersInput,
      ListUsersOutput[]
    >,
  ) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.listUsersUseCase.execute(httpRequest);
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
    const { take, skip } = httpRequest;

    return [
      ...ValidationBuilder.of({ value: take, fieldName: "take" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: skip, fieldName: "skip" })
        .required()
        .build(),
    ];
  }
}
