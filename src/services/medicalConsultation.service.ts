import { ErrorDetail } from '../models/jsonResp';
import { MedicalConsultation, MedicalConsultationModel } from '../models/medicalConsultation';
import { MedicalDiagnosticModel } from '../models/medicalDiagnostic';


export default class MedicalConsultationService {


    public async updateMedicaDiagnostic(idConsultation: string, medicalDiagnostic: MedicalDiagnosticModel): Promise<boolean> {
        try {
            const updated: any = await MedicalConsultation.updateOne({ _id: idConsultation }, { medicalDiagnostic })
            return true;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta a la base de datos al actualizar reevaluación',
                description: error
            }
            throw errorDetail;
        }
    }
    public async findById(id: string): Promise<MedicalConsultationModel> {
        try {
            const founded: any = await MedicalConsultation.findById(id)
                .populate({ path: 'doctor', select: 'names surenames specialty signatureImage doctorCmp', populate:{path: 'specialty', select: 'name'} })
                .populate({ path: 'patient', select: 'reasonAdmission reasonAdmission numberOfAppointment', populate: {path:'user', select: 'names surenames age document email signatureImage'}});
            return founded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta a la base de datos para obtener consulta medica por id',
                description: error
            }
            throw errorDetail;
        }
    }
}