import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment'

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    //vetor que recebe os dados
    private appointments: Appointment[]

    constructor() {
        //inicializa o vetor
        this.appointments = []
    }

    //retorna todos os dados do vetor
    public all(): Appointment[]{
        return this.appointments
    }

    //procura por data iguais ja cadastradas
    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date)
        )

        return findAppointment || null
    }

    public create({provider, date}: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date})
        this.appointments.push(appointment)

        return appointment
    }
}

export default AppointmentsRepository