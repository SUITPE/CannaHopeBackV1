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
const medicalReevaluation_1 = require("../../models/medicalReevaluation");
const medicalConsultation_1 = __importDefault(require("./medicalConsultation"));
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const varEnvironments_1 = require("../../environments/varEnvironments");
const medicalReevaluation_service_1 = require("../../services/medicalReevaluation.service");
class MedicalReevaluationController {
    constructor(medicalConsultationCtr = new medicalConsultation_1.default(), medicalReeevaluation = new medicalReevaluation_service_1.MedicalReevaluationService()) {
        this.medicalConsultationCtr = medicalConsultationCtr;
        this.medicalReeevaluation = medicalReeevaluation;
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicalReevaluation = req.body;
            try {
                const medicalConsultation = yield this.medicalConsultationCtr.findById(medicalReevaluation.medicalConsultation);
                medicalConsultation.reevaluations.push(medicalReevaluation);
                const medicalConsultationUpdated = yield this.medicalConsultationCtr.updateReevaluation(medicalConsultation.reevaluations, medicalConsultation._id);
                const newMedicalReevaluation = new medicalReevaluation_1.MedicalReevaluation({
                    medicalConsultation: medicalReevaluation.medicalConsultation,
                    description: medicalReevaluation.description,
                    createDate: varEnvironments_1.environments.currentDate(),
                    painScale: medicalReevaluation.painScale,
                    treatment: medicalReevaluation.medicalTreatment
                });
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Reevaluacion emdica registradac crrectametne ', yield this.medicalReeevaluation.save(newMedicalReevaluation)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en servidor al guardar reevaluacion medica', null, error));
            }
        });
    }
    getByIdConsultation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                return res.status(http_status_1.default.OK).send(new jsonResp_1.default(true, 'Reevaluaciones medicas registradas correctamente ', yield this.medicalReeevaluation.findByMedicalConsultation(id)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en servidor al guardar reevaluacion medica', null, error));
            }
        });
    }
}
exports.default = MedicalReevaluationController;
