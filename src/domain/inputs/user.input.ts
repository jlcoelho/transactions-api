import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { type Document } from "../value-objects/document.vo";

export type UserConstructor = {
  id?: UniqueEntityID;
  name: string;
  document: Document;
  email: string;
  password: string;
  balance?: number;
  createdAt?: Date;
};

export type UserCreateCommand = {
  name: string;
  document: Document;
  email: string;
  password: string;
  balance?: number;
};
