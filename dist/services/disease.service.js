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
exports.DiseaseService = void 0;
const disease_1 = __importDefault(require("../models/disease"));
class DiseaseService {
    constructor() { }
    findAll() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield disease_1.default.find({ isEnabled: true }, { name: 1, description: 1, value: 1, _id: 1 }).sort('name'));
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    save(disease) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield disease.save());
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    delete(idDisease) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield disease_1.default.updateOne({ _id: idDisease }, { isEnabled: false });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al consulta de base de datos',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    updateById(disease) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = disease._id;
                //delete disease._id;
                disease._id = "";
                return yield disease_1.default.updateOne({ _id: id }, disease);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DiseaseService = DiseaseService;
