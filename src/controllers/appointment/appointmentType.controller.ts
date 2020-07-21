import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { AppointmentTypeService } from '../../services/appointmentType.service';



export class AppointmentTypesController {

    constructor(
        private AppointmentTypeSrv: AppointmentTypeService
    ) {}

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(httpstatus.OK).send(new JsonResp(
                true,
                'Tiposd de consulta cargados de manera exitosa',
                await this.AppointmentTypeSrv.findAll()
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en servidor al consultar tipos de consulta',
                null,
                error
            ));
        }
    }

}