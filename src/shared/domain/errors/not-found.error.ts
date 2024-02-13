import { type BaseEntity } from "../base-entity";

export class NotFoundError extends Error {
  constructor(
    id: any[] | any,
    entityClass: new (...args: any[]) => BaseEntity,
  ) {
    const idsMessage = Array.isArray(id) ? id.join(", ") : id;
    super(`${entityClass.name} Not Found using ID ${idsMessage}`);
    this.name = "NotFoundError";
  }
}
