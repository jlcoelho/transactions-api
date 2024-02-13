import { TypeClient } from "../enums/type-client.enum";
import { type CreateDocument } from "../inputs/create-document.protocol";
import { CNPJDocument } from "../value-objects/cnpj-document.vo";
import { CPFDocument } from "../value-objects/cpf-document.vo";
import { type Document } from "../value-objects/document.vo";

export class DocumentFactory {
  private static readonly types = {
    [TypeClient.COMMON]: (input: CreateDocument) => new CPFDocument(input),
    [TypeClient.MERCHANT]: (input: CreateDocument) => new CNPJDocument(input),
  };

  static create(input: CreateDocument): Document | undefined {
    const document = DocumentFactory.types[input.typeClient];
    const isValid = document(input).validate();

    return isValid ? document(input) : undefined;
  }
}
