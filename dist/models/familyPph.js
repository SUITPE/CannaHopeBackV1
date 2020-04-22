"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FamilyPphSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    father: {
        type: String,
        default: 'no'
    },
    mother: {
        type: String,
        default: 'no'
    },
    spouse: {
        type: String,
        default: 'no'
    },
    children: {
        type: String,
        default: 'no'
    },
    siblings: {
        type: String,
        default: 'no'
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
const FamilyPph = mongoose_1.default.model('FamilyPph', FamilyPphSchema);
exports.default = FamilyPph;
