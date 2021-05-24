import { uuid } from 'uuidv4';
import ICreateUserDTO from '@module/users/dtos/ICreateUserDTO';
import IUsersRepository from '@module/users/repositories/IUsersRepository';
import User from '@module/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private Users:User[] = []

  public async findById(id: string): Promise<User | undefined> {
    return this.Users.find((item) => item.id === id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.Users.find((item) => item.email === email)
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User | undefined> {
    const user = new User()
    Object.assign(user, {
      id: uuid(), email, name, password,
    })

    this.Users.push(user)
    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.Users.findIndex((findUser) => findUser.id === user.id)
    this.Users[findIndex] = user
    return user
  }
}

export default UsersRepository;
