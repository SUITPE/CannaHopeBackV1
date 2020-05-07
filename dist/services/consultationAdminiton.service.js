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
const consultationAdmision_1 = __importDefault(require("../models/consultationAdmision"));
class ConsultationAdmitionService {
    constructor() { }
    save(consultationAdmition) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield consultationAdmition.save());
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    getByIdPatient(idPatient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield consultationAdmision_1.default.find({ patient: idPatient })
                    .populate({
                    path: 'patient',
                    select: 'patientStatus names surenames',
                    populate: {
                        path: 'user',
                        select: 'names surenames sex'
                    }
                })
                    .populate({
                    path: 'createdBy',
                    select: 'names surenames email sex mobilePhone'
                }));
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.ConsultationAdmitionService = ConsultationAdmitionService;
