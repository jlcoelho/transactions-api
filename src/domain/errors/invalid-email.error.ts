export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message ?? "Invalid Email Error");
    this.name = "InvalidEmailError";
  }
}
