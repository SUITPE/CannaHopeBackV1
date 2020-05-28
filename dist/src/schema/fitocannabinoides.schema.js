"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.FitocannabinoidesShema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { collection: 'fitocannabinoides' });
exports.Fitocannabinoides = mongoose_1.default.model('Fitocannabinoides', exports.FitocannabinoidesShema);
