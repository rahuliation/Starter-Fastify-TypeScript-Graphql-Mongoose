import { CategoryTypeDef } from './service/categories/Category.resolver';
import { gql } from 'apollo-server-fastify';

const TypeDef = gql`
  input Pagination {
    page: Int!
    limit: Int!
  }
  input Options {
    pagination: Pagination
  }


 interface PaginationModel {
  docs: [Model]
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
  CategoryTypeDef
];
