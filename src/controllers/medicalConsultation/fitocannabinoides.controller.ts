import { FitocannabinoidesService } from '../../services/fitocannabinoides.service';
import { Request, Response } from 'express';
import JsonResp from '../../models/jsonResp';
import httpstatus from 'http-status';


export class FitocannabinoidesController {

    constructor(
        private fitocannabinoidesSrv: FitocannabinoidesService = new FitocannabinoidesService(),
    ) { }


    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(httpstatus.OK).send(new JsonResp(
                true,
                'Fitocanabinnoides cargados correctamente',
                await this.fitocannabinoidesSrv.find()
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al consultar Fitocannabinoides',
                null, error
            ));
        }
    }


}