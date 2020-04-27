import UserController from '../controllers/user/userController';
import { Router } from 'express';
import RolController from '../controllers/user/rolController';
import JsonResp from '../models/jsonResp';
import { ErrorDetail } from '../models/jsonResp';
import LoginController from '../controllers/user/login';
import UserValidation from '../middlewares/userValidation.middleware';


const userController: UserController = new UserController();
const rolController: RolController = new RolController();
const login: LoginController = new LoginController();
const userRoutes: Router = Router();


userRoutes.post('/Insert', UserValidation.validation, (req, res) => {

    userController.save(req.body)
        .then(userSaved => {
            return res.status(200).send(new JsonResp(true, 'Usuario registrado correctamente', userSaved));
        })
        .catch((error: ErrorDetail) => {
            return res.status(error.status).send(new JsonResp(false, 'Error al registrar usuario', null, error));
        })
});

userRoutes.post('/CreateRol', UserValidation.validation, (req, res) => {

    rolController.create(req.body)
        .then(rolInserted => {
            return res.status(200).send(new JsonResp(true, 'Rol de usuario creado correctamente', rolInserted));
        })
        .catch((error: ErrorDetail) => {
            const errorDetail: ErrorDetail = error;
            return res.status(error.status).send(new JsonResp(false, error.name, null, errorDetail));
        })
});

userRoutes.get('/Getall', UserValidation.validation, (req, res) => {

    let from: number = 0;
    let limit: number = 5;

    if (req.query.from) from = Number(req.query.from);
    if (req.query.limit) limit = Number(req.query.limit);

    userController.getAll(from, limit)
        .then(result => {
            return res.status(200).send(new JsonResp(true, 'Usuarios cargados correctamente', result))
        })
        .catch(error => {
            return res.status(500).send(new JsonResp(false, 'Error al obtener lista de usuarios', null, error));
        });
})

userRoutes.get('/GetAllRoles', UserValidation.validation, (req, res) => {
    rolController.getAll()
        .then(userRoles => {
            return res.status(200).send(new JsonResp(true, 'Roles de usuario cargados correctamente', userRoles))
        })
        .catch(error => {
            return res.status(500).send(new JsonResp(false, 'Error al obtener lista de roles', null, error));
        })
});

userRoutes.get('/FindByParams/:param', UserValidation.validation, (req, res) => {
    userController.findByParams(req.params.param)
        .then(users => {
            return res.status(200).send(new JsonResp(true, 'Usuarios cargados correctamente', users))
        })
        .catch((error: ErrorDetail) => {
            return res.status(500).send(new JsonResp(false, error.name || 'Error!', null, error));
        })
});


userRoutes.put('/Update/:id', UserValidation.validation, (req, res) => {
    userController.update(req.params.id, req.body)
        .then(userSaved => {
            return res.status(200).send(new JsonResp(true, 'Usuario actualizado correctamente', userSaved))
        })
        .catch((error: ErrorDetail) => {
            return res.status(500).send(new JsonResp(false, error.name || 'Error!', null, error));
        });
});

userRoutes.get('/FindById/:id', UserValidation.validation, (req, res) => {
    userController.getById(req.params.id)
        .then(user => {
            return res.status(200).send(new JsonResp(true, 'Usuario cargado crrectamente', user))
        })
        .catch((error: ErrorDetail) => {
            return res.status(500).send(new JsonResp(false, error.name || 'Error!', null, error));
        });
});

userRoutes.delete('/Delete/:id', UserValidation.validation, (req, res) => {
    userController.delete(req.params.id)
        .then(user => {
            return res.status(200).send(new JsonResp(true, 'Usuario eliminado crrectamente', user))
        })
        .catch((error: ErrorDetail) => {
            return res.status(500).send(new JsonResp(false, error.name || 'Error!', null, error));
        });
});


userRoutes.get('/forgotPassword/:userEmail', (req, res) => {
    login.validateUserToPasswordReset(req.params.userEmail)
        .then(resp => {
            return res.status(200).send(new JsonResp(true, `Email enviado a usuario ${req.params.userEmail} correctamente`));
        })
        .catch(error => {
            return res.status(500).send(new JsonResp(false, 'Error al generar link de recuperación', null, error));
        });
});

userRoutes.post('/Login', LoginController.startSession);



export default userRoutes;


