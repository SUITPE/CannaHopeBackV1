"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class UserModel extends mongoose_1.default.Document {
    constructor() {
        super(...arguments);
        this.names = String();
        this.surenames = String();
        this.nickName = String();
        this.age = Number();
        this.birthDate = String();
        this.sex = String();
        this.document = Number();
        this.documentType = String();
        this.maritalStatus = String();
        this.ocupation = String();
        this.address = String();
        this.email = String();
        this.mobilePhone = Number();
        this.landLine = Number();
        this.healthyEntity = String();
        this.password = String();
        this.rol = String();
        this.status = Boolean();
        this.createDate = String();
        this.updateDate = String();
        this.createdBy = String();
        this.updatedBy = String();
        this.image = String();
        this.lastAccesDate = String();
        this.token = String();
    }
}
exports.UserModel = UserModel;
exports.UserSchema = new mongoose_1.default.Schema({
    names: {
        type: String,
        required: [true, 'No se ha asignado un nombre de usuario'],
        minlength: [3, 'debe ser un minimo de 5 caracteres parael nombre']
    },
    surenames: {
        type: String,
        required: [true, 'No se ha ingresado informacion de apellidos'],
        minlength: [3, 'Debe ser un minimo de 5 caracterespara el apellido']
    },
    nickName: {
        type: String,
        required: [true, 'Debe ingresar un nombre de usuario'],
        minlength: [3, 'Debe ser un minimo de 4 caracteres'],
        unique: [true, 'El alias de usuario ya se encuentra registrado en sistema']
    },
    age: {
        type: Number,
        required: [true, 'Debe ingresar una edad permitida'],
        minlength: [2, 'Debe ser mayor de edad']
    },
    birthDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha ednacimiento'],
        minlength: [2, 'Debe ser mayor de edad']
    },
    sex: {
        type: String,
        required: [true, 'Debe ingresar un sexo para el paciente'],
    },
    document: {
        type: String,
        required: [true, 'Debe ingresar el documento de usuario'],
        unique: true
    },
    documentType: {
        type: String,
        required: [true, 'Debe ingresar un tipo de documento'],
    },
    maritalStatus: {
        type: String,
        required: [true, 'Estado'],
    },
    ocupation: {
        type: String,
        required: [true, 'Debe agregar la ocupacion del usuario'],
    },
    address: {
        type: String,
        required: [true, 'Debe agregar dirección donde reside el usuario']
    },
    email: {
        type: String,
        required: [true, 'Debe ingresar un email del usuario'],
        unique: [true, 'El correo ingresado ya se encuentra registrado en sistema']
    },
    mobilePhone: {
        type: Number,
        required: [true, 'Debe agregar un telefonoo movil de usuario'],
        unique: true
    },
    landLine: {
        type: Number,
        default: 0
    },
    healthyEntity: {
        type: String,
        required: [true, 'Debe ingresar la entidad gestora de salud']
    },
    password: {
        type: String,
        minlength: 30
    },
    rol: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Debe ingresar el rol del usuario'],
    },
    status: {
        type: Boolean,
        default: true
    },
    createDate: {
        type: Date,
        default: new Date(),
    },
    updateDate: {
        type: Date,
        default: null
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    lastAccesDate: {
        type: Date,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    degreeOfInstruction: {
        type: String,
        default: 'No tiente'
    },
    numberOfDependents: {
        type: Number,
        default: 0
    },
    children: {
        type: Number,
        default: 0
    }
});
const User = mongoose_1.default.model('User', exports.UserSchema);
exports.default = User;
