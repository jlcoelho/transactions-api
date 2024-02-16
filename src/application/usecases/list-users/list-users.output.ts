import { type User } from "@/domain/entities/user.entity";
import { type Either } from "@/shared/domain/validators/either";
import { type EntityValidationError } from "@/shared/domain/validators/validation.error";

export type ListUsersOutput = {
  id: string;
  name: string;
  document: string;
  typeClient: string;
  email: string;
  balance: number;
  createdAt: Date;
};

export class ListUsersOutputMapper {
  static toOutput(users: User[]): ListUsersOutput[] {
    return users.map((user) => {
      return {
        id: user.entityId.value,
        name: user.name,
        document: user.document.document,
        typeClient: user.document.typeCLient,
        email: user.email,
        balance: user.balance,
        createdAt: user.createdAt,
      };
    });
  }
}

export type ListUsersUseCaseResponse = Either<
  EntityValidationError,
  ListUsersOutput[]
>;
