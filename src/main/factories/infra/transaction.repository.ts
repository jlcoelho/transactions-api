import { type ITransactionRepository } from "@/domain/repositories/transaction.repository";
import { PrismaTransactionRepository } from "@/infra/repository/transaction.repository";

export const makeTransactionRepository = (): ITransactionRepository => {
  return new PrismaTransactionRepository();
};
