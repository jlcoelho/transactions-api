import { ListUsersUseCase } from "@/application/usecases/list-users/list-users.usecase";
import { makeUserRepository } from "../../infra/user.repository";

export const makeListUsersUseCase = (): ListUsersUseCase => {
  return new ListUsersUseCase(makeUserRepository());
};
