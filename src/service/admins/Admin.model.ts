import { prop as Property, getModelForClass, modelOptions, pre, instanceMethod, ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const SALT_WORK_FACTOR = 10;

@pre<Admin>('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
})
@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Admin {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Property({ required: true })
  password: string;

  public async comparePassword (password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
export const AdminModel = getModelForClass(Admin);
