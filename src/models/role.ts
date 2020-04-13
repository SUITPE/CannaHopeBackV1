import mongoose from 'mongoose';


export interface RolModel extends mongoose.Document {
    name: string;
    description: string;
    status: boolean;
}

export const RolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'En necesario nombrar el rol'],
        unique: true
    },
    description:{
        type: String,
        required: false,
        maxlength: [50, 'Solo puede ingresar 50 caracteres']
    },
    status: {
        type: Boolean,
        default: true
    }

});

const Rol = mongoose.model<RolModel>('Role', RolSchema);
export default Rol;