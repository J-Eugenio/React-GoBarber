import { Router } from 'express'

import appointmentsRouter from '@module/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@module/users/infra/html/routes/users.routes'
import sessionsRouter from '@module/users/infra/html/routes/sessions.routes'

const routes = Router()
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
