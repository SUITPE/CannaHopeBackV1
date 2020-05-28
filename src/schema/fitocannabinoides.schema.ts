import mongoose from 'mongoose';
import { FitocannabinoidesModel } from '../models/fitocannabinoides.interface';


export const FitocannabinoidesShema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, {collection: 'fitocannabinoides'});

export const Fitocannabinoides = mongoose.model<FitocannabinoidesModel>('Fitocannabinoides', FitocannabinoidesShema);