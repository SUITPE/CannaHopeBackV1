import { MedicalSpecialityModel } from '../models/medicalSpeciality.interface';
import { ErrorDetail } from '../models/jsonResp';
import { MedicalSpeciality } from '../schema/medicalSpeciality.schema';


export class MedicalSpecialityService {


    public async save(medicalSpeciality: MedicalSpecialityModel): Promise<MedicalSpecialityModel> {
        try {
            return await medicalSpeciality.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al consultar la base de datos para guardar especialidad',
                description: error
            }
            throw errorDetail;
        }
    }
}