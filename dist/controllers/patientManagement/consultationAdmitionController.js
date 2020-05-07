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
const consultationAdmision_1 = __importDefault(require("../../models/consultationAdmision"));
const jsonResp_1 = require("../../models/jsonResp");
const consultationAdminiton_service_1 = require("../../services/consultationAdminiton.service");
class ConsultationAdmitionController {
    constructor() {
        this.consultationAdmitionSrv = new consultationAdminiton_service_1.ConsultationAdmitionService();
        this.error = new jsonResp_1.ErrorDetail();
    }
    saveConsultationAdmition(consultationAdmition) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const errorDetail = new jsonResp_1.ErrorDetail();
            try {
                const newConsultationAdmition = new consultationAdmision_1.default({
                    talla: consultationAdmition.talla,
                    peso: consultationAdmition.peso,
                    perimetroabdominal: consultationAdmition.perimetroabdominal,
                    satO2: consultationAdmition.satO2,
                    fr: consultationAdmition.fr,
                    fc: consultationAdmition.fc,
                    pa: consultationAdmition.pa,
                    patient: consultationAdmition.patient,
                    createdAt: consultationAdmition.createdAt,
                    createdBy: consultationAdmition.createdBy
                });
                resolve(yield this.consultationAdmitionSrv.save(newConsultationAdmition));
            }
            catch (error) {
                errorDetail.name = 'Error al registrar admision de paciente para consulta',
                    errorDetail.description = error;
                errorDetail.status = 500;
                reject(errorDetail);
            }
        }));
    }
    getConsultationAdmitionByPatientId(idPatient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield this.consultationAdmitionSrv.getByIdPatient(idPatient));
            }
            catch (error) {
                this.error.name = 'Error al consultar admisiones para consulta de paciente registradas';
                this.error.description = error;
                this.error.status = 500;
                reject(this.error);
            }
        }));
    }
}
exports.default = ConsultationAdmitionController;
