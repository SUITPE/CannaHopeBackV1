"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonResp_1 = require("../../models/jsonResp");
class UserController {
    save(userData) {
        return new Promise((resolve, reject) => {
            console.log(userData);
            const user = new user_1.default({
                _id: userData._id,
                names: userData.names,
                surenames: userData.surenames,
                nickName: userData.nickName,
                age: userData.age,
                birthDate: userData.birthDate,
                sex: userData.sex,
                document: userData.document,
                documentType: userData.documentType,
                maritalStatus: userData.maritalStatus,
                ocupation: userData.ocupation,
                address: userData.address,
                email: userData.email,
                mobilePhone: userData.mobilePhone,
                landLine: userData.landLine,
                healthyEntity: userData.healthyEntity,
                password: bcrypt_1.default.hashSync((userData.password).toString(), 10),
                rol: userData.rol,
                createDate: userData.createDate,
                createdBy: userData.createdBy,
                updateDate: userData.updateDate,
                updatedBy: userData.updatedBy,
                image: userData.image
            });
            user.save({}, (error, userSaved) => {
                if (error) {
                    const errorDetail = {
                        name: 'Error al momento de registrar usuario',
                        description: error,
                        status: 500
                    };
                    reject(errorDetail);
                }
                else {
                    resolve(userSaved);
                }
            });
        });
    }
    update(idUser, user) {
        return new Promise((resolve, reject) => {
            try {
                user_1.default.findByIdAndUpdate(idUser, user, (error, userUpdated) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error en la consulta al actualizar usuario',
                            description: error
                        };
                        throw errorDetail;
                    }
                    user = userUpdated;
                });
                resolve(user);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getAll(from, limit) {
        return new Promise((resolve, reject) => {
            try {
                user_1.default.find({}, {
                    password: 0
                })
                    .skip(from)
                    .limit(limit)
                    .populate('rol', 'name description')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error, users) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al cargar lista de usuarios',
                            description: error
                        };
                        throw jsonResp_1.ErrorDetail;
                    }
                    user_1.default.countDocuments({}, (err, total) => {
                        const data = {
                            total,
                            users
                        };
                        resolve(data);
                    });
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getById() {
        return new Promise((resolve, reject) => {
        });
    }
    getByParam(params) {
        return new Promise((resolve, reject) => {
            let errorDetil = new jsonResp_1.ErrorDetail();
            try {
                user_1.default.findOne(params)
                    .populate('rol', 'name description')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error, user) => {
                    if (error) {
                        errorDetil = {
                            name: `Error al consultar usuario con el parametro ${params}`,
                            description: error
                        };
                        reject(errorDetil);
                    }
                    if (!user) {
                        errorDetil = {
                            name: 'Usuario no encontrado',
                            description: `Usuario con ${params} no se encuentra registrado en sistema`
                        };
                        reject(errorDetil);
                    }
                    resolve(user);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findByParams(searchParam) {
        return new Promise((resolve, reject) => {
            const regex = new RegExp(searchParam, 'i');
            try {
                user_1.default.find({ names: regex })
                    .limit(10)
                    .exec((error, users) => {
                    if (error) {
                        const errorDetail = {
                            name: `Fallo al buscar usuarios con parametro ${searchParam}`,
                            description: error
                        };
                        throw errorDetail;
                    }
                    resolve(users);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getTotalRegistered() {
        return new Promise((resolve, reject) => {
        });
    }
}
exports.default = UserController;
