import { PatientProblemModel, PatientProblem } from '../../models/patientProblem';
import { ErrorDetail } from '../../models/jsonResp';
import { Request, Response } from 'express';
import PatientProblemService from '../../services/patientProblem.service';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';


export default class PatientProblemController {


    public save(patientProblem: PatientProblemModel): Promise<PatientProblemModel> {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail: ErrorDetail = new ErrorDetail();

                const newPatientPromblem: PatientProblemModel = new PatientProblem({
                    name: patientProblem.name,
                    description: patientProblem.description,
                });

                newPatientPromblem.save({}, (error, patientProblemSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar problema de paciente';
                        errorDetail.description = error;
                        reject(errorDetail);
                    } else {
                        resolve(patientProblemSaved);
                    }
                });

            } catch (error) {

                reject(error);
            }
        });
    }

    public findAll(): Promise<PatientProblemModel[]> {
        return new Promise((resolve, reject) => {
            try {

                const errorDetail: ErrorDetail = new ErrorDetail();

                PatientProblem.find({ isEnabled: true }, (error, patientProblemList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de problemas de paciente';
                        errorDetail.description = error;
                        reject(error);
                    } else {
                        resolve(patientProblemList);
                    }
                }).sort({ name: 1 })
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {

        const patientProblemSrv: PatientProblemService = new PatientProblemService();
        const idPatientProblem: string = req.params.id;
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Problema de paciente eliminado correctamente',
                await patientProblemSrv.delete(idPatientProblem)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al eliminar problema de pacientes',
                error
            ));
        }
    }
}