import { MedicalEvaluationModel, MedicalEvaluation } from '../../models/medicalEvaluation';
import { ErrorDetail } from '../../models/jsonResp';

export default class MedicalEvaluationController {



    public save(medialEvaluation: MedicalEvaluationModel): Promise<MedicalEvaluationModel> {
        return new Promise((resolve, reject) => {
            try {

                const newMedicalEvaluation: MedicalEvaluationModel = new MedicalEvaluation({
                    patient: medialEvaluation.patient,
                    doctor: medialEvaluation.doctor,
                    anamnesis: medialEvaluation.anamnesis,
                    clinicalExamination: medialEvaluation.clinicalExamination,
                    ectoscopy: medialEvaluation.ectoscopy,
                    mentalStatus: medialEvaluation.mentalStatus,
                    createDate: medialEvaluation.createDate
                });

                newMedicalEvaluation.save({}, (error, medicalEvaluationSaved) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error en registro de evaluacion medica',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(medicalEvaluationSaved);
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    }
}