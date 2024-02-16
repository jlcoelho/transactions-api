import { type Controller } from "@/presentation/controllers/controller";
import { CreateUserController } from "@/presentation/controllers/create-user.controller";
import { makeCreateUserUseCase } from "../application/usecases/create-user.usecase";

export const makeCreateUserController = (): Controller => {
  return new CreateUserController(makeCreateUserUseCase());
};
