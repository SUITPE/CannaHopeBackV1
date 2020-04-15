"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("./userController"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const varEnvironments_1 = require("../../environments/varEnvironments");
class LoginController {
    constructor() { }
    static startSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const userController = new userController_1.default();
            const login = new LoginController();
            try {
                const user = yield userController.getByParam({ email: userData.email });
                const passWrodValidated = yield login.validateUserPassword(user.password, userData.password);
                const token = yield login.generateUserToken(user);
                const data = {
                    user,
                    token
                };
                return res.status(200).send(new jsonResp_1.default(true, 'Inicio de sesión exitoso', data));
            }
            catch (error) {
                return res.status(500).send(new jsonResp_1.default(false, 'Error - Credenciales incorrectas', null, error));
            }
        });
    }
    validateUserPassword(passwordDb, userPassword) {
        return new Promise((resolve, reject) => {
            try {
                if (!bcrypt_1.default.compareSync(userPassword, passwordDb)) {
                    const errorDetail = {
                        name: 'Credenciales incorrectas - Contraseña',
                        description: 'Credenciales incorrectas - Contraseña'
                    };
                    reject(errorDetail);
                }
                else {
                    resolve(true);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    generateUserToken(user) {
        return new Promise((resolve, reject) => {
            try {
                const token = jsonwebtoken_1.default.sign({ user }, varEnvironments_1.seed, { expiresIn: varEnvironments_1.tokenExpiration });
                resolve(token);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = LoginController;
