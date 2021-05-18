"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaritalStatus = exports.MaritalStatusSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MaritalStatusSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    enabled: {
        type: Boolean
    }
}, { collection: 'maritalStatus' });
exports.MaritalStatus = mongoose_1.default.model('MaritalStatus', exports.MaritalStatusSchema);
