import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { DiseaseController } from '../controllers/patientManagement/diseaseController';
import JsonResp from '../models/jsonResp';
import HarmfulHabitController from '../controllers/patientManagement/habits/harmfulHabitController';
import { PatientPhController } from '../controllers/patientManagement/PatientPhController';
import PatientProblemController from '../controllers/patientManagement/patientProblemController';
import BodySystemController from '../controllers/patientManagement/bodySystemController';
import MedicalConsultationController from '../controllers/patientManagement/medicalConsultation';
import MedicalReevaluationController from '../controllers/patientManagement/medicalReevaluationController';
import { DiseaseService } from '../services/disease.service';
import ConsultationAdmitionController from '../controllers/patientManagement/consultationAdmitionController';
import { ErrorDetail } from '../models/jsonResp';
import { PatientPhService } from '../services/patientPh.service';
import { MaritalStatusController } from '../controllers/user/maritalStatus.controller';
import { PatientAuxiliaryController } from '../controllers/patientManagement/PatientAuxiliaryController';
import ExamReasonController from '../controllers/patientManagement/examReasonController';

const diseaseCtr: DiseaseController = new DiseaseController(new DiseaseService());
const harmfulHabitCtr: HarmfulHabitController = new HarmfulHabitController();

const patientPhCtr: PatientPhController = new PatientPhController();
const patientProblemCtr: PatientProblemController = new PatientProblemController();
const bodySystemCtr: BodySystemController = new BodySystemController();
const medicalConsultationCtr: MedicalConsultationController = new MedicalConsultationController();
const medicalReevaluestion: MedicalReevaluationController = new MedicalReevaluationController();
const patientAuxiliaryCtr: PatientAuxiliaryController = new PatientAuxiliaryController();
const examReasonCtr: ExamReasonController = new ExamReasonController();
const patientManagementRoutes: Router = Router();

patientManagementRoutes.post('/disease/save', UserValidation.validation, (req, res) => {
    diseaseCtr.saveNewDisease(req.body)
    .then(disease => {
        return res.status(200).send(new JsonResp(true, 'Enfermedad registrada correctamente', disease));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en registro de enfermedad', null, error));
    });
});


patientManagementRoutes.get('/disease/findAll', UserValidation.validation, (req, res) => {
    diseaseCtr.getDiseaseList()
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

patientManagementRoutes.delete('/harmfulHabit/deleteById/:id', UserValidation.validation, harmfulHabitCtr.delete);

patientManagementRoutes.post('/medicalConsultation/save', UserValidation.validation, (req, res) => {
    medicalConsultationCtr.save(req.body)
    .then(medicalConsultation => {
        return res.status(200).send(new JsonResp(true, 'Consulta de paciente guardada correctamente', medicalConsultation));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, error.name, null, error));
    });
});



patientManagementRoutes.put('/patientPh/update', UserValidation.validation, (req, res) => patientPhCtr.findAndUpdate(req, res));

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

patientManagementRoutes.delete('/patientProblem/delete/:id', UserValidation.validation, patientProblemCtr.delete);

patientManagementRoutes.post('/bodySystem/save', UserValidation.validation, (req, res) => {
    bodySystemCtr.save(req.body)
    .then(bodySystemSaved => {
        return res.status(200).send(new JsonResp(true, 'Sistema de cuerpo cargado correctamente', bodySystemSaved));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en la base de datos al guardar sistema del cuerpo', null, error));
    });
});

patientManagementRoutes.get('/bodySystem/findAll', UserValidation.validation, (req, res) => {
    bodySystemCtr.findAll()
    .then(bodySystemList => {
        return res.status(200).send(new JsonResp(true, 'Listado de Sistemas del cuerpo cargado correctamente', bodySystemList));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en la base de datos al cargar sistema del cuerpo', null, error));
    });
});

patientManagementRoutes.get('/medicalConsultation/findByIdPatinet/:idPatient', UserValidation.validation, (req, res) => {
    medicalConsultationCtr.findByPatientId(req.params.idPatient)
    .then(patientConsultation => {
        return res.status(200).send(new JsonResp(true, 'Listado consultas registradas a paciente cargado correctamente', patientConsultation));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al cargar consultas registradas al paciente', null, error));
    });
});

