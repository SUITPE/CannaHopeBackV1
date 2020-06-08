import mongoose from 'mongoose';
import { MaritalStatusModel } from '../models/maritalStatus.interface';
export const MaritalStatusSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    enabled: {
        type: Boolean
    }
}, {collection: 'maritalStatus'});


export const MaritalStatus = mongoose.model<MaritalStatusModel>('MaritalStatus', MaritalStatusSchema);