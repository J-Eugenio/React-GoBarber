import { getRepository, Repository } from 'typeorm';
import Appointment from '@module/appointments/infra/typeorm/entites/Appointment';

import IAppointmentsRepository from '@module/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@module/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  // procura por data iguais ja cadastradas
  public async findByDate(data: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { data },
    });
    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment)
    return appointment
  }
}

export default AppointmentsRepository;
