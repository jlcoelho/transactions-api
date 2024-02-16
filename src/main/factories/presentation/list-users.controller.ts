import { ListUsersController } from "@/presentation/controllers/list-users.controller";
import { makeListUsersUseCase } from "../application/usecases/list-users.usecase";

export const makeListUsersController = (): ListUsersController => {
  return new ListUsersController(makeListUsersUseCase());
};
