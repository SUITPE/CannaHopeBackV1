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
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const doctorAvailability_service_1 = require("../../services/doctorAvailability.service");
const DoctorAvailability_schema_1 = require("../../schema/DoctorAvailability.schema");
class DoctorAvailabilityController {
    createDoctorAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorAvailability = req.body;
            const doctorAvailabilitySrv = new doctorAvailability_service_1.DoctorAvailabilityService();
            try {
                const newDoctorAvailability = new DoctorAvailability_schema_1.DoctorAvailability({
                    doctor: doctorAvailability.doctor,
                    timeSet: doctorAvailability.timeSet,
                    duartion: doctorAvailability.duartion
                });
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Disponibilidad de doctor guardada correctamente', yield doctorAvailabilitySrv.save(newDoctorAvailability)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al registrar disponibilidad de doctor', error));
            }
        });
    }
    getAllDoctorAvailabilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorAvailabilitySrv = new doctorAvailability_service_1.DoctorAvailabilityService();
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Franja de disponibilidad de doctor cargada correctamente', yield doctorAvailabilitySrv.findAll()));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cargar franja de disponibilidad de doctor', error));
            }
        });
    }
    getDoctorAvailabilitiesByIdDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorAvailabilitySrv = new doctorAvailability_service_1.DoctorAvailabilityService();
            const idDoctor = req.params.idDoctor;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Franja de disponibilidades de doctor cargadas correctamente', yield doctorAvailabilitySrv.findByDoctorId(idDoctor)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cargar franja de disponibilidad de doctor', error));
            }
        });
    }
}
exports.DoctorAvailabilityController = DoctorAvailabilityController;
