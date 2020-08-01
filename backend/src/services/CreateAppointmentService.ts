import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'

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
    private appointmentsRepository: AppointmentRepository
    constructor(appointmentsRepository: AppointmentRepository){
        this.appointmentsRepository = appointmentsRepository
    }

    public execute({date, provider}: Request): Appointment{
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already boooked')
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        })
        return appointment
    }
}

export default CreateAppointService