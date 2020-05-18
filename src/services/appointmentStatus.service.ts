import { AppointmentStatusInterface, AppointmentStatus } from '../schema/appointmentStatus.schema';
import { ErrorDetail } from '../models/jsonResp';




export class AppointmentStatusService {


    public async findAll(): Promise<AppointmentStatusInterface[]> {
        try {
            return await AppointmentStatus.find();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta de base de datos - consultar lista de estados de conulta(appointmentStatus)',
                description: error
            }
            throw errorDetail;
        }
    }
}