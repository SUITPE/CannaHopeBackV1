"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodySystem = exports.BodySystemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.BodySystemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Debe ingresar un nombre para el sistema del cuerpo'],
    },
    description: {
        type: String,
        required: [true, 'Debe ingresar uns descripcion para el sistema del cuerpo']
    },
    value: {
        type: Boolean,
        default: 'no',
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
exports.BodySystem = mongoose_1.default.model('BodySystem', exports.BodySystemSchema);
