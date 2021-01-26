import Appointment from '@module/appointments/infra/typeorm/entites/Appointment'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
    //procura por data iguais ja cadastradas
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date }
        })
        return findAppointment || null
    }
}

export default AppointmentsRepository