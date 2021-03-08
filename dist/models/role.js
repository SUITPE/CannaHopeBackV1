"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.RolSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'En necesario nombrar el rol'],
        unique: true
    },
    description: {
        type: String,
        required: false,
        maxlength: [50, 'Solo puede ingresar 50 caracteres']
    },
    status: {
        type: Boolean,
        default: true
    }
});
const Rol = mongoose_1.default.model('Role', exports.RolSchema);
exports.default = Rol;
