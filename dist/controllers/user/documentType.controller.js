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
const documentType_service_1 = require("../../services/documentType.service");
const documentType_schema_1 = require("../../schema/documentType.schema");
class DocumentTypeController {
    constructor(documentTypeSrv = new documentType_service_1.DocumentTypeSrevice()) {
        this.documentTypeSrv = documentTypeSrv;
    }
    saveNewDocumentType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentType = req.body;
            try {
                const newDocumentType = new documentType_schema_1.DocumentType(documentType);
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Tipo de documento registrado exitosamente', yield this.documentTypeSrv.save(newDocumentType)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al registrar tipo de documento', error));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Tipo de documento registrado exitosamente', yield this.documentTypeSrv.find()));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al Cargar lista de tipos de documento', error));
            }
        });
    }
}
exports.default = DocumentTypeController;
