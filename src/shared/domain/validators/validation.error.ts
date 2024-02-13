/* eslint-disable n/handle-callback-err */

export type FieldsErrors = Record<string, string[]> | string;

export abstract class BaseValidationError extends Error {
  constructor(public error: FieldsErrors[], message = "Validation Error") {
    super(message);
  }

  count(): number {
    return Object.keys(this.error).length;
  }
}

export class EntityValidationError extends BaseValidationError {
  constructor(public error: FieldsErrors[]) {
    super(error, "Entity Validation Error");
    this.name = "EntityValidationError";
  }
}

export class LoadEntityError extends BaseValidationError {
  constructor(public error: FieldsErrors[]) {
    super(error, "LoadEntityError");
    this.name = "LoadEntityError";
  }
}
