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
}
exports.DoctorController = DoctorController;
