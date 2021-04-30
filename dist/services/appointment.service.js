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
    findPatientsNotEvaluated(idDoctor, dateString, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (role == 'Administrador') {
                    return yield appointment_schema_1.Appointment.find({ dateString: { $lt: dateString }, status: 'ADMITIDA' })
                        .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                        .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                        .populate({ path: 'specialty', select: 'name description' })
                        .populate('doctorAvailability', 'timeTo timeFrom')
                        .populate('createdBy', 'names surenames email')
                        .sort({ date: -1 }).exec();
                }
                return yield appointment_schema_1.Appointment.find({ doctor: idDoctor, dateString: { $lt: dateString }, status: 'ADMITIDA' })
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email')
                    .sort({ date: -1 }).exec();
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
    findByDateAndDoctor(idDoctor, dateString) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  return await Appointment.find({ doctor: idDoctor, dateString: /dateString/, status: {$ne: 'VENCIDA'}})
                return yield appointment_schema_1.Appointment.find({ doctor: idDoctor, dateString: { $regex: dateString }, status: { $ne: 'VENCIDA' } })
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email')
                    .sort({ date: -1 }).exec();
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
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document image sex' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email')
                    .sort({ date: -1 }).exec();
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
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield appointment_schema_1.Appointment.updateOne({ _id: id }, { status });
                return true;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al momento de actualizar estado de consulta',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const founded = yield appointment_schema_1.Appointment.findById(id)
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email');
                return founded;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al momento de actualizar estado de consulta',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    update(_id, appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return appointment_schema_1.Appointment.updateOne({ _id }, appointment);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al actualizar consulta',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findByDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.find({ doctor: id })
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate('doctorAvailability', 'timeTo timeFrom')
                    .populate('createdBy', 'names surenames email')
                    .sort({ date: -1 }).exec();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al cargar consultas por id de doctor',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.deleteOne({ _id: id });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en consulta a la base de datos pára eliminar consulta',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    updatePaymentStatus(id, paymentStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.updateOne({ _id: id }, { paymentStatus });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al momento de actualizar estado de consulta',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    updatePaymentData(id, paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.updateOne({ _id: id }, { paymentData });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al momento de actualizar estado de consulta',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    getByDateString(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_schema_1.Appointment.find({ dateString: date })
                    .populate({ path: 'patient', select: 'user', populate: { path: 'user', select: 'names surenames email mobilePhone document' } })
                    .populate({ path: 'doctor', select: 'names surenames email mobilePhone' })
                    .populate({ path: 'specialty', select: 'name description' })
                    .populate({ path: 'doctorAvailability', select: 'timeTo timeFrom' })
                    .populate('createdBy', 'names surenames email')
                    .sort({ date: -1 })
                    .exec();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al cargar  consultas registradas',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.AppointmentService = AppointmentService;
