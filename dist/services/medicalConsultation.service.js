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
Object.defineProperty(exports, "__esModule", { value: true });
const medicalConsultation_1 = require("../models/medicalConsultation");
class MedicalConsultationService {
    updateMedicaDiagnostic(idConsultation, medicalDiagnostic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield medicalConsultation_1.MedicalConsultation.updateOne({ _id: idConsultation }, { medicalDiagnostic });
                return true;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la consulta a la base de datos al actualizar reevaluación',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.default = MedicalConsultationService;
