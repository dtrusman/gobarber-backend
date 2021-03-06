import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/fakeHashProvider';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('Create Services', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Daniel Trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Daniel Trusman');
    expect(user.email).toBe('dtrusman@gmail.com');
    expect(user.password).toBeTruthy();
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Daniel Trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Daniel Trusman',
        email: 'dtrusman@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
