---
to: src/service/<%=h.changeCase.lower(h.inflection.pluralize(modelName))%>/<%=h.inflection.capitalize(h.inflection.singularize(modelName))%>.typedef.ts
---
<%
models =  h.changeCase.lower(h.inflection.pluralize(modelName))
model =  h.changeCase.lower(h.inflection.singularize(modelName))
Model =  h.inflection.capitalize(h.inflection.singularize(modelName))
%>
import { gql } from 'apollo-server-fastify';

const UserTypeDef = gql`
  type UserModel {
    id: ID!
    name: String
  }

  input UserInput {
    name: String
  }

  extend type Query {
    users(options: Options): [UserModel]
  }

  extend type Mutation {
    createusers(data: UserInput): UserModel
    updateusers(id: String, data: UserInput): UserModel
  }

`;

export default UserTypeDef;