"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/user/userController"));
const express_1 = require("express");
const rolController_1 = __importDefault(require("../controllers/user/rolController"));
const jsonResp_1 = __importDefault(require("../models/jsonResp"));
const login_1 = __importDefault(require("../controllers/user/login"));
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const maritalStatus_controller_1 = require("../controllers/user/maritalStatus.controller");
const userController = new userController_1.default();
const rolController = new rolController_1.default();
const login = new login_1.default();
const userRoutes = express_1.Router();
userRoutes.post('/Insert', (req, res) => {
    userController.save(req.body)
        .then(userSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Usuario registrado correctamente', userSaved));
    })
        .catch((error) => {
        return res.status(error.status).send(new jsonResp_1.default(false, 'Error al registrar usuario', null, error));
    });
});
userRoutes.post('/CreateRol', userValidation_middleware_1.default.validation, (req, res) => {
    rolController.create(req.body)
        .then(rolInserted => {
        return res.status(200).send(new jsonResp_1.default(true, 'Rol de usuario creado correctamente', rolInserted));
    })
        .catch((error) => {
        const errorDetail = error;
        return res.status(error.status).send(new jsonResp_1.default(false, error.name, null, errorDetail));
    });
});
userRoutes.get('/Getall', userValidation_middleware_1.default.validation, (req, res) => {
    let from = 0;
    let limit = 5;
    if (req.query.from)
        from = Number(req.query.from);
    if (req.query.limit)
        limit = Number(req.query.limit);
    userController.getAll(from, limit)
        .then(result => {
        return res.status(200).send(new jsonResp_1.default(true, 'Usuarios cargados correctamente', result));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al obtener lista de usuarios', null, error));
    });
});
userRoutes.get('/GetAllRoles', userValidation_middleware_1.default.validation, (req, res) => {
    rolController.getAll()
        .then(userRoles => {
        return res.status(200).send(new jsonResp_1.default(true, 'Roles de usuario cargados correctamente', userRoles));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al obtener lista de roles', null, error));
    });
});
userRoutes.get('/FindByParams/:param', userValidation_middleware_1.default.validation, (req, res) => {
    userController.findByParams(req.params.param)
        .then(users => {
        return res.status(200).send(new jsonResp_1.default(true, 'Usuarios cargados correctamente', users));
    })
        .catch((error) => {
        return res.status(500).send(new jsonResp_1.default(false, error.name || 'Error!', null, error));
    });
});
userRoutes.put('/Update/:id', userValidation_middleware_1.default.validation, (req, res) => {
    userController.update(req.params.id, req.body)
        .then(userSaved => {
        return res.status(200).send(new jsonResp_1.default(true, 'Usuario actualizado correctamente', userSaved));
    })
        .catch((error) => {
        return res.status(500).send(new jsonResp_1.default(false, error.name || 'Error!', null, error));
    });
});
userRoutes.get('/FindById/:id', userValidation_middleware_1.default.validation, (req, res) => {
    userController.getById(req.params.id)
        .then(user => {
        return res.status(200).send(new jsonResp_1.default(true, 'Usuario cargado crrectamente', user));
    })
        .catch((error) => {
        return res.status(500).send(new jsonResp_1.default(false, error.name || 'Error!', null, error));
    });
});
userRoutes.delete('/Delete/:id', userValidation_middleware_1.default.validation, (req, res) => {
    userController.delete(req.params.id)
        .then(user => {
        return res.status(200).send(new jsonResp_1.default(true, 'Usuario eliminado crrectamente', user));
    })
        .catch((error) => {
        return res.status(500).send(new jsonResp_1.default(false, error.name || 'Error!', null, error));
    });
});
userRoutes.get('/forgotPassword/:userEmail', (req, res) => {
    login.validateUserToPasswordReset(req.params.userEmail)
        .then(resp => {
        return res.status(200).send(new jsonResp_1.default(true, `Email enviado a usuario ${req.params.userEmail} correctamente`));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al generar link de recuperación', null, error));
    });
});
userRoutes.post('/resetPassword', (req, res) => {
    userController.resetPassword(req.body)
        .then(result => {
        return res.status(200).send(new jsonResp_1.default(true, `Su contraseña se ha actualizado de manera exitosa`));
    })
        .catch(error => {
        return res.status(500).send(new jsonResp_1.default(false, 'Error al cambiar contraseña', null, error));
    });
});
userRoutes.get('/maritalStatus', userValidation_middleware_1.default.validation, (req, res) => {
    const maritalStatusSrv = new maritalStatus_controller_1.MaritalStatusController();
    return maritalStatusSrv.getAll(req, res);
});
userRoutes.post('/Login', login_1.default.startSession);
exports.default = userRoutes;
