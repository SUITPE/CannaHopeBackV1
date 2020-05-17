import { MedicalReevaluationModel, MedicalReevaluation } from '../../models/medicalReevaluation';
import { ErrorDetail } from '../../models/jsonResp';
import { MedicalConsultation, MedicalConsultationModel } from '../../models/medicalConsultation';
import MedicalConsultationController from './medicalConsultation';
import MedicalConsultationService from '../../services/medicalConsultation.service';

export default class MedicalReevaluationController {


    public save(medicalReevaluation: any): Promise<MedicalReevaluationModel> {
        return new Promise(async (resolve, reject) => {
            const medicalConsultationCtr: MedicalConsultationController = new MedicalConsultationController();
            const medicalCOnsultationSrv: MedicalConsultationService = new MedicalConsultationService();
            try {

                const medicalConsultation: MedicalConsultationModel = await medicalConsultationCtr.findById(medicalReevaluation.medicalConsultation);
                medicalConsultation.reevaluations.push(medicalReevaluation);
                const medicalConsultationUpdated: boolean = await medicalConsultationCtr.updateReevaluation(medicalConsultation.reevaluations, medicalConsultation._id)
                // medicalConsultation.medicalDiagnostic.medicalTreatment = medicalReevaluation.medicalTreatment;
                medicalConsultation.medicalDiagnostic.medicalTreatment.push(...medicalReevaluation.medicalTreatment);

                const medicalTreatamentUpdated: boolean = await medicalCOnsultationSrv.updateMedicaDiagnostic(medicalConsultation._id, medicalConsultation.medicalDiagnostic);
                const newMedicalReevaluation: MedicalReevaluationModel = new MedicalReevaluation({
                    medicalConsultation: medicalReevaluation.medicalConsultation,
                    description: medicalReevaluation.description,
                    createDate: medicalReevaluation.createDate
                });

                newMedicalReevaluation.save({}, (error, medicalRevaluiationSaved) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al guardar reevaluacion medica',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(medicalRevaluiationSaved);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}