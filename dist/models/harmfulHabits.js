"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HarmfulHabitsSchema = new mongoose_1.default.Schema({
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
    }
});
const HarmfulHabit = mongoose_1.default.model('HarmfulHabit', HarmfulHabitsSchema);
exports.default = HarmfulHabit;
