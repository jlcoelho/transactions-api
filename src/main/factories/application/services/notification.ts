/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type INotificationService } from "@/application/services";
import { NotificationService } from "@/infra/services/notification.service";

export const makeNotificationService = (): INotificationService => {
  return new NotificationService(process.env.NOTIFICATION_SERVICE!);
};
