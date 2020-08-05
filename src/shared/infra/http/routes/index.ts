import { Router } from 'express';
import appointmentsRouter from '@module/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@module/users/infra/http/routes/users.routes';
import sessionRouter from '@module/users/infra/http/routes/sessions.routes';
import passwordRouter from '@module/users/infra/http/routes/password.routes';
import profileRouter from '@module/users/infra/http/routes/profile.routes';
import providersRouter from '@module/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

routes.use('/sessions', sessionRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/providers', providersRouter);

export default routes;
