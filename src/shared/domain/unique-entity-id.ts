import { randomUUID } from "node:crypto";
import { ValueObject } from "./value-object";
import { InvalidUuidError } from "./errors/invalid-uuid.error";

export class UniqueEntityID extends ValueObject {
  private readonly id: string;

  constructor(value?: string) {
    super();
    this.id = value ?? randomUUID();
    this.validate();
  }

  get value(): string {
    return this.id;
  }

  private validate(): void {
    const regex = /^[a-z,0-9,-]{36,36}$/;
    if (!regex.test(this.id)) {
      throw new InvalidUuidError();
    }
  }
}
