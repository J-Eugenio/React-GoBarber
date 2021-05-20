import { Request, Response } from 'express';
import CreateUserService from '@module/users/services/CreateUserService'

import { container } from 'tsyringe';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    // delete user.password

    return response.json(user)
  }
}
