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
exports.PatientPhService = void 0;
const patientPh_1 = __importDefault(require("../models/patientPh"));
class PatientPhService {
    save(pateintPh) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield pateintPh.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al guardar historial patologico de paciente',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    update(patientph) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patientph.updateOne(patientph);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al guardar historial patologico de paciente',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const founded = yield patientPh_1.default.findById(id)
                    .populate({ path: 'createdBy updatedBy', select: 'names surenames email' });
                return founded;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al consultar historial patologico por id',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
}
exports.PatientPhService = PatientPhService;
