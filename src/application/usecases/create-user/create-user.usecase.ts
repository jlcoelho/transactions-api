import { User } from "@/domain/entities/user.entity";
import { InvalidDocumentError } from "@/domain/errors";
import { DocumentFactory } from "@/domain/factories/document.factory";
import { type IUserRepository } from "@/domain/repositories/user.repository";
import { type IUseCase } from "@/shared/application/usecase/usecase.interface";
import { Right, Left } from "@/shared/domain/validators/either";
import { EntityValidationError } from "@/shared/domain/validators/validation.error";
import { type CreateUserInput } from "./create-user.input";
import { AlreadExistsError } from "@/shared/application/errors/error";
import {
  type CreateUserOutput,
  type CreateUserUseCaseResponse,
} from "./create-user.output";

export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserUseCaseResponse> {
    const findUser = await this.userRepository.findByEmail(input.email);

    if (findUser !== null) {
      return new Left(new AlreadExistsError("User already exists"));
    }

    const document = DocumentFactory.create({
      document: input.document,
      typeClient: input.typeClient,
    });

    if (document === undefined) {
      return new Left(new InvalidDocumentError());
    }

    const user = User.create({ ...input, document });

    if (user.notification.hasErrors()) {
      return new Left(new EntityValidationError(user.notification.toJSON()));
    }

    await this.userRepository.insert(user);

    return new Right({
      name: user.name,
      document: user.document.document,
      typeClient: user.document.typeCLient,
      email: user.email,
      password: user.password,
      balance: user.balance,
      createdAt: user.createdAt,
    });
  }
}
