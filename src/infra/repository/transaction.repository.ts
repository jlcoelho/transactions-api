import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { type ITransactionRepository } from "@/domain/repositories/transaction.repository";
import { Transaction } from "@/domain/entities/transaction.entity";
import { TransactionModelMapper } from "../mappers/transaction-model.mapper";
import { PrismaBaseRepository } from "./prisma";

export class PrismaTransactionRepository
  extends PrismaBaseRepository
  implements ITransactionRepository
{
  async insert(entity: Transaction): Promise<void> {
    const data = TransactionModelMapper.toModel(entity);
    await this.uow.transaction.create({ data });
  }

  async findById(entityId: UniqueEntityID): Promise<Transaction | null> {
    const model = await this.uow.transaction.findFirst({
      where: { id: entityId.value },
    });
    return model !== null ? TransactionModelMapper.toEntity(model) : null;
  }

  async update(entity: Transaction): Promise<void> {}

  getEntity(): new (...args: any[]) => Transaction {
    return Transaction;
  }
}
