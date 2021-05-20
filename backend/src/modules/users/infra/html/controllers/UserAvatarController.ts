import { Request, Response } from 'express';

import UpdateUserAvatarService from '@module/users/services/UpdateUserAvatarService'
import { container } from 'tsyringe';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService)

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      })

      // delete user.password

      return response.json(user)
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      })
    }
  }
}
