"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.DiseaseSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    value: {
        type: Boolean,
        default: null
    }
});
const Disease = mongoose_1.default.model('Disease', exports.DiseaseSchema);
exports.default = Disease;
