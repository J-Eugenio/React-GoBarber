import Appointment from '@module/appointments/infra/typeorm/entites/Appointment';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@module/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@module/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Array<Appointment> = [];

  // procura por data iguais ja cadastradas
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) => isEqual(appointment.date, date))

    return findAppointment
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment;
  }
}

export default AppointmentsRepository;
