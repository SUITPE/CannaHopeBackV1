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

    public async find(): Promise<MedicalSpecialityModel[]> {
        try {
            return await MedicalSpeciality.find().populate(
                {
                    path: 'createdBy',
                    select: 'names surenames email'
                }
            )
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta de especialidades en la base de datos',
                description: error
            }
            throw errorDetail;
        }
    }
}