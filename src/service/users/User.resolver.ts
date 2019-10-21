import UserModel, { IUserModel, IUserFields } from './User.model'
import getDefaultResolver from '../../lib/getDefaultResolver'

const UserResolver = getDefaultResolver<IUserModel, IUserFields>(UserModel);

export default UserResolver;