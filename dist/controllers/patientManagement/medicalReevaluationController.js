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
const medicalConsultation_service_1 = __importDefault(require("../../services/medicalConsultation.service"));
class MedicalReevaluationController {
    save(medicalReevaluation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const medicalConsultationCtr = new medicalConsultation_1.default();
            const medicalCOnsultationSrv = new medicalConsultation_service_1.default();
            try {
                const medicalConsultation = yield medicalConsultationCtr.findById(medicalReevaluation.medicalConsultation);
                medicalConsultation.reevaluations.push(medicalReevaluation);
                const medicalConsultationUpdated = yield medicalConsultationCtr.updateReevaluation(medicalConsultation.reevaluations, medicalConsultation._id);
                medicalConsultation.medicalDiagnostic.medicalTreatment.push(...medicalReevaluation.medicalTreatment);
                const medicalTreatamentUpdated = yield medicalCOnsultationSrv.updateMedicaDiagnostic(medicalConsultation._id, medicalConsultation.medicalDiagnostic);
                const newMedicalReevaluation = new medicalReevaluation_1.MedicalReevaluation({
                    medicalConsultation: medicalReevaluation.medicalConsultation,
                    description: medicalReevaluation.description,
                    painScale: medicalReevaluation.painScale,
                    createDate: medicalReevaluation.createDate
                });
                newMedicalReevaluation.save({}, (error, medicalRevaluiationSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar reevaluacion medica',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(medicalRevaluiationSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = MedicalReevaluationController;
