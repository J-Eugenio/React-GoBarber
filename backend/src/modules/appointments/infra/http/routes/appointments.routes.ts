import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '@module/appointments/repositories/AppointmentsRepository'
import CreateAppointmentService from '@module/appointments/services/CreateAppointmentService'

import ensureAuthenticated from '@module/users/infra/html/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()
    return response
        .status(200)
        .json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id
    })
    return response.json(appointment)
})
export default appointmentsRouter