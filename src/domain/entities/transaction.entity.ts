import { AggregateRoot } from "@/shared/domain/aggregate-root";
import {
  type TransactionConstructorProps,
  type TransactionCreateCommand,
} from "../inputs/transaction.input";

export class Transaction extends AggregateRoot {
  private readonly _amount: number;
  private readonly _senderId: string;
  private readonly _receiverId: string;
  private readonly _createdAt: Date;

  constructor(props: TransactionConstructorProps) {
    super();
    this._amount = Math.abs(props.amount);
    this._senderId = props.senderId;
    this._receiverId = props.receiverId;
    this._createdAt = props.createdAt ?? new Date();
  }

  static create(props: TransactionCreateCommand): Transaction {
    const transaction = new Transaction(props);
    return transaction;
  }

  get amount(): number {
    return this._amount;
  }

  get senderId(): string {
    return this._senderId;
  }

  get receiverId(): string {
    return this._receiverId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  toJSON(): any {}
}
