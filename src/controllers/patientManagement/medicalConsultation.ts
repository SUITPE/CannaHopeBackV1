import { MedicalConsultationModel, MedicalConsultation } from '../../models/medicalConsultation';
import { MedicalEvaluationModel } from '../../models/medicalEvaluation';
import MedicalEvaluationController from './medicalEvaluation';
import PhysicalExamController from './physicalExamController';
import { ErrorDetail } from '../../models/jsonResp';
import PatientController from '../patients/patientsController';
import { MedicalDiagnosticController } from './medicalDiagnosticController';
import { MedicalDiagnosticModel } from '../../models/medicalDiagnostic';
import MedicalTreatmentController from './medicalTreatment';
import { MedicalTreatmentModel } from '../../models/medicalTreatment';

export default class MedicalConsultationController {

    public save(medicalConsultation: MedicalConsultationModel): Promise<MedicalConsultationModel> {
        return new Promise(async (resolve, reject) => {

            const errorDetail: ErrorDetail = new ErrorDetail();
            const medicalEvaluationCtr: MedicalEvaluationController = new MedicalEvaluationController();
            const physicalExamCtr: PhysicalExamController = new PhysicalExamController();
            const patientCtr: PatientController = new PatientController();
            const medicalDiagnosticCtr: MedicalDiagnosticController = new MedicalDiagnosticController();
            const medicalTreatmentCtr: MedicalTreatmentController = new MedicalTreatmentController();

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

                const medicalConsultationSaved: MedicalConsultationModel = await newMedicalConsultation.save();

                const newMedicalEvaluation: MedicalEvaluationModel = medicalConsultation.medicalEvaluation;
                newMedicalEvaluation.patient = medicalConsultation.patient;
                newMedicalEvaluation.doctor = medicalConsultation.doctor;
                newMedicalEvaluation.createDate = medicalConsultation.createDate;

                const newPhysicalExam: any = medicalConsultation.physicalExam;
                newPhysicalExam.patient = medicalConsultation.patient;
                newPhysicalExam.doctor = medicalConsultation.doctor;
                newPhysicalExam.createDate = medicalConsultation.createDate;

                const newMedicalDiagnostic: MedicalDiagnosticModel = medicalConsultation.medicalDiagnostic;
                newMedicalDiagnostic.patient = medicalConsultation.patient;
                newMedicalDiagnostic.doctor = medicalConsultation.doctor;
                newMedicalDiagnostic.createDate = medicalConsultation.createDate;

                medicalConsultation.medicalDiagnostic.disease.forEach(async (item, i) => {
                    const medicalTreatment: any = new Object();
                    medicalTreatment.patient = medicalConsultation.patient;
                    medicalTreatment.doctor = medicalConsultation.doctor;
                    medicalTreatment.disease = item.name;
                    medicalTreatment.description = item.description;
                    medicalTreatment.createDate = medicalConsultation.createDate;
                    medicalTreatment.viaAdministracion = medicalConsultation.medicalDiagnostic.medicalTreatment.viaAdministracion;
                    medicalTreatment.ratio = medicalConsultation.medicalDiagnostic.medicalTreatment.ratio;
                    medicalTreatment.concentracion = medicalConsultation.medicalDiagnostic.medicalTreatment.concentracion;
                    const medicalTreatmentSaved: MedicalTreatmentModel = await medicalTreatmentCtr.save(medicalTreatment);
                });

                const medicalEvaluationSaved: MedicalEvaluationModel = await medicalEvaluationCtr.save(newMedicalEvaluation);
                const medicalDiagnostic: MedicalDiagnosticModel = await medicalDiagnosticCtr.save(newMedicalDiagnostic);
                const appointmentUpdated: boolean = await patientCtr.updateAppointmentNumber(medicalConsultation.patient);

                resolve(medicalConsultationSaved);

            } catch (error) {
                errorDetail.name = 'Error la guardar registro de consulta';
                errorDetail.description = error;
                reject(errorDetail);
            }
        });
    }
}