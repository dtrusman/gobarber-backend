import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@module/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '@module/notifications/dtos/ICreateNotificationDTO';
import Notification from '@module/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
