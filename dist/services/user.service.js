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
const user_1 = __importDefault(require("../models/user"));
class UserService {
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.updateOne({ _id: user._id }, user);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error la hacer consulta en db',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email: userEmail, status: true });
                return user;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en consulta de usuario por email',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findByRolId(idRol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_1.default.find({
                    rol: idRol,
                    status: true
                }, {
                    names: 1,
                    image: 1,
                    surenames: 1,
                    nickName: 1,
                    sex: 1,
                    ocupation: 1,
                    email: 1,
                    mobilePhone: 1,
                });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en consulta en la base de datos al obtener usuario por id de rol',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user.save();
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al momento de consultar la base de datos',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    getBySpecialtyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_1.default.find({ specialty: id, status: true }, {
                    names: 1,
                    image: 1,
                    surenames: 1,
                    nickName: 1,
                    sex: 1,
                    ocupation: 1,
                    email: 1,
                    mobilePhone: 1,
                });
            }
            catch (error) {
                const errorDetail = {
                    name: `Error en consulta de doctor por especialidad ${id}`,
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    findById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(idUser);
                return user;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al hacer consulta a la base de datos',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    delete(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.updateOne({ _id: idUser }, { status: false });
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al hacer consulta a la base de datos',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
}
exports.default = UserService;
