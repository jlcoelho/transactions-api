import { User } from "@/domain/entities/user.entity";
import { type IUserRepository } from "@/domain/repositories/user.repository";
import { UserModelMapper } from "../mappers/user-model.mapper";
import { type UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { PrismaBaseRepository } from "./prisma";

export class PrismaUserRepository
  extends PrismaBaseRepository
  implements IUserRepository
{
  async insert(entity: User): Promise<void> {
    const data = UserModelMapper.toModel(entity);
    await this.uow.user.create({ data });
  }

  async findById(entityId: UniqueEntityID): Promise<User | null> {
    const model = await this.uow.user.findFirst({
      where: { id: entityId.value },
    });
    return model !== null ? UserModelMapper.toEntity(model) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await this.uow.user.findUnique({
      where: { email },
    });
    return model !== null ? UserModelMapper.toEntity(model) : null;
  }

  async update(entity: User): Promise<void> {
    const model = await this.findById(entity.entityId);

    if (model === null) {
      throw new NotFoundError(entity.entityId.value, this.getEntity());
    }

    const userModel = UserModelMapper.toModel(entity);

    await this.uow.user.update({
      data: userModel,
      where: { id: entity.entityId.value },
    });
  }

  async findAll(take: number = 25, skip: number = 0): Promise<User[]> {
    const models = await this.uow.user.findMany({
      take: Number(take),
      skip: Number(skip),
    });
    return models.map((model) => UserModelMapper.toEntity(model));
  }

  getEntity(): new (...args: any[]) => User {
    return User;
  }
}
