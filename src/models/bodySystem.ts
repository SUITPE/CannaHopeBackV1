import mongoose from 'mongoose';

export interface BodySystemModel extends mongoose.Document {
    name: string;
    description: string;
    value: string;
    isEnabled: boolean;
}

export interface VisionAnalysis {
    agudezaVisual: string;
    conCorrectores: string;
    fondoDeOjos: string;
    visionProfunda: string;
    estenopeico: string;
    conclusión: string;
    visionDeColores: string;
}

export const BodySystemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Debe ingresar un nombre para el sistema del cuerpo'],
        unique: true
    },
    description:{
        type: String,
        required: [ true, 'Debe ingresar uns descripcion para el sistema del cuerpo']
    },
    value: {
        type: String,
        default: 'no',
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});

export const BodySystem = mongoose.model<BodySystemModel>('BodySystem', BodySystemSchema);