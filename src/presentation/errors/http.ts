export class ServerError extends Error {
  constructor(error?: Error) {
    super("Server failed. Try again soon");
    this.name = "ServerError";
    if (error !== null && error !== undefined) {
      this.message = error.message;
    }
    this.stack = error?.stack;
  }
}
