import { type BaseRepository } from "@/shared/domain/repository";
import { type Transaction } from "../entities/transaction.entity";
import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";

export interface ITransactionRepository extends BaseRepository {
  insert(entity: Transaction): Promise<void>;
  update: (entity: Transaction) => Promise<void>;
  findById: (entityId: UniqueEntityID) => Promise<Transaction | null>;

  getEntity: () => new (...args: any[]) => Transaction;
}
