/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { User } from "@/domain/entities/user.entity";
import { type IUserRepository } from "@/domain/repositories/user.repository";
import { type IUseCase } from "@/shared/application/usecase/usecase.interface";
import { Right, Left } from "@/shared/domain/validators/either";
import { Transaction } from "@/domain/entities/transaction.entity";
import { type ITransactionRepository } from "@/domain/repositories/transaction.repository";
import { UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { type PerformTransactionInput } from "./perform-transaction.input";
import {
  type RepositoryPick,
  type UnitOfWork,
} from "@/shared/domain/repository";
import {
  type IAuthorizationService,
  type INotificationService,
} from "@/application/services";
import { UnauthorizedError } from "@/shared/application/errors/error";
import {
  type PerformTransactionUseCaseResponse,
  type PerformTransactionOutput,
} from "./perform-transaction.output";
import { TypeClient } from "@/domain/enums/type-client.enum";
import { EntityValidationError } from "@/shared/domain/validators/validation.error";

export class PerformTransactionUseCase
  implements IUseCase<PerformTransactionInput, PerformTransactionOutput>
{
  constructor(
    private readonly unitOfWork: UnitOfWork<{
      userRepository: RepositoryPick<IUserRepository, "update">;
      transactionRepository: RepositoryPick<ITransactionRepository, "insert">;
    }>,
    private readonly userRepository: IUserRepository,
    private readonly authorizationService: IAuthorizationService,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(
    input: PerformTransactionInput,
  ): Promise<PerformTransactionUseCaseResponse> {
    const senderId = new UniqueEntityID(input.payer);
    const receiverId = new UniqueEntityID(input.payee);

    const senderUser = await this.userRepository.findById(senderId);
    const receiverUser = await this.userRepository.findById(receiverId);

    if (!senderUser) {
      return new Left(new NotFoundError(input.payer, User));
    }
    if (!receiverUser) {
      return new Left(new NotFoundError(input.payee, User));
    }

    if (senderId.value === receiverId.value) {
      return new Left(
        new UnauthorizedError("cannot transfer the amount to yourself"),
      );
    }

    if (senderUser.document.typeCLient === TypeClient.MERCHANT) {
      return new Left(
        new UnauthorizedError(
          "it is not possible to transfer the amount to a merchant",
        ),
      );
    }

    const transaction = Transaction.create({
      amount: Number(input.value),
      receiverId: receiverId.value,
      senderId: senderId.value,
    });

    senderUser.updateBalance(Number(transaction.amount), "withdraw");
    receiverUser.updateBalance(Number(transaction.amount), "deposit");

    if (senderUser.notification.hasErrors()) {
      return new Left(
        new EntityValidationError(senderUser.notification.toJSON()),
      );
    }

    if (receiverUser.notification.hasErrors()) {
      return new Left(
        new EntityValidationError(senderUser.notification.toJSON()),
      );
    }

    const isAuthorized = await this.authorizationService.authorize();

    if (!isAuthorized) {
      return new Left(new UnauthorizedError());
    }

    await this.unitOfWork.transaction(
      async ({ userRepository, transactionRepository }) => {
        await userRepository.update(senderUser);
        await userRepository.update(receiverUser);
        await transactionRepository.insert(transaction);
      },
    );

    await this.notificationService.notify();

    return new Right({
      senderId: senderId.value,
      receiverId: receiverId.value,
      amount: input.value,
    });
  }
}
