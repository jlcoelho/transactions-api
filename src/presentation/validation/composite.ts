import {
  type IValidator,
  type IValidationComposite,
} from "@/shared/domain/validators/validator";

export class ValidationComposite implements IValidationComposite {
  constructor(private readonly validators: IValidator[]) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate();
      if (error !== undefined) return error;
    }
  }
}
