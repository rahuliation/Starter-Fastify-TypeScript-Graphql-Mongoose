import { gql } from 'apollo-server-fastify';
import CategoryService from './Category.service';

export const CategoryTypeDef = gql`
  type Category {
    "Category of Product"
    id: ID!
    name: String
    parent: String
  }
  
  extend type Query {
    "Get Category List "
    getCategories: [Category]
  }

  extend type Mutation {
    "Create Category List "
    createCategory(name: String): Category
    updateCategory(id: ID!, name: String): Category
  }
`;

export const CategoryResolver = {
  Query: {
    getCategories: async  () => {
      const ctx: any = await CategoryService.list({});
      return ctx.result;
    }
  },
  Mutation: {
    createCategory: async  (parent, args, context, info) => {
      const { name } = args;
      const ctx: any = await CategoryService.create({ data: { name } });
      return ctx.result;
    },
    updateCategory: async  (parent, args, context, info) => {
      const { name } = args;
      const categories = await CategoryService.remove({ query: { _id: args.id },  data: { name } });
      return categories;
    }
  }
};