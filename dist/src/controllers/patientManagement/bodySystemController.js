"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodySystem_1 = require("../../models/bodySystem");
class BodySystemController {
    save(bodySystem) {
        return new Promise((resolve, reject) => {
            try {
                const newBodySystem = new bodySystem_1.BodySystem({
                    name: bodySystem.name,
                    description: bodySystem.description
                });
                newBodySystem.save({}, (error, bodySystemSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar sistemas del cuerpo',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(bodySystemSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                bodySystem_1.BodySystem.find({}, (error, bodySystemList) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error en la base de datos al cargar lista de isstemas del cuerpo',
                            description: error
                        };
                        reject(error);
                    }
                    else {
                        resolve(bodySystemList);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = BodySystemController;
