import { type Notification } from "./notification";
import { type IValidationComposite, type IValidator } from "./validator";

export class ValidationComposite implements IValidationComposite {
  constructor(
    private readonly validators: IValidator[],
    private readonly notification?: Notification,
  ) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate();
      if (error !== undefined && this.notification !== undefined) {
        this.notification.addError(error.message, validator.field);
      } else if (error !== undefined && this.notification === undefined) {
        return error;
      }
    }
  }
}
