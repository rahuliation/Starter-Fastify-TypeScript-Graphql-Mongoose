import { AdminInput } from './Admin.input';
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { Admin, AdminModel } from './Admin.model';

@Resolver()
export class AdminResolver {

  @Authorized()
  @Query(returns => [Admin])
  async admins() {
    return await AdminModel.find({});
  }

  @Mutation(returns => Admin)
  async createAdmins(
    @Arg('data', { nullable: true }) data?: AdminInput
  ) {
    const admin = new AdminModel(data as Admin);
    const saved = admin.save();
    return saved;
  }
}
