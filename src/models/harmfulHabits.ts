import mongoose from 'mongoose';

export interface HarmfulHabitModel extends mongoose.Document {
    name: string;
    description: string;
    createDate: string;
    isEnabled: boolean
}

const HarmfulHabitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    isEnabled:{
        type: Boolean,
        default: true
    }
});

const HarmfulHabit = mongoose.model<HarmfulHabitModel>('HarmfulHabit', HarmfulHabitsSchema);
export default HarmfulHabit;