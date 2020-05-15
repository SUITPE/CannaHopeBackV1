import { IAppointment } from '../models/appointment.interface';
import { ErrorDetail } from '../models/jsonResp';


export class AppointmentService {


    public async save(appointment: IAppointment): Promise<IAppointment> {
        try {
            console.log(appointment);
            return await appointment.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de hacer la consulta para guardar cita medica',
                description: error
            }
            throw errorDetail;
        }
    }
}