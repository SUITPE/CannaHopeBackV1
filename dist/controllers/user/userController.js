"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    insert(userData) {
        return new Promise((resolve, reject) => {
            const user = new user_1.default({
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
}
exports.default = UserController;
