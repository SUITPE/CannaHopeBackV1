import { MedicalReevaluationModel, MedicalReevaluation } from '../../models/medicalReevaluation';
import { ErrorDetail } from '../../models/jsonResp';

export default class MedicalReevaluationController {


    public save(medicalReevaluation: MedicalReevaluationModel): Promise<MedicalReevaluationModel> {
        return new Promise((resolve, reject) => {
            try {

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