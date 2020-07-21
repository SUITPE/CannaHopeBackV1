import { Response, Request } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { AppointmentStatusService } from '../../services/appointmentStatus.service';


export class AppointmentStatusController {

    private appointmentsStatusSrv: AppointmentStatusService = new AppointmentStatusService();

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(httpstatus.OK).send(new JsonResp(
                true,
                'Estados de consulta cargados de manera exitosa',
                await this.appointmentsStatusSrv.findAll()
            ))
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(false, 'Error en la base de datos al consultar estados de citas', error))
        }
    }
}