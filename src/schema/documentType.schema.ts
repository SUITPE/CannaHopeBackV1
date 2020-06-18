import mongoose from 'mongoose';
import { DocumentTypeModel } from '../models/documentType.interface';

export const DocumentTypeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});

export const DocumentType = mongoose.model<DocumentTypeModel>('DocumentType', DocumentTypeSchema);