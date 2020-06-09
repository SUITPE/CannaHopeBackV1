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
import EmailController from '../generalControllers/emailsController';
import UserController from '../user/userController';
import { environments, currentEnv } from '../../environments/varEnvironments';


export class MedicalRecipeController {

    constructor(
        private medicalConsultationSrv: MedicalConsultationService = new MedicalConsultationService(),
        private medicalReevaluationSrv: MedicalReevaluationService = new MedicalReevaluationService()
    ) { }

    public async generateAnSendMedicalRecipe(req: Request, res: Response): Promise<any> {

        const id: string = req.params.id;
        const type: string = req.params.type;
        let errorFlag: boolean = false;
        const userCtr: UserController = new UserController();
        let patientFounded: any;

        try {


            if (type === 'consultation') {
                const consultationData: MedicalConsultationModel = await this.medicalConsultationSrv.findById(id);
                const pdfPath: string = await generateMedicalRecipe(consultationData, consultationData.medicalDiagnostic.medicalTreatment);
                patientFounded = consultationData.patient;
            }

            if (type === 'reevaluation') {
                const medicalReevaluation: MedicalReevaluationModel = await this.medicalReevaluationSrv.findById(id);
                const consultationData: MedicalConsultationModel = await this.medicalConsultationSrv.findById(medicalReevaluation.medicalConsultation);
                const pdfPath: string = await generateMedicalRecipe(consultationData, medicalReevaluation.treatment);
                patientFounded = consultationData.patient;
            }

            const documentPath: string = currentEnv === 'PROD' ? '../docs/document.pdf' : 'docs/document.pdf';
            const emailFiles: any[] = [
                {
                    filename: 'Recetamedica',
                    path: documentPath,
                    contentType: 'application/pdf'
                }
            ]

            const email: EmailController = new EmailController(
                'hostgator',
                `Receta medica emitida por cannahope`,
                patientFounded.user.email ,
                'RECETA MEDICA - CANNAHOPE',
                emailFiles
            );
            await email.sendEmail();

            const pathNoImage = path.resolve(__dirname, `../../../docs/document.pdf`);
            res.sendFile(pathNoImage);

        } catch (error) {
            console.log(error);
            errorFlag = true;
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al generar receta medica',
                null, error
            ));
        } finally {
            setTimeout(() => {
                if (!errorFlag) {
                    const documentPath: string = currentEnv === 'PROD' ? '../docs/document.pdf' : 'docs/document.pdf';
                    fs.unlinkSync(documentPath);
                }
            }, 3000);
        }
    }
}