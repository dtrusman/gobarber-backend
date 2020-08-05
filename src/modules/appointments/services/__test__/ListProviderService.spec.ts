import FakeUsersRepository from '@module/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from '../ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Daniel trusman 1',
      email: 'dtrusman17@gmail.com',
      password: '123456',
    });

    const loggerUser = await fakeUsersRepository.create({
      name: 'Daniel trusman 17',
      email: 'dtrusman18@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggerUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
