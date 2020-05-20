import { MedicalConsultationModel, MedicalConsultation } from '../../models/medicalConsultation';
import { MedicalEvaluationModel } from '../../models/medicalEvaluation';
import MedicalEvaluationController from './medicalEvaluation';
import PhysicalExamController from './physicalExamController';
import { ErrorDetail } from '../../models/jsonResp';
import PatientController from '../patients/patientsController';
import { MedicalDiagnosticController } from './medicalDiagnosticController';
import { MedicalDiagnosticModel } from '../../models/medicalDiagnostic';
import MedicalTreatmentController from './medicalTreatment';
import { MedicalReevaluationModel } from '../../models/medicalReevaluation';
import { ConsultationAdmitionService } from '../../services/consultationAdminiton.service';
import { ConsultationAdmitionModel } from '../../models/consultationAdmision';
import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import MedicalConsultationService from '../../services/medicalConsultation.service';
import { AppointmentService } from '../../services/appointment.service';

export default class MedicalConsultationController {

    private static medicalConsultationSrv: MedicalConsultationService = new MedicalConsultationService();
    private consultationAdmitionSrv: ConsultationAdmitionService = new ConsultationAdmitionService();

    public save(medicalConsultation: any): Promise<MedicalConsultationModel> {
        return new Promise(async (resolve, reject) => {

            const errorDetail: ErrorDetail = new ErrorDetail();
            const medicalEvaluationCtr: MedicalEvaluationController = new MedicalEvaluationController();
            const physicalExamCtr: PhysicalExamController = new PhysicalExamController();
            const patientCtr: PatientController = new PatientController();
            const medicalDiagnosticCtr: MedicalDiagnosticController = new MedicalDiagnosticController();
            const medicalTreatmentCtr: MedicalTreatmentController = new MedicalTreatmentController();
            const appointmentSrv: AppointmentService = new AppointmentService();

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
                    createDate: medicalConsultation.createDate,
                    consultationReason: medicalConsultation.consultationReason,
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

                const medicalEvaluationSaved: MedicalEvaluationModel = await medicalEvaluationCtr.save(newMedicalEvaluation);
                const medicalDiagnostic: MedicalDiagnosticModel = await medicalDiagnosticCtr.save(newMedicalDiagnostic);
                const appointmentUpdated: boolean = await patientCtr.updateAppointmentNumber(medicalConsultation.patient);
                const consultationAdmitionUpdate: ConsultationAdmitionModel = await this.consultationAdmitionSrv.updateIsEnabled(
                    medicalConsultation.medicalEvaluation.clinicalExamination._id, false
                );

                const appointmetnUpdated = await appointmentSrv.updateStatus(medicalConsultation.idAppointment, 'ATENDIDA');

                resolve(medicalConsultationSaved);

            } catch (error) {
                errorDetail.name = 'Error la guardar registro de consulta';
                errorDetail.description = error;
                reject(errorDetail);
            }
        });
    }

    public findByPatientId(idPatient: string): Promise<MedicalConsultationModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const medicalCOnsultations: MedicalConsultationModel[] = await MedicalConsultation.find({ patient: idPatient })
                    .populate({
                        path: 'doctor',
                        select: 'names surenames'
                    })
                resolve(medicalCOnsultations)
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error al consultar consultas medicas registradas',
                    description: error
                }
                reject(errorDetail);
            }
        });
    }

    public findById(idMedicalConsultation: string): Promise<MedicalConsultationModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const medicalConsultation: any = await MedicalConsultation.findById(idMedicalConsultation);
                resolve(medicalConsultation);
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error en la base de datos al consultar consulta medica registrada por id',
                    description: error
                }
                reject(errorDetail);
            }
        });
    }

    public async getById(req: Request, res: Response): Promise<Response> {

        const id: string = req.params.id;

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Consulta medica por id cargada exitosamente',
                await MedicalConsultationController.medicalConsultationSrv.findById(id)
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar consulta medica por id',
                error
            ));
        }
    }

    public updateReevaluation(reevaluations: MedicalReevaluationModel[], idMedicalCOnsultation: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const updated = await MedicalConsultation.updateOne({ _id: idMedicalCOnsultation }, { reevaluations });
                resolve(true);
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error al acutalizar reevaluacion medica de consulta',
                    description: error
                }
                reject(errorDetail)
            }
        });
    }

}