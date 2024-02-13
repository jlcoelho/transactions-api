/* eslint-disable no-useless-catch */
import { Controller } from "./controller";
import {
  ok,
  type HttpResponse,
  badRequest,
  unauthorized,
} from "../helpers/http";
import { type IUseCase } from "@/shared/application/usecase/usecase.interface";
import { ValidationBuilder } from "../validation";
import { isLeft } from "@/shared/domain/validators/either";
import { type IValidator } from "@/shared/domain/validators/validator";
import { type PerformTransactionInput } from "@/application/usecases/perform-transaction/perform-transaction.input";
import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { UnauthorizedError } from "@/shared/application/errors/error";
import { type PerformTransactionOutput } from "@/application/usecases/perform-transaction/perform-transaction.output";
import { EntityValidationError } from "@/shared/domain/validators/validation.error";

type HttpRequest = {
  value: number;
  payer: string;
  payee: string;
};

export class PerformTransactionController extends Controller {
  constructor(
    private readonly performTransactionUseCase: IUseCase<
      PerformTransactionInput,
      PerformTransactionOutput
    >,
  ) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.performTransactionUseCase.execute(httpRequest);
      if (isLeft(result)) {
        const error = result.value;

        if (error instanceof UnauthorizedError) {
          return unauthorized(error);
        } else if (
          error instanceof EntityValidationError ||
          error instanceof NotFoundError
        ) {
          return badRequest(error);
        } else {
          throw error;
        }
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
      validation.push(
        ...ValidationBuilder.of({
          value,
          fieldName,
        })
          .required()
          .build(),
      );
    });
    return validation;
  }
}
