import { ErrorDetail } from '../models/jsonResp';
import { DoctorAvailabilityModel } from '../models/doctorAvailability';
import { DoctorAvailability } from '../schema/DoctorAvailability.schema';


export class DoctorAvailabilityService {


    public async save(doctorAvailability: DoctorAvailabilityModel): Promise<DoctorAvailabilityModel> {
        try {
            return await doctorAvailability.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al guardar en la base de datos',
                description: error
            }
            throw(errorDetail);
        }
    }

    public async findAll(): Promise<DoctorAvailabilityModel[]> {
        try {
            return await DoctorAvailability.find().populate(
                {
                    path: 'doctor',
                    select: 'names surenames email image nickName'
                }
            );
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al consultar franja disponible de paciente',
                description: error
            }
            throw(errorDetail);
        }
    }

    public async findByDoctorId(idDoctor: string): Promise<DoctorAvailabilityModel[]>{
        try {
            return await DoctorAvailability.find({doctor: idDoctor }).populate(
                {
                    path: 'doctor',
                    select: 'names surenames email image nickName'
                }
            );
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al consultar franja disponible de paciente',
                description: error
            }
            throw(errorDetail);
        }
    }
}