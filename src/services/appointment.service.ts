import { IAppointment } from '../models/appointment.interface';
import { ErrorDetail } from '../models/jsonResp';
import { Appointment } from '../schema/appointment.schema';


export class AppointmentService {

    public async save(appointment: IAppointment): Promise<IAppointment> {
        try {
            return await appointment.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de hacer la consulta para guardar cita medica',
                description: error
            }
            throw errorDetail;
        }
    }

    public async findByDateAndDoctor(idDoctor: string, date: Date): Promise<IAppointment[]> {
        try {
            return await Appointment.find({doctor: idDoctor, date});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de hacer la consulta para guardar cita medica',
                description: error
            }
            throw errorDetail;
        }
    }
}