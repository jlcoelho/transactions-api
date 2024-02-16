import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { type User } from "../entities/user.entity";
import { type BaseRepository } from "@/shared/domain/repository/base.repository";

export interface IUserRepository extends BaseRepository {
  insert(entity: User): Promise<void>;
  update: (entity: User) => Promise<void>;
  findById: (entityId: UniqueEntityID) => Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(take?: number, skip?: number): Promise<User[]>;
}