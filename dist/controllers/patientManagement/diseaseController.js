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
const disease_1 = __importDefault(require("../../models/disease"));
const disease_service_1 = require("../../services/disease.service");
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
class DiseaseController {
    constructor(diseaseSrv) {
        this.diseaseSrv = diseaseSrv;
    }
    saveNewDisease(diseaseData) {
        return new Promise((resolve, reject) => {
            try {
                const newDisease = new disease_1.default({
                    name: diseaseData.name,
                    description: diseaseData.description
                });
                resolve(this.diseaseSrv.save(newDisease));
            }
            catch (error) {
                reject(JSON.stringify(error));
            }
        });
    }
    getDiseaseList() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const diseaseSrv = new disease_service_1.DiseaseService();
            try {
                resolve(yield diseaseSrv.findAll());
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const diseaseSrv = new disease_service_1.DiseaseService();
            const idDisease = req.params.id;
            try {
                const diseaseDeleted = yield diseaseSrv.delete(idDisease);
                return res.status(500).send(new jsonResp_1.default(true, 'Enfermedad generica de sistema eliminada correctamente', diseaseDeleted));
            }
            catch (error) {
                return res.status(500).send(new jsonResp_1.default(false, 'Error al eliminar enfermedad generia en sistema', error));
            }
        });
    }
}
exports.DiseaseController = DiseaseController;
