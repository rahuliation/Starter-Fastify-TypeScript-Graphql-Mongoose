import { InputType, ArgsType } from 'type-graphql';
import { Field } from 'type-graphql';
import { Admin } from './Admin.model';

@InputType()
export class AdminInput implements Partial<Admin> {
    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    email: string;
  }

@ArgsType()
export class AdminAuthArg {
    @Field()
    email: string;

    @Field()
    password: string;
}
