import { UserModel } from '../models/user';
import { ErrorDetail } from '../models/jsonResp';
import User from '../models/user';


export default class UserService {


    public async update(user: any): Promise<UserModel> {
        try {
            return await User.updateOne({ _id: user._id }, user);
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error la hacer consulta en db',
                description: error
            }
            throw (errorDetail);
        }
    }

    public async findByEmail(userEmail: string): Promise<UserModel> {
        try {
            const user: any = await User.findOne({ email: userEmail, status: true });
            return user;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta de usuario por email',
                description: error
            }
            throw errorDetail;
        }
    }

    public async findByRolId(idRol: string): Promise<UserModel[]> {
        try {
            return User.find(
                {
                    rol: idRol,
                    status:true
                },
                {
                    names: 1,
                    image:1,
                    surenames:1,
                    nickName:1,
                    sex:1,
                    ocupation:1,
                    email:1,
                    mobilePhone:1,
                });
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta en la base de datos al obtener usuario por id de rol',
                description: error
            }
            throw errorDetail;
        }
    }
}