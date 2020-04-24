"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const disease_1 = __importDefault(require("../../models/disease"));
class DiseaseController {
    save(diseaseData) {
        return new Promise((resolve, reject) => {
            try {
                const newDisease = new disease_1.default({
                    name: diseaseData.name,
                    description: diseaseData.description
                });
                newDisease.save({}, (error, diseaseSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar enfermedad',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(diseaseSaved);
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
                disease_1.default.find({}, { name: 1, description: 1, value: 1, _id: 1 }, (error, diseaseList) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error en consulta de enfermedades por parametros establecidos',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(diseaseList);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.DiseaseController = DiseaseController;
