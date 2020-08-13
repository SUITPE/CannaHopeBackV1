import { MedicalReevaluation } from '../../models/medicalReevaluation';
import { MedicalConsultationModel } from '../../models/medicalConsultation';
import MedicalConsultationController from './medicalConsultation';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { Response, Request } from 'express';
import { environments } from '../../environments/varEnvironments';
import { MedicalReevaluationService } from '../../services/medicalReevaluation.service';
import { ConsultationAdmitionService } from '../../services/consultationAdminiton.service';

export default class MedicalReevaluationController {

    constructor(
        private medicalConsultationCtr: MedicalConsultationController = new MedicalConsultationController(),
        private medicalReeevaluation: MedicalReevaluationService = new MedicalReevaluationService(),
        private consultationAdmition: ConsultationAdmitionService = new ConsultationAdmitionService()
    ) { }

    public async save(req: Request, res: Response): Promise<Response> {

        const medicalReevaluation: any = req.body;

        try {

            const medicalConsultation: MedicalConsultationModel = await this.medicalConsultationCtr.findById(medicalReevaluation.medicalConsultation);
            medicalConsultation.reevaluations.push(medicalReevaluation);
            await this.medicalConsultationCtr.updateReevaluation(medicalConsultation.reevaluations, medicalConsultation._id);

            const newMedicalReevaluation = new MedicalReevaluation({
                medicalConsultation: medicalReevaluation.medicalConsultation,
                description: medicalReevaluation.description,
                createDate: new Date(),
                painScale: medicalReevaluation.painScale,
                treatment: medicalReevaluation.medicalTreatment,
                recomendations: medicalReevaluation.recomendations || ''
            });

            if (medicalReevaluation.idClinicalExamination) {
                await this.consultationAdmition.updateIsEnabled(
                    medicalReevaluation.idClinicalExamination, false
                );
            }

            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Reevaluacion emdica registradac crrectametne ',
                await this.medicalReeevaluation.save(newMedicalReevaluation)
            ));


        } catch (error) {
            console.log(error);
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al guardar reevaluacion medica',
                null, error
            ));
        }
    }

    public async getByIdConsultation(req: Request, res: Response): Promise<Response> {

        const id: string = req.params.id;
        try {
            return res.status(httpstatus.OK).send(new JsonResp(
                true,
                'Reevaluaciones medicas registradas correctamente ',
                await this.medicalReeevaluation.findByMedicalConsultation(id)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al guardar reevaluacion medica',
                null, error
            ));
        }
    }
}