patientManagementRoutes.post('/medicalReevaluation/save', UserValidation.validation, (req, res) => medicalReevaluestion.save(req, res));
patientManagementRoutes.get('/medicalReevaluation/getByIdConsultation/:id', UserValidation.validation, (req, res) => medicalReevaluestion.getByIdConsultation(req, res));


patientManagementRoutes.post('/consultationAdmition/save', UserValidation.validation, (req, res) => {
    const consultationAdmitionCtr: ConsultationAdmitionController = new ConsultationAdmitionController();
    consultationAdmitionCtr.saveConsultationAdmition(req.body)
    .then(consultationAdmitionSaved => {
        return res.status(200).send(new JsonResp(true, 'Admisión de paciente registrada correctamente', consultationAdmitionSaved));
    })
    .catch((error: ErrorDetail) => {
        return res.status(500).send(new JsonResp(false, error.name, null, error));
    });
});

patientManagementRoutes.get('/consultationAdmition/findByIdPatient/:idPatient', UserValidation.validation, (req, res) => {
    const consultationAdmitionCtr: ConsultationAdmitionController = new ConsultationAdmitionController();
    consultationAdmitionCtr.getConsultationAdmitionByPatientId(req.params.idPatient)
    .then(consultationAdmitionList => {
        return res.status(200).send(new JsonResp(true, 'Lista de admisiones registradas cargada correctamente', consultationAdmitionList));
    })
    .catch((error: ErrorDetail) => {
        return res.status(500).send(new JsonResp(false, error.name, null, error));
    });
});

patientManagementRoutes.delete('/disease/delete/:id', UserValidation.validation, diseaseCtr.delete);
patientManagementRoutes.put('/disease/update', UserValidation.validation, diseaseCtr.update);
patientManagementRoutes.get('/medicalConsultation/getById/:id', UserValidation.validation, medicalConsultationCtr.getById);

// patient ph
patientManagementRoutes.post('/patientPh/save', UserValidation.validation, (req, res) => patientPhCtr.save(req, res));

patientManagementRoutes.get('/maritalStatus', UserValidation.validation, (req, res) => {
    const maritalStatusSrv: MaritalStatusController = new MaritalStatusController();
    return maritalStatusSrv.getAll(req, res);
});

/* patient auxiliary */
patientManagementRoutes.get('/patientAuxiliary/findByPatientId/:id', UserValidation.validation, (req, res) => {
    patientAuxiliaryCtr.findByPatientId(req.params.id)
    .then(patientAuxiliaryFounded => {
        return res.status(200).send(new JsonResp(true, 'Historial patologico de paciente cargado correctamente', patientAuxiliaryFounded));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al cargar historial patologico de paciente', null, error));
    });
});

patientManagementRoutes.post('/patientAuxiliary/save', UserValidation.validation, (req, res) => patientAuxiliaryCtr.save(req, res));

patientManagementRoutes.put('/patientAuxiliary/update', UserValidation.validation, (req, res) => patientAuxiliaryCtr.findAndUpdate(req, res));

patientManagementRoutes.post('/examReason/save', UserValidation.validation, (req, res) => {
    examReasonCtr.save(req.body)
    .then(examReason => {
        return res.status(200).send(new JsonResp(true, 'Motivo de exámenes guardado corectamente', examReason));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al guardar motivo de exámenes', null, error));
    });
});

patientManagementRoutes.get('/examReason/findAll', UserValidation.validation, (req, res) => {
    examReasonCtr.findAll()
    .then(examReasonList => {
        return res.status(200).send(new JsonResp(true, 'Lista de motivo de exámenes cargada correctamente', examReasonList));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error al cargar lista de motivo de exámenes', null, error));
    });
});

patientManagementRoutes.delete('/examReason/delete/:id', UserValidation.validation, examReasonCtr.delete);

export default patientManagementRoutes;


