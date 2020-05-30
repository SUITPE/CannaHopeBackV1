import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
const fs = require('fs');
import path from 'path';


import generateMedicalRecipe from './generateMedicalRecipe';
import MedicalConsultationService from '../../services/medicalConsultation.service';
import { MedicalConsultationModel } from '../../models/medicalConsultation';
import { MedicalReevaluationService } from '../../services/medicalReevaluation.service';
import { MedicalReevaluationModel } from '../../models/medicalReevaluation';


export class MedicalRecipeController {

    constructor(
        private medicalConsultationSrv: MedicalConsultationService = new MedicalConsultationService(),
        private medicalReevaluationSrv: MedicalReevaluationService = new MedicalReevaluationService()
    ) { }

    public async generateAnSendMedicalRecipe(req: Request, res: Response): Promise<any> {

        const id: string = req.params.id;
        const type: string = req.params.type;
        let errorFlag: boolean = false;

        try {

            if (type === 'consultation') {
                const consultationData: MedicalConsultationModel = await this.medicalConsultationSrv.findById(id);
                const pdfPath: string = await generateMedicalRecipe(consultationData, consultationData.medicalDiagnostic.medicalTreatment);
            }

            if (type === 'reevaluation') {
                const medicalReevaluation: MedicalReevaluationModel = await this.medicalReevaluationSrv.findById(id);
                const consultationData: MedicalConsultationModel = await this.medicalConsultationSrv.findById(medicalReevaluation.medicalConsultation);
                const pdfPath: string = await generateMedicalRecipe(consultationData, medicalReevaluation.treatment);
            }

            const pathNoImage = path.resolve(__dirname, `../../../document.pdf`);
            res.download(pathNoImage);

        } catch (error) {
            errorFlag = true;
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al generar receta medica',
                null, error
            ));
        } finally {
            setTimeout(() => {
                if (!errorFlag) {
                    fs.unlinkSync('./document.pdf');
                }
            }, 3000);
        }
    }
}