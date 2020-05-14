import { MedicalSpecialityModel } from '../models/medicalSpeciality.interface';
import { ErrorDetail } from '../models/jsonResp';
import { MedicalSpeciality } from '../schema/medicalSpeciality.schema';
import { MedicalSpecialityUpdateDto } from '../dto/medialSpeciality.dto';


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
                    path: 'createdBy updatedBy',
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

    public async update(id: string, medicalSpeciality: MedicalSpecialityUpdateDto): Promise<MedicalSpecialityModel> {
        try {
            const procces: any = await MedicalSpeciality.updateOne({_id: id}, medicalSpeciality);
            const updated: any = await MedicalSpeciality.findById(id)
            .populate({path: 'createdBy updatedBy', select: 'names surenames email'})
            return  updated;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta a la base de datospara actualizar la  especialidades ',
                description: error
            }
            throw errorDetail;
        }
    }

}