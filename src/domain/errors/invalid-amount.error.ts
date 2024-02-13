export class InvalidAmountError extends Error {
  constructor() {
    super("Insufficient balance error");
    this.name = "InvalidAmountError";
  }
}
