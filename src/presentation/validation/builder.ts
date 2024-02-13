import { type IValidator } from "@/shared/domain/validators/validator";
import { Required, RequiredString } from "./required";

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: IValidator[] = [],
  ) {}

  static of({
    value,
    fieldName,
  }: {
    value: any;
    fieldName: string;
  }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(): this {
    if (typeof this.value === "string") {
      this.validators.push(new RequiredString(this.value, this.fieldName));
    } else {
      this.validators.push(new Required(this.value, this.fieldName));
    }
    return this;
  }

  build(): IValidator[] {
    return this.validators;
  }
}
