import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/fakeHashProvider';

import UpdateProfileService from '../UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profie', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Daniel Trus',
      email: 'dtrusman15@gmail.com',
    });

    expect(updatedUser.name).toBe('Daniel Trus');
    expect(updatedUser.email).toBe('dtrusman15@gmail.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non existing',
        name: 'dadsada',
        email: 'dsfasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Daniel Trus',
        email: 'dtrusman@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Daniel Trus',
      email: 'dtrusman15@gmail.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Daniel Trus',
        email: 'dtrusman15@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Daniel trusman',
      email: 'dtrusman@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Daniel Trus',
        email: 'dtrusman15@gmail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
