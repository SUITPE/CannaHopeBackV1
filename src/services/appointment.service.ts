import { IAppointment } from '../models/appointment.interface';
import { ErrorDetail } from '../models/jsonResp';
import { Appointment } from '../schema/appointment.schema';
import { IPaymentDetail } from '../models/paymentDetail.interface';


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

    public async findAll(): Promise<IAppointment[]> {
        try {
            return await Appointment.find()
            .populate({path: 'patient',select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone' } })
            .populate({path: 'doctor', select: 'names surenames email mobilePhone'})
            .populate({path: 'specialty', select: 'name description'})
            .populate('doctorAvailability', 'timeTo timeFrom')
            .populate('createdBy', 'names surenames email')
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de la consulta para cargar todas la citas medicas registradas',
                description: error
            }
            throw errorDetail;
        }
    }
}