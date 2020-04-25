import { MedicalConsultationModel, MedicalConsultation } from '../../models/medicalConsultation';
import { MedicalEvaluationModel } from '../../models/medicalEvaluation';
import MedicalEvaluationController from './medicalEvaluation';
import PhysicalExamController from './physicalExamController';
// import { PhysicalExamModel } from '../../models/physicalExam';
import { ErrorDetail } from '../../models/jsonResp';


export default class MedicalConsultationController {



    public save(medicalConsultation: MedicalConsultationModel): Promise<MedicalConsultationModel> {
        return new Promise(async (resolve, reject) => {


            const medicalEvaluationCtr: MedicalEvaluationController = new MedicalEvaluationController();
            const physicalExamCtr: PhysicalExamController = new PhysicalExamController();

            try {

                const newMedicalConsultation: MedicalConsultationModel = new MedicalConsultation({
                    patient: medicalConsultation.patient,
                    doctor: medicalConsultation.doctor,
                    patientProblems: medicalConsultation.patientProblems,
                    medicalEvaluation: medicalConsultation.medicalEvaluation,
                    physicalExam: medicalConsultation.physicalExam,
                    complementaryExams: medicalConsultation.complementaryExams,
                    medicalDiagnostic: medicalConsultation.medicalDiagnostic,
                    patientStory: medicalConsultation.patientStory,
                    createDate: medicalConsultation.createDate
                });

                let medicaltConsultationSaved: any = new Object();

                newMedicalConsultation.save({}, (error, medicaltConsultation) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al guardar atencion de consulta de paciente',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        medicaltConsultationSaved = medicaltConsultation;
                    }
                });

                const newMedicalEvaluation: MedicalEvaluationModel = medicalConsultation.medicalEvaluation;
                newMedicalEvaluation.patient = medicalConsultation.patient;
                newMedicalEvaluation.doctor = medicalConsultation.doctor;
                const medicalEvaluationSaved: MedicalEvaluationModel = await medicalEvaluationCtr.save(newMedicalEvaluation);

                const newPhysicalExam: any = medicalConsultation.physicalExam;
                newPhysicalExam.patient = medicalConsultation.patient;
                newPhysicalExam.doctor = medicalConsultation.doctor;
                const physicalExamSaved: any = await physicalExamCtr.save(newPhysicalExam);

                resolve(medicaltConsultationSaved);
            } catch (error) {
                reject(error);
            }
        });
    }
}