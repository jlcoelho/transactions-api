import { AggregateRoot } from "@/shared/domain/aggregate-root";
import { type Document } from "../value-objects/document.vo";
import {
  type UserConstructor,
  type UserCreateCommand,
} from "../inputs/user.input";
import { type IValidator } from "@/shared/domain/validators/validator";
import { AllowedMinimumBalance } from "../validators/allowed-minimun-balance";
import { ValidationComposite } from "@/shared/domain/validators/composite";
import { ValidateEmail } from "../validators/validate-email";
// import { ValidationComposite } from "@/shared/domain/composite";
// import { type IValidator } from "@/shared/domain/validator";
// import { AllowedMinimumBalance } from "../validators/allowed-minimun-balance";

export class User extends AggregateRoot {
  private readonly _name: string;
  private readonly _document: Document;
  private readonly _email: string;
  private readonly _password: string;
  private _balance: number;
  private readonly _createdAt: Date;

  constructor(user: UserConstructor) {
    super(user.id);
    this._name = user.name;
    this._document = user.document;
    this._email = user.email;
    this._password = user.password;
    this._balance = user.balance ?? 0;
    this._createdAt = user.createdAt ?? new Date();
  }

  static create(input: UserCreateCommand): User {
    const entity = new User(input);
    entity.validate();
    return entity;
  }

  get name(): string {
    return this._name;
  }

  get document(): Document {
    return this._document;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get balance(): number {
    return this._balance;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  public validate(): void {
    const validators: IValidator[] = [];

    validators.push(new AllowedMinimumBalance(this._balance, "balance"));
    validators.push(new ValidateEmail(this._email, "email"));
    const validation = new ValidationComposite(validators, this.notification);
    validation.validate();
  }

  updateBalance(amount: number, operationType: string): void {
    if (operationType === "withdraw")
      this._balance = Number(this._balance) - Number(amount);
    else if (operationType === "deposit")
      this._balance = Number(this._balance) + Number(amount);
    this.validate();
  }

  toJSON(): any {
    return {
      id: this.id.value,
      document: this._document.document,
      typeClient: this._document.typeCLient,
      email: this._email,
      password: this._password,
      balance: this._balance,
      createdAt: this._createdAt,
    };
  }
}
