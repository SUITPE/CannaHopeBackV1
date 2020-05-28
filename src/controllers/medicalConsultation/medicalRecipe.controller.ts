import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import path from 'path';


import generateMedicalRecipe from './generateMedicalRecipe';
import MedicalConsultationService from '../../services/medicalConsultation.service';
import { MedicalConsultationModel } from '../../models/medicalConsultation';


export class MedicalRecipeController {

    constructor(private medicalConsultationSrv: MedicalConsultationService = new MedicalConsultationService()) { }


    public async generateAnSendMedicalRecipe(req: Request, res: Response): Promise<any> {

        const idConsultation: string = req.params.idConsultation;

        try {

            const consultationData: MedicalConsultationModel = await this.medicalConsultationSrv.findById(idConsultation);
            const pdfPath: string = await generateMedicalRecipe(consultationData);

            const pathNoImage = path.resolve(__dirname, '../../../dd.pdf');
            res.download(pathNoImage);
        } catch (error) {
            console.log(error);

            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al generar receta medica',
                null, error
            ));
        }
    }
}