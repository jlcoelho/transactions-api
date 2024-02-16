import { PrismaUnitOfWork } from "@/infra/repository/prisma";
import { prisma } from "@/main/config/prisma";
import {
  type UnitOfWork,
  type BaseRepository,
} from "@/shared/domain/repository";

export const makeUnitOfWork = <
  Repositories extends Record<string, BaseRepository>,
>(
  repositories: Repositories,
): UnitOfWork<Repositories> => {
  return new PrismaUnitOfWork<Repositories>(prisma, repositories);
};
