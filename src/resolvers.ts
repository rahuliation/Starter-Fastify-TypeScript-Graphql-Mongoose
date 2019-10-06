import CategoryService from './service/categories/Category.service';
import { arch } from 'os';

export default {
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
