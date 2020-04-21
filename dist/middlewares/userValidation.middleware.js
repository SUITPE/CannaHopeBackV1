"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonResp_1 = __importDefault(require("../models/jsonResp"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const varEnvironments_1 = require("../environments/varEnvironments");
const UserValidation = {
    validation(req, res, next) {
        let token;
        let errorDetail;
        if (req.get('token')) {
            token = req.get('token');
        }
        else {
            errorDetail = {
                name: 'Token invalido',
                description: 'No se ha recibido un token de usuario en los headers de la petición'
            };
            const resp = new jsonResp_1.default(false, 'Token invalido, por favor inicie sesion nuevamente', null, errorDetail);
            return res.status(401).send(resp);
        }
        jsonwebtoken_1.default.verify(token, varEnvironments_1.seed, (error, decoded) => {
            if (error) {
                errorDetail = {
                    name: 'No esta autorizado',
                    description: 'No esta autorizado para hacer esta petición, su token es invalido, consulte a administrador'
                };
                const resp = new jsonResp_1.default(false, 'Token invalido, por favor inicie sesion nuevamente', null, errorDetail);
                return res.status(401).send(resp);
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
    }
};
exports.default = UserValidation;
