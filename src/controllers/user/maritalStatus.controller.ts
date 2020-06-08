import { MaritalStatusService } from '../../services/maritalStatus.service';
import JsonResp from '../../models/jsonResp';
import { Request, Response } from 'express';
import httpstatus from 'http-status';


export class MaritalStatusController {

    constructor (private maritalStatusSrv: MaritalStatusService = new MaritalStatusService()) {}

    public async getAll(re: Request, res: Response): Promise<Response> {
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Estados maritales cargados correctamente',
                await this.maritalStatusSrv.find()
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(false, 'Error en servidor al cargar estados maritales', null, error));
        }
    }
}