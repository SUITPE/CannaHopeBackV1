import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import PatientService from '../../services/patient.service';
import UserService from '../../services/user.service';
import User from '../../models/user';
import Patient from '../../models/patient';
import { Appointment } from '../../schema/appointment.schema';
import { environments } from '../../environments/varEnvironments';
import JsonResp from '../../models/jsonResp';
import httpstatus from 'http-status';


export default class GeneralServices {

    public static getDocuments(req: Request, res: Response) {

        const type: string = req.params.type;
        const documentPath: string = req.params.documentPath;

        if (type === 'userImage') {
            const pathImage = path.resolve(__dirname, `../../../docs/userImages/${documentPath}`);


            if (fs.existsSync(pathImage)) {
                res.sendFile(pathImage);
            } else {
                const pathNoImage = path.resolve(__dirname, '../../../docs/no-image.png');
                res.sendFile(pathNoImage);
            }
        } else {
            const pathNoImage = path.resolve(__dirname, '../../../docs/no-image.png');
            res.sendFile(pathNoImage);
        }
    }

    public static async getDashboardData(req: Request, res: Response): Promise<Response> {

        const userSrv: UserService = new UserService();

        try {

            const data = {
                totalPatients: await Patient.countDocuments(),
                appointmentsToday: await Appointment.countDocuments({ dateString: environments.currentDateString() }),
                appointmentsAttended: await Appointment.countDocuments({ dateString: environments.currentDateString(), status: 'ATENDIDA' })
            }

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Informacion de dashboard cargada correctamente',
                data
            ));



        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar datos de dashboard',
                error
            ));
        }
    }


}