import { UserModel } from '../../models/user';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import { ErrorDetail } from '../../models/jsonResp';


export default class UserController {

    public insert(userData: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject) => {

            const user: UserModel = new User({
                names: userData.names,
                surenames: userData.surenames,
                nickName: userData.nickName,
                age: userData.age,
                birthDate: userData.birthDate,
                sex: userData.sex,
                document: userData.document,
                documentType:  userData.documentType,
                maritalStatus:  userData.maritalStatus,
                ocupation:  userData.ocupation,
                address: userData.address,
                email: userData.email,
                mobilePhone: userData.mobilePhone,
                landLine:  userData.landLine,
                healthyEntity:  userData.healthyEntity,
                password:  bcrypt.hashSync((userData.password).toString(), 10),
                rol:  userData.rol,
                createDate:  userData.createDate,
                createdBy:  userData.createdBy,
            });

            user.save({}, (error: any, userSaved) => {

                if (error) {
                    const errorDetail: ErrorDetail = {
                        name: 'Error al momento de registrar usuario',
                        description: error,
                        status: 500
                    }

                    reject(errorDetail);
                } else {
                    resolve(userSaved);
                }
            });



        });
    }
}