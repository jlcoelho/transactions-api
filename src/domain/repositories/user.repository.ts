// import { type IRepository } from "@/shared/domain/repository/repository.interface";
import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { type User } from "../entities/user.entity";
// import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";

import { type BaseRepository } from "@/shared/domain/repository/base.repository";

// export interface IUserRepository extends IRepository<User, UniqueEntityID> {
//   findByEmail(email: string): Promise<User | null>;
// }

export interface IUserRepository extends BaseRepository {
  insert(entity: User): Promise<void>;
  update: (entity: User) => Promise<void>;
  findById: (entityId: UniqueEntityID) => Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
