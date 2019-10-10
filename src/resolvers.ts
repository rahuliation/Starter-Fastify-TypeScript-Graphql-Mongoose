
import _ from 'lodash';
import { CategoryResolver } from './service/categories/Category.resolver';

const resolver = {}

export default _.merge(resolver, CategoryResolver )