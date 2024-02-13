export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    const message =
      fieldName === undefined
        ? "Field required"
        : `The field ${fieldName} is required`;
    super(message);
    this.name = "RequiredFieldError";
  }
}

export class AlreadExistsError extends Error {
  constructor(message?: string) {
    super(message ?? "Entity already exists");
    this.name = "AlreadExistsError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? "Unauthorized");
    this.name = "UnauthorizedError";
  }
}
