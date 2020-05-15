import { Response, Request } from 'express';
import httpstatus from 'http-status';
import UserService from '../../services/user.service';
import RolService from '../../services/rol.service';
import { RolModel } from '../../models/role';
import { UserModel } from '../../models/user';
import JsonResp, { ErrorDetail } from '../../models/jsonResp';
import { DoctorCreateDto } from '../../dto/doctor.dto';
import User from '../../models/user';
import UserController from '../user/userController';
import bcrypt from 'bcrypt';


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

    public async createDoctor(req: Request, res: Response): Promise<Response> {

        const userSrv: UserService = new UserService();
        const userController: UserController = new UserController();
        const rolSrv: RolService = new RolService();
        const doctor: DoctorCreateDto = req.body;

        try {

            const validated: boolean = await validateIfUserExist();
            const doctorRol: RolModel = await rolSrv.findByNane('MEDICO');

            if (doctor.image) {
                doctor.image = await userController.setUserImage(doctor.image, doctor);
            }

            const newDoctor: UserModel = new User({
                names: doctor.names,
                surenames: doctor.surenames,
                email: doctor.email,
                mobilePhone: doctor.mobilePhone,
                password: bcrypt.hashSync((doctor.password).toString(), 10),
                createDate: doctor.createDate,
                createdBy: doctor.createdBy,
                image: doctor.image,
                specialty: doctor.specialty,
                rol: doctorRol._id
            });

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Doctor registrado exitosamente',
                await userSrv.save(newDoctor)
            ))

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al registrar doctor',
                error
            ));
        }

        async function validateIfUserExist(): Promise<boolean> {
            try {
                const userFounded: UserModel = await userSrv.findByEmail(doctor.email);
                if (userFounded) {
                    const errorDetail: ErrorDetail = {
                        name: `El Doctor ${doctor.names} ya se encuentra registrado en sistema`,
                        description: null
                    }
                    throw (errorDetail);
                } else {
                    return true;
                }

            } catch (error) {
                throw error;
            }
        }

    }
}