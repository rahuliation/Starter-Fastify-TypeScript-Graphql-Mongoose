import { prop as Property, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from 'type-graphql' ;

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  @Field({ nullable: true })
  @Property()
  name?: string;

  @Property({ required: true })
  password: string;
}
export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
