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
const role_1 = __importDefault(require("../models/role"));
class RolService {
    findByNane(rolName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolFounded = yield role_1.default.findOne({ name: rolName });
                return rolFounded;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al consulta rol por nombre en la base de datos',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.default = RolService;
