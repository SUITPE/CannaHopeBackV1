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
exports.FitocannabinoidesController = void 0;
const fitocannabinoides_service_1 = require("../../services/fitocannabinoides.service");
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const http_status_1 = __importDefault(require("http-status"));
class FitocannabinoidesController {
    constructor(fitocannabinoidesSrv = new fitocannabinoides_service_1.FitocannabinoidesService()) {
        this.fitocannabinoidesSrv = fitocannabinoidesSrv;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(http_status_1.default.OK).send(new jsonResp_1.default(true, 'Fitocanabinnoides cargados correctamente', yield this.fitocannabinoidesSrv.find()));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en servidor al consultar Fitocannabinoides', null, error));
            }
        });
    }
}
exports.FitocannabinoidesController = FitocannabinoidesController;
