import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { DiseaseController } from '../controllers/patientManagement/diseaseController';
import JsonResp from '../models/jsonResp';
import HarmfulHabitController from '../controllers/patientManagement/harmfulHabitController';
import { PatientPhController } from '../controllers/patientManagement/PatientPhController';

const diseaseCtr: DiseaseController = new DiseaseController();
const harmfulHabitCtr: HarmfulHabitController = new HarmfulHabitController();
const patientPhCtr: PatientPhController = new PatientPhController();


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

patientManagementRoutes.delete('/harmfulHabit/deleteById/:id', UserValidation.validation, (req, res) => {
    harmfulHabitCtr.deleteById(req.params.id)
    .then(result => {
        return res.status(200).send(new JsonResp(true, 'Habito eleiminado correctamente'));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, `Error al eliminar habito nocivo con id ${req.params.id}`, null, error));
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

export default patientManagementRoutes;


