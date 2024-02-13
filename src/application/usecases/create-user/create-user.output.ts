import { type InvalidDocumentError } from "@/domain/errors";
import { type AlreadExistsError } from "@/shared/application/errors/error";
import { type Either } from "@/shared/domain/validators/either";
import { type EntityValidationError } from "@/shared/domain/validators/validation.error";

export type CreateUserOutput = {
  name: string;
  document: string;
  typeClient: string;
  email: string;
  password: string;
  balance?: number;
  createdAt?: Date;
};

export type CreateUserUseCaseResponse = Either<
  InvalidDocumentError | EntityValidationError | AlreadExistsError,
  CreateUserOutput
>;
