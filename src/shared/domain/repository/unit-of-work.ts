import { type BaseRepository } from "./base.repository";

export type Transaction = unknown;

export interface UnitOfWork<
  Repositories extends Record<string, BaseRepository>,
> {
  transaction: <T = unknown>(
    fn: (repositories: Repositories) => Promise<T>,
  ) => Promise<T>;
}
