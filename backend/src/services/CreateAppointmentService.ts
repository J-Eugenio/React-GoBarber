import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */
interface Request{
    provider: string;
    date: Date;
}

class CreateAppointService {

    public async execute({date, provider}: Request): Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already boooked')
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointService