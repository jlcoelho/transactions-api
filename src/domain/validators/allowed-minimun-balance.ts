import { type IValidator } from "@/shared/domain/validators/validator";
import { InvalidAmountError } from "../errors";

export class AllowedMinimumBalance implements IValidator {
  constructor(readonly value: number, readonly fieldName: string) {}

  get field(): string {
    return this.fieldName;
  }

  validate(): Error | undefined {
    if (this.value < 0) return new InvalidAmountError();
  }
}
