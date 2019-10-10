import { CategoryTypeDef } from './service/categories/Category.resolver';
import { gql } from 'apollo-server-fastify';

const TypeDef = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export default [
    TypeDef,
    CategoryTypeDef
];
