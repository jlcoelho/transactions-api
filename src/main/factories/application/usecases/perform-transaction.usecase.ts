import { PerformTransactionUseCase } from "@/application/usecases/perform-transaction/perform-transaction.usecase";

import { makeTransactionRepository } from "../../infra/transaction.repository";
import { makeUserRepository } from "../../infra/user.repository";
import { makeUnitOfWork } from "../../infra/unit-of-work.factory";
import { makeNotificationService } from "../services/notification";
import { makeAuthorizationService } from "../services/authorization";

export const makePerformTransactionUseCase = (): PerformTransactionUseCase => {
  const userRepository = makeUserRepository();
  const transactionRepository = makeTransactionRepository();
  const unitOfWork = makeUnitOfWork({ userRepository, transactionRepository });
  const authorizationService = makeAuthorizationService();
  const notificationService = makeNotificationService();

  return new PerformTransactionUseCase(
    unitOfWork,
    userRepository,
    authorizationService,
    notificationService,
  );
};
