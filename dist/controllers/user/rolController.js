"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = __importDefault(require("../../models/role"));
class RolController {
    create(rolData) {
        return new Promise((resolve, reject) => {
            const rol = new role_1.default();
            rol.description = rolData.description;
            rol.name = rolData.name;
            rol.save({}, (error, rolSaved) => {
                if (error) {
                    const errorDetail = {
                        name: 'Error al momento de crear registro de rol',
                        description: error,
                        status: 500
                    };
                    reject(errorDetail);
                }
                else {
                    resolve(rolSaved);
                }
            });
        });
    }
}
exports.default = RolController;
