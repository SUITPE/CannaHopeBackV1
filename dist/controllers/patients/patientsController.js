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
const patient_1 = __importDefault(require("../../models/patient"));
const userController_1 = __importDefault(require("../user/userController"));
class PatientController {
    constructor() { }
    insert(patient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const userCtr = new userController_1.default();
            try {
                const userSaved = yield userCtr.save(patient);
                const newPatient = new patient_1.default({
                    reasonAdmission: patient.reasonAdmission,
                    numberOfAppointment: 0,
                    patientStatus: null,
                    user: userSaved._id
                });
                newPatient.save({}, (error, patientSaved) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        throw new Error(`Error al registrar paciente ${error}`);
                    }
                    const patiendRes = yield this.findById(patientSaved.id);
                    resolve(patiendRes);
                }));
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    findById(idPatient) {
        return new Promise((resolve, reject) => {
            try {
                patient_1.default.findById(idPatient)
                    .populate({
                    path: 'user',
                    select: '-password',
                    populate: [
                        {
                            path: 'rol ',
                            select: 'description',
                        },
                        {
                            path: 'createdBy ',
                            select: 'nickName',
                        },
                    ]
                })
                    .exec((error, patient) => {
                    if (error) {
                        const errorDetail = {
                            name: `Error cargar paciente con id ${idPatient}`,
                            description: error
                        };
                        reject(errorDetail);
                    }
                    resolve(patient);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getAll(from, limit) {
        return new Promise((resolve, reject) => {
            patient_1.default.find()
                .populate({
                path: 'user',
                select: 'image _id names surenames nickName email mobilePhone',
                populate: {
                    path: 'rol',
                    select: 'description'
                }
            })
                .skip(from)
                .limit(limit)
                .exec((error, patients) => {
                if (error) {
                    const errorDetail = {
                        name: `Error al cargar pacienttes`,
                        description: error
                    };
                    reject(errorDetail);
                }
                resolve(patients);
            });
        });
    }
    getTotalRegistered() {
        return new Promise((resolve, reject) => {
            patient_1.default.countDocuments({ patientStatus: 'active' }, (err, total) => {
                resolve(total);
            });
        });
    }
}
exports.default = PatientController;
