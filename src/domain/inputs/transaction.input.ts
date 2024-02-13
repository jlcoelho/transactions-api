import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";

export interface TransactionConstructorProps {
  transactionId?: UniqueEntityID;
  amount: number;
  senderId: string;
  receiverId: string;
  createdAt?: Date;
}

export interface TransactionCreateCommand {
  amount: number;
  senderId: string;
  receiverId: string;
}
