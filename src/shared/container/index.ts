import { container } from 'tsyringe';

import '@module/users/providers';
import './providers';

import IAppointmentRepository from '@module/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@module/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@module/users/repositories/IUsersRepository';
import UserRepository from '@module/users/infra/typeorm/repositories/UserRepository';

import IUserTokensRepository from '@module/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@module/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@module/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@module/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
