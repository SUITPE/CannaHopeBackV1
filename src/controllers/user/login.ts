import { Request, Response } from 'express';
import UserController from './userController';
import { UserModel } from '../../models/user';
import JsonResp from '../../models/jsonResp';
import bcrypt from 'bcrypt';
import { ErrorDetail } from '../../models/jsonResp';
import jsonwebtoken from 'jsonwebtoken';
import { seed, tokenExpiration, environments } from '../../environments/varEnvironments';
import EmailController from '../generalControllers/emailsController';


export default class LoginController {

    constructor() { }

    public static async startSession(req: Request, res: Response) {

        const userData: any = req.body;
        const userController: UserController = new UserController();
        const login: LoginController = new LoginController();

        try {
            const user: UserModel = await userController.getByParam({ email: userData.email });
            const passWrodValidated: boolean = await login.validateUserPassword(user.password, userData.password);
            const userToToken = {
                names: user.names,
                surenames: user.surenames,
                nickName: user.nickName,
                document: user.document,
                email: user.email,
                mobilePhone: user.mobilePhone,
                rol: user.rol
            }
            const token: string = await login.generateUserToken(userToToken);

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

    public generateUserToken(user: any): Promise<string> {
        return new Promise((resolve, reject) => {

            try {
                const token: string = jsonwebtoken.sign({ user }, seed, { expiresIn: tokenExpiration });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    }

    public validateUserToPasswordReset(userEmail: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const userCtr: UserController = new UserController();
            try {

                const user: UserModel = await userCtr.getByParam({ email: userEmail });
                const userToken: string = await this.generateUserToken(user);
                const link: string = `${environments.getFrontUrl()}/resetPassword/${userToken}`;

                const email: EmailController = new EmailController(
                    'gmail',
                    `Envio de correo para recuperación de contraseña, para recuperar su contraseña entre al siguiente link ${link}`,
                    user.email,
                    'RECUPERACÓN DE CONTRASEñA CANNAHOPPE'
                )

                const emailSent: boolean = await email.sendEmail();

                resolve(true);

            } catch (error) {
                reject(error);
            }
        });
    }

}