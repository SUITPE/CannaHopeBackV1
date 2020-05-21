"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const general_1 = __importDefault(require("../controllers/generalControllers/general"));
const generalRoutes = express_1.Router();
generalRoutes.get('/GeDocuments/:type/:documentPath', general_1.default.getDocuments);
generalRoutes.get('/getDashboardData', general_1.default.getDashboardData);
exports.default = generalRoutes;
