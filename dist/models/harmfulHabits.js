"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.HarmfulHabitsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    value: {
        type: String,
        default: null
    },
    quantity: {
        type: String,
        default: null
    },
    frequency: {
        type: String,
        default: null
    },
    type: {
        type: String
    }
});
const HarmfulHabit = mongoose_1.default.model('HarmfulHabit', exports.HarmfulHabitsSchema);
exports.default = HarmfulHabit;
