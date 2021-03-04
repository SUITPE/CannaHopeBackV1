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
const patientAuxiliary_1 = __importDefault(require("../models/patientAuxiliary"));
class PatientAuxiliaryService {
    update(patientAuxiliary) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientAuxiliary_1.default.updateOne({ patient: patientAuxiliary.patient }, patientAuxiliary);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error la hacer consulta en db',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    save(patientAuxiliary) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientAuxiliary.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al momento de consultar la base de datos',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    findById(idPatientAuxiliary) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientAuxiliary = yield patientAuxiliary_1.default.findById(idPatientAuxiliary);
                return patientAuxiliary;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al hacer consulta a la base de datos',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    getByIdPatient(idPatient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield patientAuxiliary_1.default.find({ patient: idPatient }));
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = PatientAuxiliaryService;
