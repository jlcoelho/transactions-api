import { type UnauthorizedError } from "@/shared/application/errors/error";
import { type NotFoundError } from "@/shared/domain/errors/not-found.error";
import { type Either } from "@/shared/domain/validators/either";

export type PerformTransactionOutput = {
  senderId: string;
  receiverId: string;
  amount: number;
};

export type PerformTransactionUseCaseResponse = Either<
  NotFoundError | UnauthorizedError,
  PerformTransactionOutput
>;
