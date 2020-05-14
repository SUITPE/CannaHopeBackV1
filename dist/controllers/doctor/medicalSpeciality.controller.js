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
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const medicalSpeciality_schema_1 = require("../../schema/medicalSpeciality.schema");
const medicalSpeciality_service_1 = require("../../services/medicalSpeciality.service");
class MedicalSpecialityController {
    createMedicalSpeciality(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicalSpecialitySrv = new medicalSpeciality_service_1.MedicalSpecialityService();
            const medicalSpeciality = req.body;
            try {
                const newMedicalSpeciality = new medicalSpeciality_schema_1.MedicalSpeciality(medicalSpeciality);
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'especialidad registrada correctamente', yield medicalSpecialitySrv.save(newMedicalSpeciality)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al registrar especialidad en sistema', error));
            }
        });
    }
    getAllmedicalSpecialities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicalSpecialitySrv = new medicalSpeciality_service_1.MedicalSpecialityService();
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Lista de especialidades medicas cargada correctamente', yield medicalSpecialitySrv.find()));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cargar especialidades medicas registradas', error));
            }
        });
    }
    UpdatemedicalSpeciality(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicalSpecialitySrv = new medicalSpeciality_service_1.MedicalSpecialityService();
            const medicalSpeciality = req.body;
            const idMedicalSpeciality = req.params.id;
            try {
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, `Especialidad medica ${medicalSpeciality.name} actualizada correctamente`, yield medicalSpecialitySrv.update(idMedicalSpeciality, medicalSpeciality)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en lña base de datos al actualizar especialidad', error));
            }
        });
    }
}
exports.MedicalSpecialityController = MedicalSpecialityController;
