import Appointment from '@module/appointments/infra/typeorm/entites/Appointment'
import AppointmentRepository from '@module/appointments/repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'


interface Request{
    provider_id: string;
    date: Date;
}

class CreateAppointService {

    public async execute({date, provider_id}: Request): Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already boooked')
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointService