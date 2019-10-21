import UserTypeDef from './service/users/User.typedef';
import { gql } from 'apollo-server-fastify';

const TypeDef = gql`
  input Pagination {
    page: Int!
    limit: Int!
  }

 interface PaginationModel {
  totalDocs: Int,
  limit: Int,
  hasPrevPage: Boolean,
  hasNextPage: Boolean,
  page: Int,
  totalPages: Int,
  pagingCounter: Int,
  prevPage: Int,
  nextPage: Int
 }
 
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export default [
  TypeDef,
  UserTypeDef
];
