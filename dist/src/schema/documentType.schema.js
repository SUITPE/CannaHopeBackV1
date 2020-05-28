"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.DocumentTypeSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
exports.DocumentType = mongoose_1.default.model('DocumentType', exports.DocumentTypeSchema);
