/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
import { type IValidator } from "@/shared/domain/validators/validator";
import { InvalidEmailError } from "../errors";

export class ValidateEmail implements IValidator {
  constructor(readonly value: string, readonly fieldName: string) {}

  get field(): string {
    return this.fieldName;
  }

  validate(): Error | undefined {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm",
    );
    if (!emailRegex.test(this.value)) {
      return new InvalidEmailError();
    }
  }
}
