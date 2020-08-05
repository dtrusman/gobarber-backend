import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '@module/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRespository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRespository,
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
