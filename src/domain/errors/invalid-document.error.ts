export class InvalidDocumentError extends Error {
  constructor(message?: string) {
    super(message ?? "Invalid Document Error");
    this.name = "InvalidDocumentError";
  }
}
