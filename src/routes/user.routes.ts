import UserController from '../controllers/user/userController';
import { Router } from 'express';
import RolController from '../controllers/user/rolController';
import JsonResp from '../models/jsonResp';
import { ErrorDetail } from '../models/jsonResp';


const userController: UserController = new UserController();
const rolController: RolController = new RolController();

const userRoutes: Router = Router();


userRoutes.post('/Insert', (req, res) => {

    userController.insert(req.body)
    .then(userSaved => {
        return res.status(200).send(new JsonResp(true, 'Usuario registrado correctamente', userSaved));
    })
    .catch((error: ErrorDetail) => {
        return res.status(error.status).send(new JsonResp(false, 'Error al registrar usuario', null, error));
    })
});

userRoutes.post('/CreateRol', (req, res) => {

    rolController.create(req.body)
    .then(rolInserted => {
        return res.status(200).send(new JsonResp(true, 'Rol de usuario creado correctamente', rolInserted));
    })
    .catch((error: ErrorDetail) => {
        const errorDetail: ErrorDetail = error;
        return res.status(error.status).send(new JsonResp(false, error.name, null, errorDetail));
    })
});



export default userRoutes;