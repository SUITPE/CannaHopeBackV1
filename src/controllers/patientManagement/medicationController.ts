import { MedicationModel, Medication } from '../../models/medication';
import { ErrorDetail } from '../../models/jsonResp';
import { Request, Response } from 'express';
import MedicationService from '../../services/medication.service';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';


export default class MedicationController {


    public save(medication: MedicationModel): Promise<MedicationModel> {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail: ErrorDetail = new ErrorDetail();

                const newMedication: MedicationModel = new Medication({
                    name: medication.name,
                    description: medication.description,
                });

                newMedication.save({}, (error, medicationSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar medications';
                        errorDetail.description = error;
                        reject(errorDetail);
                    } else {
                        resolve(medicationSaved);
                    }
                });

            } catch (error) {

                reject(error);
            }
        });
    }

    public findAll(): Promise<MedicationModel[]> {
        return new Promise((resolve, reject) => {
            try {

                const errorDetail: ErrorDetail = new ErrorDetail();

                Medication.find({ isEnabled: true }, (error, medicationList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de medications';
                        errorDetail.description = error;
                        reject(error);
                    } else {
                        resolve(medicationList);
                    }
                }).sort({ name: 1 })
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {

        const medicationSrv: MedicationService = new MedicationService();
        const idMedication: string = req.params.id;
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'medications eliminado correctamente',
                await medicationSrv.delete(idMedication)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al eliminar medications',
                error
            ));
        }
    }
}