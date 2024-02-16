import { CreateUserUseCase } from "@/application/usecases/create-user/create-user.usecase";
import { makeUserRepository } from "../../infra/user.repository";

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  return new CreateUserUseCase(makeUserRepository());
};
