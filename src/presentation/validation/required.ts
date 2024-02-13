import { type IValidator } from "@/shared/domain/validators/validator";
import { RequiredFieldError } from "../errors";

export class Required implements IValidator {
  constructor(readonly value: any, readonly fieldName: string) {}

  get field(): string {
    return this.fieldName;
  }

  validate(): Error | undefined {
    if (this.value === null || this.value === undefined) {
      return new RequiredFieldError(this.fieldName);
    }
  }
}

export class RequiredString extends Required {
  constructor(
    override readonly value: string,
    override readonly fieldName: string,
  ) {
    super(value, fieldName);
  }

  override validate(): Error | undefined {
    if (super.validate() !== undefined || this.value === "") {
      return new RequiredFieldError(this.fieldName);
    }
  }
}
