import { MedicalTreatmentModel } from '../models/medicalTreatment';
import { ErrorDetail } from '../models/jsonResp';


export default class MedicalTreatmentService {

    public async save(medicalTreatament: MedicalTreatmentModel): Promise<MedicalTreatmentModel> {
        try {
            const saved: MedicalTreatmentModel = await medicalTreatament.save();
            return saved;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al guardar tratamiento medico',
                description: error
            }
            throw(errorDetail);
        }
    }

}