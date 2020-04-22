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
const express_1 = require("express");
const patientsController_1 = __importDefault(require("../controllers/patients/patientsController"));
const jsonResp_1 = __importDefault(require("../models/jsonResp"));
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const patientCtr = new patientsController_1.default();
const patientRoutes = express_1.Router();
patientRoutes.post('/Insert', userValidation_middleware_1.default.validation, (req, res) => {
    patientCtr.insert(req.body)
        .then(patients => {
        return res.status(200).send(new jsonResp_1.default(true, `Se ha registrado el paciente correctamente`, patients));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al registrar paciente', null, error));
    });
});
patientRoutes.get('/FindById/:id', userValidation_middleware_1.default.validation, (req, res) => {
    patientCtr.findById(req.params.id)
        .then(patient => {
        return res.status(200).send(new jsonResp_1.default(true, `Se ha cargado el paciente correctamente`, patient));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, error.name, null, error));
    });
});
patientRoutes.get('/GetAll', userValidation_middleware_1.default.validation, (req, res) => {
    let from = 0;
    let limit = 5;
    if (req.query.from)
        from = Number(req.query.from);
    if (req.query.limit)
        limit = Number(req.query.limit);
    patientCtr.getAll(from, limit)
        .then((patients) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = new jsonResp_1.default(true, `Se ha cargado el paciente correctamente`, patients);
        resp.total = yield patientCtr.getTotalRegistered();
        return res.status(200).send(resp);
    }))
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, error.name, null, error));
    });
});
patientRoutes.get('/FindByParams/:params', userValidation_middleware_1.default.validation, (req, res) => {
    patientCtr.findByParams(req.params.params)
        .then(patients => {
        return res.status(200).send(new jsonResp_1.default(true, 'Pacientes cargados correctamente', patients));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error en consulta de pacientes por paramtro', null, error));
    });
});
exports.default = patientRoutes;
