import CategoryService from './service/categories/Category.service';

export default {
  Query: {
    getCategories: async  () => {
      const categories = await CategoryService.list();
      return categories;
    }
  },
  Mutation: {
    createCategory: async  (parent:any, args: any, context: any, info: any) => {
      const { name } = args;
      const categories = await CategoryService.create({ name });
      return categories;
    }
    // updateCategory: async  (parent, args, context, info) => {
    //   const { name } = args;
    //   const categories = await CategoryService.remove({ name });
    //   return categories;
    // },
    // deleteCategory: async  (parent, args, context, info) => {
    //   const { name } = args;
    //   const categories = await CategoryService.create({ name });
    //   return categories;
    // }
  }
};
