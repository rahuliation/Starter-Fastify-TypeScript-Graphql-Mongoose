import { gql } from 'apollo-server-fastify';

const UserTypeDef = gql`
  type UserModel {
    id: ID!
    name: String
  }

  input UserInput {
    name: String
  }

  type UserPaginate {
    docs: [UserModel]
    totalDocs: Int
    limit: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
    page: Int
    totalPages: Int,
    pagingCounter: Int
    prevPage: Int
    nextPage: Int
  }
  extend type Query {
    users(pagination: Pagination): UserPaginate
  }
`;

export default UserTypeDef;