import { DiseaseModel } from '../../models/disease';
import Disease from '../../models/disease';
import { DiseaseService } from '../../services/disease.service';
import JsonResp from '../../models/jsonResp';
import { Request, Response } from 'express';
import httpstatus from 'http-status';
import { DiseaseUpdateDto } from '../../dto/diseace.dto';

export class DiseaseController {

    constructor(private diseaseSrv: DiseaseService) { }

    public saveNewDisease(diseaseData: DiseaseModel): Promise<DiseaseModel> {
        return new Promise((resolve, reject) => {
            try {
                const newDisease: DiseaseModel = new Disease({
                    name: diseaseData.name,
                    description: diseaseData.description
                });

                resolve(this.diseaseSrv.save(newDisease));

            } catch (error) {
                reject(JSON.stringify(error));
            }

        });
    }

    public getDiseaseList(): Promise<DiseaseModel[]> {
        return new Promise(async (resolve, reject) => {
            const diseaseSrv: DiseaseService = new DiseaseService();
            try {
                resolve(await diseaseSrv.findAll());
            } catch (error) {
                reject(error);
            }
        });
    }

    public async  delete(req: Request, res: Response): Promise<Response> {

        const diseaseSrv: DiseaseService = new DiseaseService();
        const idDisease: string = req.params.id;

        try {
            const diseaseDeleted: DiseaseModel = await diseaseSrv.delete(idDisease);
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Enfermedad generica de sistema eliminada correctamente',
                diseaseDeleted
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al eliminar enfermedad generia en sistema',
                error
            ));
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {

        const diseaseSrv: DiseaseService = new DiseaseService();
        const disease: DiseaseUpdateDto = req.body;

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Enfermedad actualizada correctamente',
                await diseaseSrv.updateById(disease)
            ))
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al actualizar enfermedad',
                error
            ));
        }
    }
}