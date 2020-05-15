import mongoose from 'mongoose';
import Rol from './role';


export class UserModel extends mongoose.Document   {
    public names: string = String();
    public surenames: string= String();
    public nickName: string= String();
    public age: number= Number();
    public birthDate: string= String();
    public sex: string= String();
    public document: number= Number();
    public documentType: string= String();
    public maritalStatus: string = String();
    public ocupation: string= String();
    public address: string= String();
    public email: string= String();
    public mobilePhone: number= Number();
    public landLine: number= Number();
    public healthyEntity: string= String();
    public password: string = String();
    public rol: string= String();
    public status: boolean= Boolean();
    public createDate: string= String();
    public updateDate: string= String();
    public createdBy: string= String();
    public updatedBy: string= String();
    public image: string= String();
    public lastAccesDate: string= String();
    public token: string= String();
    public degreeOfInstruction?: string;
    public numberOfDependents?: number;
    public children?: number;
    public specialty: string = '';
}

export const UserSchema = new mongoose.Schema({
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
        minlength: [3, 'Debe ser un minimo de 4 caracteres'],
        default: null
    },
    age: {
        type: Number,
        minlength: [2, 'Debe ser mayor de edad']
    },
    birthDate: {
        type: Date,
        minlength: [2, 'Debe ser mayor de edad']
    },
    sex: {
        type: String,
    },
    document: {
        type: String,
        unique: true
    },
    documentType:{
        type: String,
    },
    maritalStatus: {
        type: String,
    },
    ocupation: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Debe ingresar un email del usuario']
    },
    mobilePhone: {
        type: Number,
        required: [true, 'Debe agregar un telefonoo movil de usuario'],
    },
    landLine: {
        type: Number,
        default: 0
    },
    healthyEntity: {
        type: String,
    },
    password: {
        type: String,
        minlength: 30,
        required: true
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
    },
    image: {
        type: String,
        default: null
    },
    degreeOfInstruction: {
        type: String,
        default: 'No tiene'
    },
    numberOfDependents: {
        type: Number,
        default: 0
    },
    children: {
        type: Number,
        default: 0
    },
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedialSpeciality',
        default: null
    }
});

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;