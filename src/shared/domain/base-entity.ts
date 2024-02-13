import { Notification } from "./validators/notification";
import { UniqueEntityID } from "./unique-entity-id";

export abstract class BaseEntity {
  protected id: UniqueEntityID;
  notification: Notification = new Notification();

  constructor(id?: UniqueEntityID) {
    this.id = id ?? new UniqueEntityID();
  }

  get entityId(): UniqueEntityID {
    return this.id;
  }

  abstract toJSON(): any;
}
