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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const patient_1 = __importDefault(require("../../models/patient"));
const appointment_schema_1 = require("../../schema/appointment.schema");
const varEnvironments_1 = require("../../environments/varEnvironments");
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const http_status_1 = __importDefault(require("http-status"));
class GeneralServices {
    static getDocuments(req, res) {
        const type = req.params.type;
        const documentPath = req.params.documentPath;
        if (type === 'userImage') {
            const pathImage = path_1.default.resolve(__dirname, `../../../docs/userImages/${documentPath}`);
            if (fs_1.default.existsSync(pathImage)) {
                res.sendFile(pathImage);
            }
            else {
                const pathNoImage = path_1.default.resolve(__dirname, '../../../docs/no-image.png');
                res.sendFile(pathNoImage);
            }
        }
        else {
            const pathNoImage = path_1.default.resolve(__dirname, '../../../docs/no-image.png');
            res.sendFile(pathNoImage);
        }
    }
    static getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSrv = new user_service_1.default();
            try {
                const data = {
                    totalPatients: yield patient_1.default.countDocuments(),
                    appointmentsToday: yield appointment_schema_1.Appointment.countDocuments({ dateString: varEnvironments_1.environments.currentDateString() }),
                    appointmentsAttended: yield appointment_schema_1.Appointment.countDocuments({ dateString: varEnvironments_1.environments.currentDateString(), status: 'ATENDIDA' })
                };
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Informacion de dashboard cargada correctamente', data));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cargar datos de dashboard', error));
            }
        });
    }
}
exports.default = GeneralServices;
