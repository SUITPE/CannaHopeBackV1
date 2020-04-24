"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const diseaseController_1 = require("../controllers/patientManagement/diseaseController");
const jsonResp_1 = __importDefault(require("../models/jsonResp"));
const harmfulHabitController_1 = __importDefault(require("../controllers/patientManagement/harmfulHabitController"));
const PatientPhController_1 = require("../controllers/patientManagement/PatientPhController");
const patientProblemController_1 = __importDefault(require("../controllers/patientManagement/patientProblemController"));
const diseaseCtr = new diseaseController_1.DiseaseController();
const harmfulHabitCtr = new harmfulHabitController_1.default();
const patientPhCtr = new PatientPhController_1.PatientPhController();
const patientProblemCtr = new patientProblemController_1.default();
const patientManagementRoutes = express_1.Router();
patientManagementRoutes.post('/disease/save', userValidation_middleware_1.default.validation, (req, res) => {
    diseaseCtr.save(req.body)
        .then(disease => {
        return res.status(200).send(new jsonResp_1.default(true, 'Enfermedad registrada correctamente', disease));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error en registro de enfermedad', null, error));
    });
});
patientManagementRoutes.get('/disease/findAll', userValidation_middleware_1.default.validation, (req, res) => {
    diseaseCtr.findAll()
        .then(diseases => {
        return res.status(200).send(new jsonResp_1.default(true, 'Lista de enfermedades cargadas correctamente', diseases));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error en registro de enfermedad', null, error));
    });
});
patientManagementRoutes.post('/harmfulHabit/save', userValidation_middleware_1.default.validation, (req, res) => {
    harmfulHabitCtr.save(req.body)
        .then(harmfulHabitSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Habito nocivo guardado correctamente', harmfulHabitSaved));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al guarda habito nocivo', null, error));
    });
});
patientManagementRoutes.get('/harmfulHabit/findAll', userValidation_middleware_1.default.validation, (req, res) => {
    harmfulHabitCtr.findAlll()
        .then(harmfulHabitList => {
        return res.status(200).send(new jsonResp_1.default(true, 'Lista de habitos cargados correctamente', harmfulHabitList));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al cargar lista habitos nocivos', null, error));
    });
});
patientManagementRoutes.delete('/harmfulHabit/deleteById/:id', userValidation_middleware_1.default.validation, (req, res) => {
    harmfulHabitCtr.deleteById(req.params.id)
        .then(result => {
        return res.status(200).send(new jsonResp_1.default(true, 'Habito eleiminado correctamente'));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, `Error al eliminar habito nocivo con id ${req.params.id}`, null, error));
    });
});
patientManagementRoutes.post('/patientPh/save', userValidation_middleware_1.default.validation, (req, res) => {
    patientPhCtr.save(req.body)
        .then(patientPhSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Historial patologico de paciente guardado correctamente', patientPhSaved));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al registrar historial patologico de paciente', null, error));
    });
});
patientManagementRoutes.put('/patientPh/update', userValidation_middleware_1.default.validation, (req, res) => {
    patientPhCtr.findAndUpdate(req.body)
        .then(patientPhUpdated => {
        return res.status(200).send(new jsonResp_1.default(true, 'Historial patologico de paciente actualizado correctamente', patientPhUpdated));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al actualizar historial patologico de paciente', null, error));
    });
});
patientManagementRoutes.get('/patientPh/findBypatientId/:id', userValidation_middleware_1.default.validation, (req, res) => {
    patientPhCtr.findBypatientId(req.params.id)
        .then(patientPhFounded => {
        return res.status(200).send(new jsonResp_1.default(true, 'Historial patologico de paciente cargado correctamente', patientPhFounded));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al cargar historial patologico de paciente', null, error));
    });
});
patientManagementRoutes.post('/patientProblem/save', userValidation_middleware_1.default.validation, (req, res) => {
    patientProblemCtr.save(req.body)
        .then(patientProblem => {
        return res.status(200).send(new jsonResp_1.default(true, 'Problema de paciente guardado corectamente', patientProblem));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al guardar problema de paciente', null, error));
    });
});
patientManagementRoutes.get('/patientProblem/findAll', userValidation_middleware_1.default.validation, (req, res) => {
    patientProblemCtr.findAll()
        .then(patientProblemList => {
        return res.status(200).send(new jsonResp_1.default(true, 'Lista de pacientes cargada correctamente', patientProblemList));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al cargar lista de pacientes', null, error));
    });
});
exports.default = patientManagementRoutes;
