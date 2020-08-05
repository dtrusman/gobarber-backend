import INotificationsRepository from '@module/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '@module/notifications/dtos/ICreateNotificationDTO';
import Notification from '@module/notifications/infra/typeorm/schemas/Notification';
import { ObjectID } from 'mongodb';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {})

    this.notifications.push(notification, { id: new ObjectID(), content, recipient_id });

    return notification;
  }
}

export default FakeNotificationsRepository;
