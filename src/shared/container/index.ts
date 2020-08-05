import { container } from 'tsyringe';

import '@module/users/providers';
import './providers';

import IAppointmentRepository from '@module/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@module/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@module/users/repositories/IUsersRepository';
import UserRepository from '@module/users/infra/typeorm/repositories/UserRepository';

import IUserTokensRepository from '@module/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@module/users/infra/typeorm/repositories/UserTokensRepository';

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
