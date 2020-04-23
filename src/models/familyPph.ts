import mongoose from 'mongoose';

// famili patient pathological history
export class FamilyPphModel {
    father?: string;
    mother?: string;
    spouse?: string;
    children?: string;
    siblings?: string;
}


// export const FamilyPphSchema = new mongoose.Schema({

//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     createDate: {
//         type: Date,
//         default: new Date()
//     },
//     father: {
//         type: String,
//         default: 'no'
//     },
//     mother:{
//         type: String,
//         default: 'no'
//     },
//     spouse: {
//         type: String,
//         default: 'no'
//     },
//     children: {
//         type: String,
//         default: 'no'
//     },
//     siblings: {
//         type: String,
//         default: 'no'
//     },
//     isEnabled:{
//         type: Boolean,
//         default: true
//     }
// })

// const FamilyPph = mongoose.model<FamilyPphModel>('FamilyPph', FamilyPphSchema);
// export default FamilyPph