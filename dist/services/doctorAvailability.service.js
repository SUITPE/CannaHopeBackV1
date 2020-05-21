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
const DoctorAvailability_schema_1 = require("../schema/DoctorAvailability.schema");
class DoctorAvailabilityService {
    save(doctorAvailability) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorAvailability.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al guardar en la base de datos',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DoctorAvailability_schema_1.DoctorAvailability.find({ isEnabled: true }).populate({
                    path: 'doctor',
                    select: 'names surenames email image nickName'
                });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al consultar franja disponible de paciente',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    findByDoctorId(idDoctor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DoctorAvailability_schema_1.DoctorAvailability.find({ doctor: idDoctor }, { isEnabled: true }).populate({
                    path: 'doctor',
                    select: 'names surenames email image nickName'
                });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al consultar franja disponible de paciente',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const founded = yield DoctorAvailability_schema_1.DoctorAvailability.findOne({ _id: id }, { isEnabled: true });
                return founded;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Erro al consultar franja por id',
                    description: error
                };
                throw (errorDetail);
            }
        });
    }
    delete(IdDoctorAvailability) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield DoctorAvailability_schema_1.DoctorAvailability.updateOne({ _id: IdDoctorAvailability }, { isEnabled: false });
                return true;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en consulta a la base de datos mientras se elimina franja de disponibilida de doctor',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.DoctorAvailabilityService = DoctorAvailabilityService;
