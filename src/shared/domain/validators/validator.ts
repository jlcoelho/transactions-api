export interface IValidator extends IValidationComposite {
  get field(): string;
}

export interface IValidationComposite {
  validate(): Error | undefined;
}
