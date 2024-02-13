import { type INotificationService } from "@/application/services/notification";

export class NotificationService implements INotificationService {
  constructor(private readonly url: string) {}

  async notify(): Promise<boolean> {
    try {
      const response = await fetch(this.url);
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
