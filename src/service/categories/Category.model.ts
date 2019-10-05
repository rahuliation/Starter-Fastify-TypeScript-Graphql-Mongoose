import mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

/**
 * Only Pure Field Available
 *
 * @export
 * @interface ICategoryFields
 */
export interface ICategoryFields  {
    name: string;
    parent?: string;
}

export interface ICategoryModel extends mongoose.Document, ICategoryFields {}

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: String
    }
},
    {
        timestamps: false
    });

export default mongoose.model<ICategoryModel>('category', CategorySchema, 'categories', true);
