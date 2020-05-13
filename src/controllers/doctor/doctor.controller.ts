import { Response, Request } from 'express';
import httpstatus from 'http-status';
import UserService from '../../services/user.service';
import RolService from '../../services/rol.service';
import { RolModel } from '../../models/role';
import { UserModel } from '../../models/user';
import JsonResp from '../../models/jsonResp';


export class DoctorController {

    public async getAllDoctors(req: Request, res: Response): Promise<Response> {

        const userSrv: UserService = new UserService();
        const rolSrv: RolService = new RolService();

        try {

            const doctorRol: RolModel = await rolSrv.findByNane('MEDICO');
            const doctorList: UserModel[] = await userSrv.findByRolId(doctorRol._id);

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Lista de doctores cargada correctamente',
                doctorList
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al consultar medicos',
                error
            ));
        }
    }
}