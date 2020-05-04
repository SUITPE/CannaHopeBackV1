import { Request, Response } from 'express';
import JsonResp from '../models/jsonResp';
import { ErrorDetail } from '../models/jsonResp';
import jwt from 'jsonwebtoken';
import { seed } from '../environments/varEnvironments';


const UserValidation = {


    validation(req: any, res: Response, next: any) {
        let token: string;
        let errorDetail: ErrorDetail;

        if (req.get('token')) {
            token = req.get('token');
        } else {
            errorDetail = {
                name: 'Token invalido',
                description: 'No se ha recibido un token de usuario en los headers de la petición'
            }
            const resp: JsonResp = new JsonResp(false, 'Aviso de seguridad', null, errorDetail);
            return res.status(401).send(resp);
        }


        jwt.verify(token, seed, (error: any, decoded: any) => {
            if (error) {
                errorDetail = {
                    name: 'Credenciales vencidas, por favor vuelva a iniciar sesión',
                    description: 'No esta autorizado para hacer esta petición, su token es invalido, consulte a administrador'
                }
                const resp: JsonResp = new JsonResp(false, 'Aviso de seguridad', null, errorDetail);
                return res.status(401).send(resp);
            } else {
                req.user = decoded.user;
                next();
            }
        });
    }
}

export default UserValidation;