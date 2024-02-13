import { User } from "@/domain/entities/user.entity";
import { type TypeClient } from "@/domain/enums/type-client.enum";

import { InvalidDocumentError } from "@/domain/errors";
import { DocumentFactory } from "@/domain/factories/document.factory";
import { UniqueEntityID } from "@/shared/domain/unique-entity-id";
import { LoadEntityError } from "@/shared/domain/validators/validation.error";
import { Prisma, type User as UserPrisma } from "@prisma/client";

export class UserModelMapper {
  static toModel(entity: User): UserPrisma {
    return {
      id: entity.entityId.value,
      name: entity.name,
      document: entity.document.document,
      typeClient: entity.document.typeCLient,
      email: entity.email,
      password: entity.password,
      balance: new Prisma.Decimal(entity.balance),
      createdAt: entity.createdAt,
    };
  }

  static toEntity(model: UserPrisma): User {
    const document = DocumentFactory.create({
      document: model.document,
      typeClient: model.typeClient as TypeClient,
    });

    if (document === undefined) {
      throw new InvalidDocumentError();
    }

    const user = new User({
      id: new UniqueEntityID(model.id),
      name: model.name,
      document,
      email: model.email,
      password: model.password,
      balance: model.balance as unknown as number,
      createdAt: model.createdAt,
    });

    user.validate();

    if (user.notification.hasErrors()) {
      throw new LoadEntityError(user.notification.toJSON());
    }

    return user;
  }
}
