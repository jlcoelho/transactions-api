import { type IUserRepository } from "@/domain/repositories/user.repository";
import { PrismaUserRepository } from "@/infra/repository/user.repository";

export const makeUserRepository = (): IUserRepository => {
  return new PrismaUserRepository();
};
