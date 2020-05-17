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
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const rol_service_1 = __importDefault(require("../../services/rol.service"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const user_1 = __importDefault(require("../../models/user"));
const userController_1 = __importDefault(require("../user/userController"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class DoctorController {
    getAllDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSrv = new user_service_1.default();
            const rolSrv = new rol_service_1.default();
            try {
                const doctorRol = yield rolSrv.findByNane('MEDICO');
                const doctorList = yield userSrv.findByRolId(doctorRol._id);
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Lista de doctores cargada correctamente', doctorList));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al consultar medicos', error));
            }
        });
    }
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSrv = new user_service_1.default();
            const userController = new userController_1.default();
            const rolSrv = new rol_service_1.default();
            const doctor = req.body;
            try {
                const validated = yield validateIfUserExist();
                const doctorRol = yield rolSrv.findByNane('MEDICO');
                if (doctor.image) {
                    doctor.image = yield userController.setUserImage(doctor.image, doctor);
                }
                const newDoctor = new user_1.default({
                    names: doctor.names,
                    surenames: doctor.surenames,
                    email: doctor.email,
                    mobilePhone: doctor.mobilePhone,
                    password: bcrypt_1.default.hashSync((doctor.password).toString(), 10),
                    createDate: doctor.createDate,
                    createdBy: doctor.createdBy,
                    image: doctor.image,
                    specialty: doctor.specialty,
                    rol: doctorRol._id
                });
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Doctor registrado exitosamente', yield userSrv.save(newDoctor)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al registrar doctor', error));
            }
            function validateIfUserExist() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const userFounded = yield userSrv.findByEmail(doctor.email);
                        if (userFounded) {
                            const errorDetail = {
                                name: `El Doctor ${doctor.names} ya se encuentra registrado en sistema`,
                                description: null
                            };
                            throw (errorDetail);
                        }
                        else {
                            return true;
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                });
            }
        });
    }
    getByIdSpecialty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSrv = new user_service_1.default();
            const idSpecilaty = req.params.idSpecialty;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Doctores por especialidad cargados correctamente', yield userSrv.getBySpecialtyId(idSpecilaty)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al registrar doctor', error));
            }
        });
    }
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = req.body;
            const userController = new userController_1.default();
            const userSrv = new user_service_1.default();
            if (doctor.image && doctor.image.length > 100) {
                doctor.image = yield userController.setUserImage(doctor.image, doctor);
            }
            const doctorUpdate = new user_1.default({
                _id: doctor._id,
                names: doctor.names,
                surenames: doctor.surenames,
                email: doctor.email,
                mobilePhone: doctor.mobilePhone,
                image: doctor.image,
                specialty: doctor.specialty,
                updatedBy: doctor.updatedBy,
                updateDate: doctor.updateDate,
            });
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Doctor actualizado correctamente', yield userSrv.update(doctorUpdate)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al actualizar doctor', error));
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSrv = new user_service_1.default();
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, `Doctor con id ${req.params.id}`, yield userSrv.findById(req.params.id)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al registrar doctor', error));
            }
        });
    }
}
exports.DoctorController = DoctorController;
