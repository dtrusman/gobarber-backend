import { injectable, inject } from 'tsyringe';

import IUsersRespository from '@module/users/repositories/IUsersRepository';
import User from '@module/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRespository,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;
