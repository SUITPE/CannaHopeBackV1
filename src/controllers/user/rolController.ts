import { RolModel } from '../../models/role';
import Rol from '../../models/role';
import { ErrorDetail } from '../../models/jsonResp';


export default class RolController {


    public create(rolData: RolModel): Promise<RolModel> {
        return new Promise((resolve, reject) => {

            const rol: RolModel = new Rol();

            rol.description = rolData.description;
            rol.name = rolData.name;

            rol.save({}, (error: any, rolSaved: RolModel) => {

                if (error) {
                    const errorDetail: ErrorDetail = {
                        name: 'Error al momento de crear registro de rol',
                        description: error,
                        status: 500
                    }
                    reject(errorDetail);
                } else {
                    resolve(rolSaved);
                }
            });
        });
    }

    public getAll(): Promise<RolModel[]> {
        return new Promise((resolve, reject) => {

            try {

                Rol.find({}, (error: any, roles: RolModel[]) => {

                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al consultar todos los roles',
                            description: error,
                            status: 500
                        }

                        throw errorDetail;
                    }

                    else {
                        resolve(roles);
                    }
                });

            } catch (error) {
                reject(error);
            }

        });
    }

}