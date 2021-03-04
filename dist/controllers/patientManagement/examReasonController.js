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
const examReason_1 = require("../../models/examReason");
const jsonResp_1 = require("../../models/jsonResp");
const examReason_service_1 = __importDefault(require("../../services/examReason.service"));
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
class ExamReasonController {
    save(examReason) {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail = new jsonResp_1.ErrorDetail();
                const newExamReason = new examReason_1.ExamReason({
                    name: examReason.name,
                    description: examReason.description,
                });
                newExamReason.save({}, (error, examReasonSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar motivo de exámenes';
                        errorDetail.description = error;
                        reject(errorDetail);
                    }
                    else {
                        resolve(examReasonSaved);
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
                examReason_1.ExamReason.find({ isEnabled: true }, (error, examReasonList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de motivo de exámenes';
                        errorDetail.description = error;
                        reject(error);
                    }
                    else {
                        resolve(examReasonList);
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
            const examReasonSrv = new examReason_service_1.default();
            const idExamReason = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_2.default(true, 'Motivo de exámenes eliminado correctamente', yield examReasonSrv.delete(idExamReason)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error en la base de datos al eliminar motivo de exámenes', error));
            }
        });
    }
}
exports.default = ExamReasonController;
