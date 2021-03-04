"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.BankSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como nombre en banca'],
        required: [true, 'El nombre del banca es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en banka'],
    },
    value: {
        type: Boolean,
        default: false
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
exports.Bank = mongoose_1.default.model('Bank', exports.BankSchema);
