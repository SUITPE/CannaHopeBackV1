import { PatientPhModel } from '../models/patientPh';
import { ErrorDetail } from '../models/jsonResp';
import PatientPh from '../models/patientPh';


export class PatientPhService {

    public async save(pateintPh: PatientPhModel): Promise<PatientPhModel> {
        try {
            return await pateintPh.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al guardar historial patologico de paciente',
                description: error
            }
            throw (errorDetail);
        }
    }

    public async update(patientph: PatientPhModel): Promise<PatientPhModel> {
        try {
            return await patientph.updateOne(patientph);
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al guardar historial patologico de paciente',
                description: error
            }
            throw (errorDetail);
        }
    }

    public async findById(id: string): Promise<PatientPhModel> {
        try {
            const founded: any = await PatientPh.findById(id)
            .populate({path:'createdBy updatedBy', select: 'names surenames email'})
            return founded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al consultar historial patologico por id',
                description: error
            }
            throw (errorDetail);
        }
    }

}