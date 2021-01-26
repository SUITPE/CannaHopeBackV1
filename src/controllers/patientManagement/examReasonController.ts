import { ExamReasonModel, ExamReason } from '../../models/examReason';
import { ErrorDetail } from '../../models/jsonResp';
import { Request, Response } from 'express';
import ExamReasonService from '../../services/examReason.service';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';


export default class ExamReasonController {


    public save(examReason: ExamReasonModel): Promise<ExamReasonModel> {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail: ErrorDetail = new ErrorDetail();

                const newExamReason: ExamReasonModel = new ExamReason({
                    name: examReason.name,
                    description: examReason.description,
                });

                newExamReason.save({}, (error, examReasonSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar motivo de exámenes';
                        errorDetail.description = error;
                        reject(errorDetail);
                    } else {
                        resolve(examReasonSaved);
                    }
                });

            } catch (error) {

                reject(error);
            }
        });
    }

    public findAll(): Promise<ExamReasonModel[]> {
        return new Promise((resolve, reject) => {
            try {

                const errorDetail: ErrorDetail = new ErrorDetail();

                ExamReason.find({ isEnabled: true }, (error, examReasonList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de motivo de exámenes';
                        errorDetail.description = error;
                        reject(error);
                    } else {
                        resolve(examReasonList);
                    }
                }).sort({ name: 1 })
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {

        const examReasonSrv: ExamReasonService = new ExamReasonService();
        const idExamReason: string = req.params.id;
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Motivo de exámenes eliminado correctamente',
                await examReasonSrv.delete(idExamReason)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al eliminar motivo de exámenes',
                error
            ));
        }
    }
}