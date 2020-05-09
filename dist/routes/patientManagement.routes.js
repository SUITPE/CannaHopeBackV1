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
const bodySystemController_1 = __importDefault(require("../controllers/patientManagement/bodySystemController"));
const medicalConsultation_1 = __importDefault(require("../controllers/patientManagement/medicalConsultation"));
const medicalReevaluationController_1 = __importDefault(require("../controllers/patientManagement/medicalReevaluationController"));
const disease_service_1 = require("../services/disease.service");
const consultationAdmitionController_1 = __importDefault(require("../controllers/patientManagement/consultationAdmitionController"));
const diseaseCtr = new diseaseController_1.DiseaseController(new disease_service_1.DiseaseService());
const harmfulHabitCtr = new harmfulHabitController_1.default();
const patientPhCtr = new PatientPhController_1.PatientPhController();
const patientProblemCtr = new patientProblemController_1.default();
const bodySystemCtr = new bodySystemController_1.default();
const medicalConsultationCtr = new medicalConsultation_1.default();
const medicalReevaluestion = new medicalReevaluationController_1.default();
const patientManagementRoutes = express_1.Router();
patientManagementRoutes.post('/disease/save', userValidation_middleware_1.default.validation, (req, res) => {
    diseaseCtr.saveNewDisease(req.body)
        .then(disease => {
        return res.status(200).send(new jsonResp_1.default(true, 'Enfermedad registrada correctamente', disease));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error en registro de enfermedad', null, error));
    });
});
patientManagementRoutes.get('/disease/findAll', userValidation_middleware_1.default.validation, (req, res) => {
    diseaseCtr.getDiseaseList()
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
patientManagementRoutes.post('/medicalConsultation/save', userValidation_middleware_1.default.validation, (req, res) => {
    medicalConsultationCtr.save(req.body)
        .then(medicalConsultation => {
        return res.status(200).send(new jsonResp_1.default(true, 'Consulta de paciente guardada correctamente', medicalConsultation));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, error.name, null, error));
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
patientManagementRoutes.post('/bodySystem/save', userValidation_middleware_1.default.validation, (req, res) => {
    bodySystemCtr.save(req.body)
        .then(bodySystemSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Sistema de cuerpo cargado correctamente', bodySystemSaved));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error en la base de datos al guardar sistema del cuerpo', null, error));
    });
});
patientManagementRoutes.get('/bodySystem/findAll', userValidation_middleware_1.default.validation, (req, res) => {
    bodySystemCtr.findAll()
        .then(bodySystemList => {
        return res.status(200).send(new jsonResp_1.default(true, 'Listado de Sistemas del cuerpo cargado correctamente', bodySystemList));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error en la base de datos al cargar sistema del cuerpo', null, error));
    });
});
patientManagementRoutes.get('/medicalConsultation/findByIdPatinet/:idPatient', userValidation_middleware_1.default.validation, (req, res) => {
    medicalConsultationCtr.findByPatientId(req.params.idPatient)
        .then(patientConsultation => {
        return res.status(200).send(new jsonResp_1.default(true, 'Listado consultas registradas a paciente cargado correctamente', patientConsultation));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al cargar consultas registradas al paciente', null, error));
    });
});
patientManagementRoutes.post('/medicalReevaluation/save', userValidation_middleware_1.default.validation, (req, res) => {
    medicalReevaluestion.save(req.body)
        .then(medicalReevaluestionSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Reevaluación registrada correctamente', medicalReevaluestionSaved));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error registrar reevaluacion medica', null, error));
    });
});
patientManagementRoutes.post('/consultationAdmition/save', userValidation_middleware_1.default.validation, (req, res) => {
    const consultationAdmitionCtr = new consultationAdmitionController_1.default();
    consultationAdmitionCtr.saveConsultationAdmition(req.body)
        .then(consultationAdmitionSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Admisión de paciente registrada correctamente', consultationAdmitionSaved));
    })
        .catch((error) => {
        return res.status(500).send(new jsonResp_1.default(false, error.name, null, error));
    });
});
patientManagementRoutes.get('/consultationAdmition/findByIdPatient/:idPatient', userValidation_middleware_1.default.validation, (req, res) => {
    const consultationAdmitionCtr = new consultationAdmitionController_1.default();
    consultationAdmitionCtr.getConsultationAdmitionByPatientId(req.params.idPatient)
        .then(consultationAdmitionList => {
        return res.status(200).send(new jsonResp_1.default(true, 'Lista de admisiones registradas cargada correctamente', consultationAdmitionList));
    })
        .catch((error) => {
        return res.status(500).send(new jsonResp_1.default(false, error.name, null, error));
    });
});
patientManagementRoutes.delete('/disease/delete/:id', userValidation_middleware_1.default.validation, diseaseCtr.delete);
exports.default = patientManagementRoutes;
