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
const medicalReevaluation_service_1 = require("../../services/medicalReevaluation.service");
const emailsController_1 = __importDefault(require("../generalControllers/emailsController"));
const varEnvironments_1 = require("../../environments/varEnvironments");
class MedicalRecipeController {
    constructor(medicalConsultationSrv = new medicalConsultation_service_1.default(), medicalReevaluationSrv = new medicalReevaluation_service_1.MedicalReevaluationService()) {
        this.medicalConsultationSrv = medicalConsultationSrv;
        this.medicalReevaluationSrv = medicalReevaluationSrv;
    }
    generateAnSendMedicalRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const type = req.params.type;
            let errorFlag = false;
            let patientFounded;
            let pdfPath = '';
            try {
                if (type === 'consultation') {
                    const consultationData = yield this.medicalConsultationSrv.findById(id);
                    pdfPath = yield generateMedicalRecipe_1.default(consultationData, consultationData.medicalDiagnostic.medicalTreatment, 'consiltation');
                    patientFounded = consultationData.patient;
                }
                if (type === 'reevaluation') {
                    const medicalReevaluation = yield this.medicalReevaluationSrv.findById(id);
                    const consultationData = yield this.medicalConsultationSrv.findById(medicalReevaluation.medicalConsultation);
                    consultationData.recomendations = medicalReevaluation.recomendations;
                    consultationData.createDate = medicalReevaluation.createDate;
                    pdfPath = yield generateMedicalRecipe_1.default(consultationData, medicalReevaluation.treatment, 'reevaluation');
                    patientFounded = consultationData.patient;
                }
                if (type === 'sendEmail') {
                    const consultationData = yield this.medicalConsultationSrv.findById(id);
                    pdfPath = yield generateMedicalRecipe_1.default(consultationData, consultationData.medicalDiagnostic.medicalTreatment);
                    patientFounded = consultationData.patient;
                    const dp = varEnvironments_1.currentEnv === 'PROD' ? `../docs/${pdfPath}` : `docs/${pdfPath}`;
                    const emf = [
                        {
                            filename: 'Recetamedica',
                            path: dp,
                            contentType: 'application/pdf'
                        }
                    ];
                    const emailtos = new emailsController_1.default('gmail', `Receta medica emitida por cannahope`, patientFounded.user.email, 'RECETA MEDICA - CANNAHOPE', emf);
                    yield emailtos.sendEmail();
                    return res.status(http_status_1.default.OK);
                }
                const documentPath = varEnvironments_1.currentEnv === 'PROD' ? `../docs/${pdfPath}` : `docs/${pdfPath}`;
                const emailFiles = [
                    {
                        filename: 'Recetamedica',
                        path: documentPath,
                        contentType: 'application/pdf'
                    }
                ];
                const email = new emailsController_1.default('gmail', `Receta medica emitida por cannahope`, patientFounded.user.email, 'RECETA MEDICA - CANNAHOPE', emailFiles);
                yield email.sendEmail();
                const pathNoImage = path_1.default.resolve(__dirname, `../../../docs/${pdfPath}`);
                res.download(pathNoImage);
            }
            catch (error) {
                errorFlag = true;
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en servidor al generar receta medica', null, error));
            }
            finally {
                setTimeout(() => {
                    if (!errorFlag) {
                        const documentPath = varEnvironments_1.currentEnv === 'PROD' ? `../docs/${pdfPath}` : `docs/${pdfPath}`;
                        fs.unlinkSync(documentPath);
                    }
                }, 3000);
            }
        });
    }
}
exports.MedicalRecipeController = MedicalRecipeController;
