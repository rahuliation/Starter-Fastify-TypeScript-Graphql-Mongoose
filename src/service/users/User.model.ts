import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Only Pure Field Available
 *
 * @export
 * @interface IUserFields
 */
export interface IUserFields  {
    name: string;
}

export interface IUserModel extends mongoose.Document, IUserFields {}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

export default mongoose.model<IUserModel>('user', UserSchema, 'users', true);
