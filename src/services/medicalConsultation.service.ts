import { ErrorDetail } from '../models/jsonResp';
import { MedicalConsultation } from '../models/medicalConsultation';
import { MedicalDiagnosticModel } from '../models/medicalDiagnostic';


export default class MedicalConsultationService {


    public async updateMedicaDiagnostic(idConsultation: string, medicalDiagnostic: MedicalDiagnosticModel): Promise<boolean> {
        try {
            const updated: any = await MedicalConsultation.updateOne({_id: idConsultation}, {medicalDiagnostic})
            return true;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta a la base de datos al actualizar reevaluación',
                description: error
            }
            throw errorDetail;
        }
    }
}