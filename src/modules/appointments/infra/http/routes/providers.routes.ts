import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@module/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const monthAvailability = new ProviderMonthAvailabilityController();
const dayAvailability = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  monthAvailability.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  dayAvailability.index,
);

export default providersRouter;
