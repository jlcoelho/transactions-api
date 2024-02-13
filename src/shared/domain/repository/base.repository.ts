export abstract class BaseRepository {
  abstract transacting(client: unknown): void;
}

export type RepositoryPick<T extends BaseRepository, K extends keyof T> = Pick<
  T,
  K | "transacting"
>;
