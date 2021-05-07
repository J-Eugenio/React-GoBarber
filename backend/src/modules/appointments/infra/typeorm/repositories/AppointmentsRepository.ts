import Appointment from '@module/appointments/infra/typeorm/entites/Appointment';
import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@module/appointments/repositories/IAppointmentsRepository';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository {
  // procura por data iguais ja cadastradas
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment;
  }
}

export default AppointmentsRepository;
