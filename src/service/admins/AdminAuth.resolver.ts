import { IContext } from './../../makeContext';
import { AdminAuthArg } from './Admin.input';
import { Resolver, Query, Arg, Args, Info, Ctx } from 'type-graphql';
import { Admin, AdminModel } from './Admin.model';
import { AuthenticationError } from 'apollo-server-core';
import _ from 'lodash';

@Resolver()
export class AdminAuthResolver {
  @Query(type => String)
  async auth(
    @Args() { password , email  }: AdminAuthArg,
    @Ctx() { app }: IContext
  ) {
    const admin = await AdminModel.findOne({ email } as Admin).select('+password');
    if (!admin) {
      throw new AuthenticationError('Email and Password mismatch');
    }
    const match = await admin.comparePassword(password);
    if (!match) {
      throw new AuthenticationError('Email and Password mismatch');
    }
    const payLoad = _.merge(
      _.pick(admin.toObject(), ['_id', 'name' , 'email']),
      { roles: ['admin'] }
    );
    return await app.jwt.sign(payLoad);
  }
}
