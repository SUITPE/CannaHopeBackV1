"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const harmfulHabits_1 = __importDefault(require("../../../models/harmfulHabits"));
const jsonResp_1 = require("../../../models/jsonResp");
const harmfulHabit_service_1 = __importDefault(require("../../../services/harmfulHabit.service"));
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_2 = __importDefault(require("../../../models/jsonResp"));
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
                    type: harmfulHabit.type
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
                harmfulHabits_1.default.find({ isEnabled: true }, {
                    name: 1,
                    description: 1,
                    value: 1,
                    quantity: 1,
                    frequency: 1,
                    type: 1,
                    _id: 1
                }, (error, HarmfulHabitList) => {
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const harmfulHabitSrv = new harmfulHabit_service_1.default();
            const idHarmfulHabit = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_2.default(true, 'Habito nocivo eliminado correctamente', yield harmfulHabitSrv.delete(idHarmfulHabit)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error al eliminar habito nocivo', error));
            }
        });
    }
}
exports.default = HarmfulHabitController;
