import CategoryService from './service/categories/Category.service';

export default {
  Query: {
    getCategories: async  () => {
      const cateogries = await CategoryService.list();
      return cateogries;
    }
  },
  Mutation: {
    createCategory: async  (parent, args, context, info) => {
      const { name } = args;
      const cateogries = await CategoryService.create({ name });
      return cateogries;
    }
  }
};
