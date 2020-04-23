"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const harmfulHabits_1 = __importDefault(require("../../models/harmfulHabits"));
const jsonResp_1 = require("../../models/jsonResp");
class HarmfulHabitController {
    constructor() {
        this.errorDetail = new jsonResp_1.ErrorDetail();
    }
    save(harmfulHabit) {
        return new Promise((resolve, reject) => {
            try {
                const newHarmfulHabit = new harmfulHabits_1.default({
                    name: harmfulHabit.name,
                    description: harmfulHabit.description,
                });
                newHarmfulHabit.save({}, (error, harmfulHabitSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al momento de guardar habito nocivo',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(harmfulHabitSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findAlll() {
        return new Promise((resolve, reject) => {
            try {
                harmfulHabits_1.default.find({ isEnabled: true }, (error, HarmfulHabitList) => {
                    if (error) {
                        this.errorDetail.name = 'Error al consultar lista de habitos nocivos';
                        this.errorDetail.description = error;
                        reject(this.errorDetail);
                    }
                    else {
                        resolve(HarmfulHabitList);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    deleteById(idHarmfulHabit) {
        return new Promise((resolve, reject) => {
            try {
                harmfulHabits_1.default.updateOne({ _id: idHarmfulHabit }, { isEnabled: false })
                    .exec((error, result) => {
                    if (error) {
                        this.errorDetail.name = 'Se registra error al actualizar habito nocivo';
                        this.errorDetail.description = error;
                        reject(this.errorDetail);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = HarmfulHabitController;
