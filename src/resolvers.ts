
import _ from 'lodash';
import  UserResolver from './service/users/User.resolver';

const resolver = {}

export default _.merge(resolver, UserResolver )