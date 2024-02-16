import { type IUserRepository } from "@/domain/repositories/user.repository";
import { type IUseCase } from "@/shared/application/usecase/usecase.interface";
import { type ListUsersInput } from "./list-users.input";
import {
  ListUsersOutputMapper,
  type ListUsersOutput,
  type ListUsersUseCaseResponse,
} from "./list-users.output";
import { Left, Right } from "@/shared/domain/validators/either";
import { Notification } from "@/shared/domain/validators/notification";
import { EntityValidationError } from "@/shared/domain/validators/validation.error";

export class ListUsersUseCase
  implements IUseCase<ListUsersInput, ListUsersOutput[]>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: ListUsersInput): Promise<ListUsersUseCaseResponse> {
    const users = await this.userRepository.findAll(input.take, input.skip);

    const notification: Notification = new Notification();

    users.forEach((user) => {
      if (user.notification.hasErrors()) {
        user.notification.copyErrors(notification);
      }
    });

    if (notification.hasErrors()) {
      return new Left(new EntityValidationError(notification.toJSON()));
    }

    return new Right(ListUsersOutputMapper.toOutput(users));
  }
}
