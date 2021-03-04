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
const medicalDiagnostic_1 = require("../../models/medicalDiagnostic");
class MedicalDiagnosticController {
    save(medicalDiagnostic) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newMedicalDiagnostic = new medicalDiagnostic_1.MedicalDiagnostic({
                    patient: medicalDiagnostic.patient,
                    doctor: medicalDiagnostic.doctor,
                    disease: medicalDiagnostic.disease,
                    description: medicalDiagnostic.description,
                    createDate: medicalDiagnostic.createDate,
                    medicalTreatment: medicalDiagnostic.medicalTreatment,
                });
                const medicalDiagnosticSaved = yield newMedicalDiagnostic.save();
                resolve(newMedicalDiagnostic);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.MedicalDiagnosticController = MedicalDiagnosticController;
