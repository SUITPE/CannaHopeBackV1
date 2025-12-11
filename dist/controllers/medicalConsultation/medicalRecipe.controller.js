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
exports.MedicalRecipeController = void 0;

const http_status_1 = __importDefault(require("http-status"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));

const fs = require("fs");
const path = require("path");

const generateMedicalRecipe_1 = __importDefault(require("./generateMedicalRecipe"));
const medicalConsultation_service_1 = __importDefault(require("../../services/medicalConsultation.service"));
const medicalReevaluation_service_1 = require("../../services/medicalReevaluation.service");

const emailsController_1 = __importDefault(require("../generalControllers/emailsController"));
const { currentEnv } = require("../../environments/varEnvironments");

class MedicalRecipeController {
    constructor(
        medicalConsultationSrv = new medicalConsultation_service_1.default(),
        medicalReevaluationSrv = new medicalReevaluation_service_1.MedicalReevaluationService()
    ) {
        this.medicalConsultationSrv = medicalConsultationSrv;
        this.medicalReevaluationSrv = medicalReevaluationSrv;
    }

    generateAnSendMedicalRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const type = req.params.type;

            let errorFlag = false;
            let pdfPath = "";
            let patientFounded;

            try {
                /** ====================================================
                 *                   CONSULTATION
                 *  ==================================================== */
                if (type === "consultation") {
                    const consultationData =
                        yield this.medicalConsultationSrv.findById(id);

                    pdfPath = yield generateMedicalRecipe_1.default(
                        consultationData,
                        consultationData.medicalDiagnostic.medicalTreatment,
                        "consultation"
                    );

                    patientFounded = consultationData.patient;

                    const emailFiles = [
                        {
                            filename: "Recetamedica.pdf",
                            path: pdfPath,
                            contentType: "application/pdf",
                        },
                    ];

                    // Envío del email (no rompas si falla)
                    try {
                        const email = new emailsController_1.default(
                            "SendPulse",
                            `Receta médica emitida por Cannahope`,
                            // patientFounded.user.email,
                            "alvaro.burga@gmail.com", // PARA TEST
                            "RECETA MÉDICA - CANNAHOPE",
                            emailFiles
                        );
                        yield email.sendEmail();
                    } catch (emailErr) {
                        console.error("Error al enviar email (consultation):", emailErr);
                    }

                    return res.download(pdfPath);
                }

                /** ====================================================
                 *                   REEVALUATION
                 *  ==================================================== */
                if (type === "reevaluation") {
                    const medicalReevaluation =
                        yield this.medicalReevaluationSrv.findById(id);

                    const consultationData =
                        yield this.medicalConsultationSrv.findById(
                            medicalReevaluation.medicalConsultation
                        );

                    consultationData.recomendations = medicalReevaluation.recomendations;
                    consultationData.createDate = medicalReevaluation.createDate;

                    pdfPath = yield generateMedicalRecipe_1.default(
                        consultationData,
                        medicalReevaluation.treatment,
                        "reevaluation"
                    );

                    patientFounded = consultationData.patient;

                    const emailFiles = [
                        {
                            filename: "Recetamedica.pdf",
                            path: pdfPath,
                            contentType: "application/pdf",
                        },
                    ];

                    try {
                        const email = new emailsController_1.default(
                            "SendPulse",
                            `Receta médica emitida por Cannahope`,
                            patientFounded.user.email,
                            "RECETA MÉDICA - CANNAHOPE",
                            emailFiles
                        );
                        yield email.sendEmail();
                    } catch (emailErr) {
                        console.error("Error al enviar email (reevaluation):", emailErr);
                    }

                    return res.download(pdfPath);
                }

                /** ====================================================
                 *                   SEND EMAIL ONLY
                 *  ==================================================== */
                if (type === "sendEmail") {
                    const consultationData = yield this.medicalConsultationSrv.findById(id);

                    pdfPath = yield generateMedicalRecipe_1.default(
                        consultationData,
                        consultationData.medicalDiagnostic.medicalTreatment,
                        "sendEmail"
                    );

                    patientFounded = consultationData.patient;

                    const emailFiles = [
                        {
                            filename: "Recetamedica.pdf",
                            path: pdfPath,
                            contentType: "application/pdf",
                        },
                    ];

                    try {
                        const emailtos = new emailsController_1.default(
                            "SendPulse",
                            `Receta medica emitida por cannahope`,
                            patientFounded.user.email,
                            "RECETA MEDICA - CANNAHOPE",
                            emailFiles
                        );
                        yield emailtos.sendEmail();
                    } catch (emailErr) {
                        console.error("Error al enviar email (sendEmail):", emailErr);
                        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(
                            new jsonResp_1.default(
                                false,
                                "Error al enviar correo con receta médica",
                                null,
                                emailErr
                            )
                        );
                    }

                    return res.status(http_status_1.default.OK).send(
                        new jsonResp_1.default(
                            true,
                            "Receta médica enviada por correo",
                            null,
                            null
                        )
                    );
                }

                /** ====================================================
                 *                     TYPE INVÁLIDO
                 *  ==================================================== */
                return res.status(http_status_1.default.BAD_REQUEST).send(
                    new jsonResp_1.default(
                        false,
                        "Tipo de operación inválido para receta médica",
                        null,
                        null
                    )
                );
            } catch (error) {
                errorFlag = true;
                console.error("Error en generateAnSendMedicalRecipe:", error);

                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(
                    new jsonResp_1.default(
                        false,
                        "Error en servidor al generar receta medica",
                        null,
                        error
                    )
                );
            } finally {
                setTimeout(() => {
                    if (!errorFlag && pdfPath) {
                        try {
                            fs.unlinkSync(pdfPath);
                        } catch (e) {
                            console.warn("No se pudo borrar PDF temporal:", e);
                        }
                    }
                }, 3000);
            }
        });
    }
}

exports.MedicalRecipeController = MedicalRecipeController;
