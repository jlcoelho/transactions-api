import { ValueObject } from "@/shared/domain/value-object";
import { type TypeClient } from "../enums/type-client.enum";

export abstract class Document extends ValueObject {
  constructor(readonly document: string, readonly typeCLient: TypeClient) {
    super();
  }
  abstract validate(): boolean;
}
