import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existent email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(
      createUser.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
