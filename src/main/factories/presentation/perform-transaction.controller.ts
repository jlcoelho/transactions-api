import { type Controller } from "@/presentation/controllers/controller";
import { PerformTransactionController } from "@/presentation/controllers/perform-transaction.controller";
import { makePerformTransactionUseCase } from "../application/usecases/perform-transaction.usecase";

export const makePerformTransactionController = (): Controller => {
  return new PerformTransactionController(makePerformTransactionUseCase());
};
