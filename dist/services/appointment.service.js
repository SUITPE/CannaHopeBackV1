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
const appointment_schema_1 = require("../schema/appointment.schema");
class AppointmentService {
    save(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al momento de hacer la consulta para guardar cita medica',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findByDateAndDoctor(idDoctor, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.find({ doctor: idDoctor, date });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al momento de hacer la consulta para guardar cita medica',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.find()
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email');
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al momento de la consulta para cargar todas la citas medicas registradas',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.AppointmentService = AppointmentService;
