import { container } from 'tsyringe';

import IHashProvider from '@module/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@module/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
