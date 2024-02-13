import { type TypeClient } from "@/domain/enums/type-client.enum";

export type CreateUserInput = {
  name: string;
  document: string;
  typeClient: TypeClient;
  email: string;
  password: string;
  balance?: number;
};
