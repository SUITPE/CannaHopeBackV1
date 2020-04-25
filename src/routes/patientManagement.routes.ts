import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { DiseaseController } from '../controllers/patientManagement/diseaseController';
import JsonResp from '../models/jsonResp';
import HarmfulHabitController from '../controllers/patientManagement/harmfulHabitController';
import { PatientPhController } from '../controllers/patientManagement/PatientPhController';
import PatientProblemController from '../controllers/patientManagement/patientProblemController';
import BodySystemController from '../controllers/patientManagement/bodySystemController';
import MedicalConsultationController from '../controllers/patientManagement/medicalConsultation';

const diseaseCtr: DiseaseController = new DiseaseController();
const harmfulHabitCtr: HarmfulHabitController = new HarmfulHabitController();
const patientPhCtr: PatientPhController = new PatientPhController();
const patientProblemCtr: PatientProblemController = new PatientProblemController();
const bodySystemCtr: BodySystemController = new BodySystemController();
const medicalConsultationCtr: MedicalConsultationController = new MedicalConsultationController();


const patientManagementRoutes: Router = Router();
patientManagementRoutes.post('/disease/save', UserValidation.validation, (req, res) => {
    diseaseCtr.save(req.body)
    .then(disease => {
        return res.status(200).send(new JsonResp(true, 'Enfermedad registrada correctamente', disease));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en registro de enfermedad', null, error));
    });
});

patientManagementRoutes.get('/disease/findAll', UserValidation.validation, (req, res) => {
    diseaseCtr.findAll()
    .then(diseases => {
        return res.status(200).send(new JsonResp(true, 'Lista de enfermedades cargadas correctamente', diseases));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en registro de enfermedad', null, error));
    });
});

patientManagementRoutes.post('/harmfulHabit/save', UserValidation.validation, (req, res) => {
    harmfulHabitCtr.save(req.body)
    .then(harmfulHabitSaved => {
        return res.status(200).send(new JsonResp(true, 'Habito nocivo guardado correctamente', harmfulHabitSaved));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al guarda habito nocivo', null, error));
    });
});

patientManagementRoutes.get('/harmfulHabit/findAll', UserValidation.validation, (req, res) => {
    harmfulHabitCtr.findAlll()
    .then(harmfulHabitList => {
        return res.status(200).send(new JsonResp(true, 'Lista de habitos cargados correctamente', harmfulHabitList));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al cargar lista habitos nocivos', null, error));
    });
});

patientManagementRoutes.post('/medicalConsultation/save', UserValidation.validation, (req, res) => {
    medicalConsultationCtr.save(req.body)
    .then(medicalConsultation => {
        return res.status(200).send(new JsonResp(true, 'Consulta de paciente guardada correctamente', medicalConsultation));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en la base de datos al registrar consulta de paciente', null, error));
    });
});


patientManagementRoutes.post('/patientPh/save', UserValidation.validation, (req, res) => {
    patientPhCtr.save(req.body)
    .then(patientPhSaved => {
        return res.status(200).send(new JsonResp(true, 'Historial patologico de paciente guardado correctamente', patientPhSaved));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al registrar historial patologico de paciente', null, error));
    });
});

patientManagementRoutes.put('/patientPh/update', UserValidation.validation, (req, res) => {
    patientPhCtr.findAndUpdate(req.body)
    .then(patientPhUpdated => {
        return res.status(200).send(new JsonResp(true, 'Historial patologico de paciente actualizado correctamente', patientPhUpdated));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al actualizar historial patologico de paciente', null, error));
    });
});

patientManagementRoutes.get('/patientPh/findBypatientId/:id', UserValidation.validation, (req, res) => {
    patientPhCtr.findBypatientId(req.params.id)
    .then(patientPhFounded => {
        return res.status(200).send(new JsonResp(true, 'Historial patologico de paciente cargado correctamente', patientPhFounded));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al cargar historial patologico de paciente', null, error));
    });
});


patientManagementRoutes.post('/patientProblem/save', UserValidation.validation, (req, res) => {
    patientProblemCtr.save(req.body)
    .then(patientProblem => {
        return res.status(200).send(new JsonResp(true, 'Problema de paciente guardado corectamente', patientProblem));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al guardar problema de paciente', null, error));
    });
});

patientManagementRoutes.get('/patientProblem/findAll', UserValidation.validation, (req, res) => {
    patientProblemCtr.findAll()
    .then(patientProblemList => {
        return res.status(200).send(new JsonResp(true, 'Lista de pacientes cargada correctamente', patientProblemList));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al cargar lista de pacientes', null, error));
    });
});

patientManagementRoutes.post('/bodySystem/save', UserValidation.validation, (req, res) => {
    bodySystemCtr.save(req.body)
    .then(bodySystemSaved => {
        return res.status(200).send(new JsonResp(true, 'Sistema de cuerpo cargado correctamente', bodySystemSaved));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en la base de datos al guardar sistema del cuerpo', null, error));
    });
});

patientManagementRoutes.get('/bodySystem/save', UserValidation.validation, (req, res) => {
    bodySystemCtr.findAll()
    .then(bodySystemList => {
        return res.status(200).send(new JsonResp(true, 'Listado de Sistemas del cuerpo cargado correctamente', bodySystemList));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en la base de datos al cargar sistema del cuerpo', null, error));
    });
});


patientManagementRoutes.get('/bodySystem/save', UserValidation.validation, (req, res) => {
    bodySystemCtr.findAll()
    .then(bodySystemList => {
        return res.status(200).send(new JsonResp(true, 'Listado de Sistemas del cuerpo cargado correctamente', bodySystemList));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en la base de datos al cargar sistema del cuerpo', null, error));
    });
});
export default patientManagementRoutes;


