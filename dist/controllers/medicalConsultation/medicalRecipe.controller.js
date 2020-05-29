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
const fs = require('fs');
const path_1 = __importDefault(require("path"));
const generateMedicalRecipe_1 = __importDefault(require("./generateMedicalRecipe"));
const medicalConsultation_service_1 = __importDefault(require("../../services/medicalConsultation.service"));
class MedicalRecipeController {
    constructor(medicalConsultationSrv = new medicalConsultation_service_1.default()) {
        this.medicalConsultationSrv = medicalConsultationSrv;
    }
    generateAnSendMedicalRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idConsultation = req.params.idConsultation;
            const type = req.params.type;
            try {
                const consultationData = yield this.medicalConsultationSrv.findById(idConsultation);
                const pdfPath = yield generateMedicalRecipe_1.default(consultationData, consultationData.medicalDiagnostic.medicalTreatment);
                const pathNoImage = path_1.default.resolve(__dirname, `../../../document.pdf`);
                res.download(pathNoImage);
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en servidor al generar receta medica', null, error));
            }
            finally {
                setTimeout(() => {
                    fs.unlinkSync('./document.pdf');
                }, 3000);
            }
        });
    }
}
exports.MedicalRecipeController = MedicalRecipeController;
