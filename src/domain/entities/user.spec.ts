import { describe, expect, it } from "vitest";
import { DocumentFactory } from "../factories/document.factory";
import { TypeDocument } from "../enums/type-client.enum";
import { Document } from "../value-objects/document.vo";
import { type UserCreateCommand } from "../inputs/user.input";
import { User } from "./user.entity";

describe("User Unit Test", () => {
  it("should be create user entity", () => {
    const document = DocumentFactory.create({
      document: "122.303.100-46",
      typeDocument: TypeDocument.CPF,
    });
    const input: UserCreateCommand = {
      name: "Lucas",
      email: "lucas_0423@hotmail.com",
      document: document.value as Document,
      password: "123456",
      balance: 1500,
    };

    const user = User.create(input);

    expect(user.value).toBeInstanceOf(User);
    expect((user.value as User).document).toBeInstanceOf(Document);
  });
});
