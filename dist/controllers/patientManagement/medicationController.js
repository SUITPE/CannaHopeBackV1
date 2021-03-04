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
const medication_1 = require("../../models/medication");
const jsonResp_1 = require("../../models/jsonResp");
const medication_service_1 = __importDefault(require("../../services/medication.service"));
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
class MedicationController {
    save(medication) {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail = new jsonResp_1.ErrorDetail();
                const newMedication = new medication_1.Medication({
                    name: medication.name,
                    description: medication.description,
                });
                newMedication.save({}, (error, medicationSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar medications';
                        errorDetail.description = error;
                        reject(errorDetail);
                    }
                    else {
                        resolve(medicationSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail = new jsonResp_1.ErrorDetail();
                medication_1.Medication.find({ isEnabled: true }, (error, medicationList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de medications';
                        errorDetail.description = error;
                        reject(error);
                    }
                    else {
                        resolve(medicationList);
                    }
                }).sort({ name: 1 });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicationSrv = new medication_service_1.default();
            const idMedication = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_2.default(true, 'medications eliminado correctamente', yield medicationSrv.delete(idMedication)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error en la base de datos al eliminar medications', error));
            }
        });
    }
}
exports.default = MedicationController;
