import { Request, Response } from 'express';
import UserController from './userController';
import { UserModel } from '../../models/user';
import JsonResp from '../../models/jsonResp';
import bcrypt from 'bcrypt';
import { ErrorDetail } from '../../models/jsonResp';
import jsonwebtoken from 'jsonwebtoken';
import { seed, tokenExpiration } from '../../environments/varEnvironments';


export default class LoginController {

    constructor() { }
    public static async startSession(req: Request, res: Response) {

        const userData: any = req.body;
        const userController: UserController = new UserController();
        const login: LoginController = new LoginController();

        try {


            const user: any = await userController.getByParam({ email: userData.email });
            const passWrodValidated: boolean = await login.validateUserPassword(user.password, userData.password);
            const token: string = await login.generateUserToken(user);

            const data: any = {
                user,
                token
            }
            return res.status(200).send(new JsonResp(true, 'Inicio de sesión exitoso', data));

        } catch (error) {
            return res.status(500).send(new JsonResp(false, 'Error - Credenciales incorrectas', null, error));
        }
    }

    public validateUserPassword(passwordDb: string, userPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            try {

                if (!bcrypt.compareSync(userPassword, passwordDb)) {
                    const errorDetail: ErrorDetail = {
                        name: 'Credenciales incorrectas - Contraseña',
                        description: 'Credenciales incorrectas - Contraseña'
                    }
                    reject(errorDetail);
                } else {
                    resolve(true);
                }
            } catch (error) {
                reject(error);
            }

        });
    }

    public generateUserToken(user: UserModel): Promise<string> {
        return new Promise((resolve, reject) => {

            try {
                const token: string = jsonwebtoken.sign({ user }, seed, { expiresIn: tokenExpiration });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    }
}