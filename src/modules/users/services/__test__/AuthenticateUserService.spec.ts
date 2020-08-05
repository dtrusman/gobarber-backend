import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/fakeHashProvider';
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('Authenticate Services', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Daniel',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with none existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'dtrusman@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate to wrong password', async () => {
    await createUser.execute({
      name: 'Daniel',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'dtrusman@gmail.com',
        password: 'wrongpwd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
