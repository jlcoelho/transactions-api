import { type TypeClient } from "../enums/type-client.enum";

export type CreateDocument = {
  document: string;
  typeClient: TypeClient;
};

export type ConstructorDocument = {
  document: string;
  typeClient: TypeClient;
};
