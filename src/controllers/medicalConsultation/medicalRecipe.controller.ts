import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
const fs = require('fs');
import path from 'path';


import generateMedicalRecipe from './generateMedicalRecipe';
import MedicalConsultationService from '../../services/medicalConsultation.service';
import { MedicalConsultationModel } from '../../models/medicalConsultation';


export class MedicalRecipeController {

    constructor(
        private medicalConsultationSrv: MedicalConsultationService = new MedicalConsultationService()
    ) { }


    public async generateAnSendMedicalRecipe(req: Request, res: Response): Promise<any> {

        const idConsultation: string = req.params.idConsultation;
        const type: string = req.params.type;

        try {

            const consultationData: MedicalConsultationModel = await this.medicalConsultationSrv.findById(idConsultation);
            const pdfPath: string = await generateMedicalRecipe(consultationData, consultationData.medicalDiagnostic.medicalTreatment );

            const pathNoImage = path.resolve(__dirname, `../../../document.pdf`);
            res.download(pathNoImage);
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al generar receta medica',
                null, error
            ));
        } finally {
            setTimeout(() => {
                fs.unlinkSync('./document.pdf');
            }, 3000);
        }
    }
}