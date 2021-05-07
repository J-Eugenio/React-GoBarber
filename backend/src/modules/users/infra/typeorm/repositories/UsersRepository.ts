import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@module/users/dtos/ICreateUserDTO';
import IUsersRepository from '@module/users/repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } })
    return user
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create({ email, name, password });
    await this.ormRepository.save(user)
    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository;
