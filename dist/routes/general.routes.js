"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const general_1 = __importDefault(require("../controllers/generalControllers/general"));
const documentType_controller_1 = __importDefault(require("../controllers/user/documentType.controller"));
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const generalRoutes = express_1.Router();
const docuemtTypeCtr = new documentType_controller_1.default();
generalRoutes.get('/GeDocuments/:type/:documentPath', general_1.default.getDocuments);
generalRoutes.get('/getDashboardData', general_1.default.getDashboardData);
generalRoutes.post('/documentType/save', userValidation_middleware_1.default.validation, (req, res) => docuemtTypeCtr.saveNewDocumentType(req, res));
generalRoutes.get('/documentType/find', userValidation_middleware_1.default.validation, (req, res) => docuemtTypeCtr.getAll(req, res));
exports.default = generalRoutes;
