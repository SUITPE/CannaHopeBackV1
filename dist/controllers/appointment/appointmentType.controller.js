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
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
class AppointmentTypesController {
    constructor(AppointmentTypeSrv) {
        this.AppointmentTypeSrv = AppointmentTypeSrv;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(http_status_1.default.OK).send(new jsonResp_1.default(true, 'Tiposd de consulta cargados de manera exitosa', yield this.AppointmentTypeSrv.findAll()));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en servidor al consultar tipos de consulta', null, error));
            }
        });
    }
}
exports.AppointmentTypesController = AppointmentTypesController;
