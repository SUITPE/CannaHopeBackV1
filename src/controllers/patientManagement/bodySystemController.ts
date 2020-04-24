import { BodySystemModel, BodySystem } from '../../models/bodySystem';
import { ErrorDetail } from '../../models/jsonResp';


export default class BodySystemController {


    public save(bodySystem: BodySystemModel): Promise<BodySystemModel> {
        return new Promise((resolve, reject) => {
            try {

                const newBodySystem: BodySystemModel = new BodySystem({
                    name: bodySystem.name,
                    description: bodySystem.description
                });
                newBodySystem.save({}, (error, bodySystemSaved) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al guardar sistemas del cuerpo',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(bodySystemSaved);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }


    public findAll(): Promise<BodySystemModel[]> {
        return new Promise((resolve, reject) => {
            try {

                BodySystem.find({}, (error, bodySystemList) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error en la base de datos al cargar lista de isstemas del cuerpo',
                            description: error
                        }
                        reject(error)
                    } else {
                        resolve(bodySystemList);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}