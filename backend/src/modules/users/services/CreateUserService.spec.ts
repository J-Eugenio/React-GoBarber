import FakeUsersRepository from '@module/users/repositories/fakes/FakeUsersRepository';

import CreateUserService from '@module/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      email: 'eugeniopb4@gmail.com',
      name: 'Eugenio',
      password: '123123',
    })

    expect(user).toHaveProperty('id');
  })

  it('should not be able to create a new user withsame email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      email: 'eugeniopb4@gmail.com',
      name: 'Eugenio',
      password: '123123',
    })

    expect(createUser.execute({
      email: 'eugeniopb4@gmail.com',
      name: 'Eugenio',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError)
  })
})
