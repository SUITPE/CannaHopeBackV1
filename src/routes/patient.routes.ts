import { Router } from 'express';
import PatientController from '../controllers/patients/patientsController';
import JsonResp from '../models/jsonResp';
import UserValidation from '../middlewares/userValidation.middleware';

const patientCtr: PatientController = new PatientController();
const patientRoutes: Router = Router();

patientRoutes.post('/Insert', UserValidation.validation, (req, res) => {
    patientCtr.insert(req.body)
        .then(patients => {
            return res.status(200).send(new JsonResp(true, `Se ha registrado el paciente correctamente`, patients))
        })
        .catch(error => {
            return res.status(500).send(new JsonResp(false,  'Error al registrar paciente', null, error));
        });
});

patientRoutes.get('/FindById/:id', UserValidation.validation, (req, res) => {
    patientCtr.findById(req.params.id)
        .then(patient => {
            return res.status(200).send(new JsonResp(true, `Se ha cargado el paciente correctamente`, patient))
        })
        .catch(error => {
            return res.status(500).send(new JsonResp(false, error.name, null, error));
        });
});


patientRoutes.get('/GetAll', UserValidation.validation, (req, res) => {

    let from: number = 0;
    let limit: number = 5;

    if (req.query.from) from = Number(req.query.from);
    if (req.query.limit) limit = Number(req.query.limit);

    patientCtr.getAll(from, limit)
        .then(async patients => {
            const resp: JsonResp = new JsonResp(true, `Se ha cargado el paciente correctamente`, patients);
            resp.total = await patientCtr.getTotalRegistered();
            return res.status(200).send(resp)
        })
        .catch(error => {
            return res.status(500).send(new JsonResp(false, error.name, null, error));
        });
});


patientRoutes.get('/FindByParams/:params', UserValidation.validation, (req, res) => {

    patientCtr.findByParams(req.params.params)
    .then(patients => {
        return res.status(200).send(new JsonResp(true, 'Pacientes cargados correctamente', patients));
    })
    .catch(error => {
        return res.status(500).send(new JsonResp(false, 'Error en consulta de pacientes por paramtro', null, error));
    })
});

export default patientRoutes;