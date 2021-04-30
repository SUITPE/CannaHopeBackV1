import { IAppointment } from '../models/appointment.interface';
import { ErrorDetail } from '../models/jsonResp';
import { Appointment } from '../schema/appointment.schema';
import { AppointmentUpdateDto } from '../dto/appointment.dto';
import { AppointmentData } from '../models/appointment.model';


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

    public async findPatientsNotEvaluated(idDoctor: string, dateString: string, role: any): Promise<IAppointment[]> {
        try {
            if (role == 'Administrador') {
                return await Appointment.find({ dateString: {$lt: dateString}, status: 'ADMITIDA'})
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email')
                    .sort({date: -1 }).exec()
            }
            return await Appointment.find({ doctor: idDoctor, dateString: {$lt: dateString}, status: 'ADMITIDA'})
                .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                .populate({ path: 'specialty', select: 'name description' })
                .populate('doctorAvailability', 'timeTo timeFrom')
                .populate('createdBy', 'names surenames email')
                .sort({date: -1 }).exec()
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de hacer la consulta para guardar cita medica',
                description: error
            }
            throw errorDetail;
        }
    }

    public async findByDateAndDoctor(idDoctor: string, dateString: string): Promise<IAppointment[]> {
        try {
          //  return await Appointment.find({ doctor: idDoctor, dateString: /dateString/, status: {$ne: 'VENCIDA'}})
            return await Appointment.find({ doctor: idDoctor, dateString: { $regex: dateString }, status: {$ne: 'VENCIDA'}})
                .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                .populate({ path: 'specialty', select: 'name description' })
                .populate('doctorAvailability', 'timeTo timeFrom')
                .populate('createdBy', 'names surenames email')
                .sort({date: -1 }).exec()
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
                .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document image sex' } })
                .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                .populate({ path: 'specialty', select: 'name description' })
                .populate('doctorAvailability', 'timeTo timeFrom')
                .populate('createdBy', 'names surenames email')
                .sort({date: -1 }).exec()
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de la consulta para cargar todas la citas medicas registradas',
                description: error
            }
            throw errorDetail;
        }
    }

    public async updateStatus(id: string, status: string): Promise<boolean> {
        try {
            const updated: any = await Appointment.updateOne({ _id: id }, { status });
            return true;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al momento de actualizar estado de consulta',
                description: error
            }
            throw errorDetail;
        }
    }

    public async findById(id: string): Promise<AppointmentData> {
        try {
            const founded: any = await Appointment.findById(id)
                .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                .populate({ path: 'specialty', select: 'name description' })
                .populate('doctorAvailability', 'timeTo timeFrom')
                .populate('createdBy', 'names surenames email');
            return founded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al momento de actualizar estado de consulta',
                description: error
            }
            throw errorDetail;
        }
    }

    public async update(_id: string, appointment: AppointmentUpdateDto): Promise<any> {
        try {
            return Appointment.updateOne({ _id }, appointment);
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al actualizar consulta',
                description: error
            }
            throw errorDetail;
        }
    }

    public async findByDoctor(id: string): Promise<IAppointment[]> {
        try {
            return await Appointment.find({ doctor: id })
                .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                .populate({ path: 'specialty', select: 'name description' })
                .populate('doctorAvailability', 'timeTo timeFrom')
                .populate('createdBy', 'names surenames email')
                .sort({date: -1 }).exec();
                
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al cargar consultas por id de doctor',
                description: error
            }
            throw errorDetail;
        }
    }

    public async deleteById(id: string): Promise<any> {
        try {
            return await Appointment.deleteOne({ _id: id });
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta a la base de datos pára eliminar consulta',
                description: error
            }
            throw errorDetail;
        }
    }

    public async updatePaymentStatus(id: string, paymentStatus: string): Promise<boolean> {
        try {
            return await Appointment.updateOne({_id: id}, {paymentStatus});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al momento de actualizar estado de consulta',
                description: error
            }
            throw errorDetail;
        }
    }

    public async updatePaymentData(id: string, paymentData: any): Promise<boolean> {
        try {
            return await Appointment.updateOne({_id: id}, {paymentData});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al momento de actualizar estado de consulta',
                description: error
            }
            throw errorDetail;
        }
    }

    public async getByDateString(date: string): Promise<IAppointment[]> {
        try {
            return await Appointment.find({dateString: date})
            .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
            .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
            .populate({ path: 'specialty', select: 'name description' })
            .populate({path: 'doctorAvailability', select:'timeTo timeFrom'})
            .populate('createdBy', 'names surenames email')
            .sort({date: -1})
            .exec()
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al cargar  consultas registradas',
                description: error
            }
            throw errorDetail;
        }
    }
}