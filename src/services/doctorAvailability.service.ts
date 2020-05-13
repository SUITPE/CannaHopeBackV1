import { ErrorDetail } from '../models/jsonResp';
import { IDoctorAvailability } from '../models/doctorAvailability';


export class DoctorAvailabilityService {


    public async save(doctorAvailability: IDoctorAvailability): Promise<IDoctorAvailability> {
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
}