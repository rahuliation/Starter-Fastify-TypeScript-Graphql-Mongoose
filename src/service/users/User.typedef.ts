import { gql } from 'apollo-server-fastify';

const UserTypeDef = gql`
  type UserModel {
    id: ID!
    name: String
  }

  input UserInput {
    name: String
  }

  type UserPaginate implements PaginationModel {
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
    users(options: Options): UserPaginate
  }

  extend type Mutation {
    createusers(data: UserInput): UserModel
    updateusers(id: String, data: UserInput): UserModel
  }
`;

export default UserTypeDef;