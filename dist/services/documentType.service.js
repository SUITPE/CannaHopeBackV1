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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTypeSrevice = void 0;
const documentType_schema_1 = require("../schema/documentType.schema");
class DocumentTypeSrevice {
    constructor() { }
    save(documentType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield documentType.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al insertar tipo de documento',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield documentType_schema_1.DocumentType.find({ isEnabled: true });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al consultar tipo de documento',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.DocumentTypeSrevice = DocumentTypeSrevice;
