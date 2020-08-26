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
exports.MedicalReevaluationService = void 0;
const medicalReevaluation_1 = require("../models/medicalReevaluation");
class MedicalReevaluationService {
    constructor() { }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const founded = yield medicalReevaluation_1.MedicalReevaluation.findById(id);
                return founded;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error el consulta a la base de datos para obtener reevaluacion por id',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    save(medicalReevaluation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield medicalReevaluation.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error el consulta a la base de datos para guardar reevaluacion',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findByMedicalConsultation(idMedicalConsultation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const founded = yield medicalReevaluation_1.MedicalReevaluation.find({ medicalConsultation: idMedicalConsultation });
                return founded;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error el consulta a la base de datos para obtener reevaluaciones por id de consulta realizada',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.MedicalReevaluationService = MedicalReevaluationService;
