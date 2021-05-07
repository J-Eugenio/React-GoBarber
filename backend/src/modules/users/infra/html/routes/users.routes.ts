import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import CreateUserService from '@module/users/services/CreateUserService'
import UpdateUserAvatarService from '@module/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '@module/users/infra/html/middlewares/ensureAuthenticated'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const usersRepository = new UsersRepository()
  const createUser = new CreateUserService(usersRepository)

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  // delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const usersRepository = new UsersRepository()
      const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

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
  },
)

export default usersRouter
