import { Resolver, FieldResolver, Root, Query, Mutation, Arg } from "type-graphql";
import { User, UserModel } from "./User.model";

@Resolver()
export class UserResolver {
  @Query(returns => [User])
  async users() {
    return await UserModel.find({});
  }
  @Mutation(returns => User)
  async createUsers(@Arg("name", { nullable: false }) title?: string,) {
    return await UserModel.create({
      name: 'rahul'
    } as User);
  }
}