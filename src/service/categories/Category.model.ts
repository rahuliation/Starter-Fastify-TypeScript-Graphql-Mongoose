import * as mongoose from 'mongoose';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface CategoryModelI extends mongoose.Document {
    name: string;
    parent: string;
}

let CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: String,
    }
},
    {
        timestamps: true
    });



export default mongoose.model<CategoryModelI>('category', CategorySchema, 'categories', true);