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
const medicalSpeciality_schema_1 = require("../schema/medicalSpeciality.schema");
class MedicalSpecialityService {
    save(medicalSpeciality) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield medicalSpeciality.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al consultar la base de datos para guardar especialidad',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield medicalSpeciality_schema_1.MedicalSpeciality.find().populate({
                    path: 'createdBy updatedBy',
                    select: 'names surenames email'
                });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la consulta de especialidades en la base de datos',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    update(id, medicalSpeciality) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const procces = yield medicalSpeciality_schema_1.MedicalSpeciality.updateOne({ _id: id }, medicalSpeciality);
                const updated = yield medicalSpeciality_schema_1.MedicalSpeciality.findById(id)
                    .populate({ path: 'createdBy updatedBy', select: 'names surenames email' });
                return updated;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la consulta a la base de datospara actualizar la  especialidades ',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield medicalSpeciality_schema_1.MedicalSpeciality.deleteOne({ _id: id });
                return true;
            }
            catch (error) {
                const errorDetail = {
                    name: `Error en la consulta a la base de datos para eliminar especialidad ${id} `,
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.MedicalSpecialityService = MedicalSpecialityService;
