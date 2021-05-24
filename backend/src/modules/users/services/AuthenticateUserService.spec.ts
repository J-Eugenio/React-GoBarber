import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able authenticate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Eugenio',
      email: 'eugeniopb4@gmail.com',
      password: '123123',
    })

    const response = await authenticateUser.execute({
      email: 'eugeniopb4@gmail.com',
      password: '123123',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user);
  })
})
