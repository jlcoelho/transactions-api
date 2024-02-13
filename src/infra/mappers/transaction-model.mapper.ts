import { Transaction } from "@/domain/entities/transaction.entity";
import { UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { Prisma, type Transaction as TransactionPrisma } from "@prisma/client";

export class TransactionModelMapper {
  static toModel(entity: Transaction): TransactionPrisma {
    return {
      id: entity.entityId.value,
      amount: new Prisma.Decimal(entity.amount),
      receiverId: entity.receiverId,
      senderId: entity.senderId,
      createdAt: entity.createdAt,
    };
  }

  static toEntity(model: TransactionPrisma): Transaction {
    return new Transaction({
      transactionId: new UniqueEntityID(model.id),
      amount: model.amount as unknown as number,
      receiverId: model.receiverId,
      senderId: model.senderId,
      createdAt: model.createdAt,
    });
  }
}
