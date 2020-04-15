import mongoose from 'mongoose';
import Rol from './role';


export interface UserModel extends mongoose.Document   {
    names: string;
    surenames: string;
    nickName: string;
    age: number;
    birthDate: string;
    years: number;
    sex: string;
    document: number;
    documentType: string;
    maritalStatus: string
    ocupation: string;
    address: string;
    email: string;
    mobilePhone: number;
    landLine: number;
    healthyEntity: string;
    password: string;
    rol: string;
    status: boolean;
    createDate: string;
    updateDate: string;
    createdBy: string;
    updatedBy: string;
    lastAccesDate: string;
    token?: string;
}

export const UserSchema = new mongoose.Schema({
    names: {
        type: String,
        required: [true, 'No se ha asignado un nombre de usuario'],
        minlength: [5, 'debe ser un minimo de 5 caracteres parael nombre']
    },
    surenames: {
        type: String,
        required: [true, 'No se ha ingresado informacion de apellidos'],
        minlength: [5, 'Debe ser un minimo de 5 caracterespara el apellido']
    },
    nickName: {
        type: String,
        required: [true, 'Debe ingresar un nombre de usuario'],
        minlength: [5, 'Debe ser un minimo de 4 caracteres'],
        unique: true
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
    documentType:{
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
        required: [true, 'Debe agregar dirección donde reside el usuario'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Debe ingresar un email del usuario'],
        unique: true
    },
    mobilePhone: {
        type: Number,
        required: [true, 'Debe agregar un telefonoo movil de usuario'],
        unique: true
    },
    landLine: {
        type: Number,
    },
    healthyEntity: {
        type: String,
        required: [true, 'Debe ingresar la entidad gestora de salud']
    },
    password: {
        type: String,
        required: [true, 'Se debe ingresar la contrasenia del usuario']
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    lastAccesDate: {
        type: Date,
        default: null
    }
});

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;