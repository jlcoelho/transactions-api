export class Notification {
  errors = new Map<string, string[] | string>();

  addError(error: string, field?: string): void {
    if (field !== null && field !== undefined) {
      const errors = (this.errors.get(field) ?? []) as string[];
      !errors.includes(error) && errors.push(error);
      this.errors.set(field, errors);
    } else {
      this.errors.set(error, error);
    }
  }

  setError(error: string | string[], field?: string): void {
    if (field !== null && field !== undefined) {
      this.errors.set(field, Array.isArray(error) ? error : [error]);
    } else {
      if (Array.isArray(error)) {
        error.forEach((value) => {
          this.errors.set(value, value);
        });
        return;
      }
      this.errors.set(error, error);
    }
  }

  hasErrors(): boolean {
    return this.errors.size > 0;
  }

  copyErrors(notification: Notification): void {
    notification.errors.forEach((value, field) => {
      this.setError(value, field);
    });
  }

  toJSON(): Array<string | Record<string, string[]>> {
    const errors: Array<string | Record<string, string[]>> = [];
    this.errors.forEach((value, key) => {
      if (typeof value === "string") {
        errors.push(value);
      } else {
        errors.push({ [key]: value });
      }
    });
    return errors;
  }
}
