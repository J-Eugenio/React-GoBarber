import User from '@module/users/infra/typeorm/entities/User'
import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User | undefined> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const pashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: pashedPassword,
    })

    return user
  }
}

export default CreateUserService
