import { PatientPhModel } from '../models/patientPh';
import { ErrorDetail } from '../models/jsonResp';


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
}