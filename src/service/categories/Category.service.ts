import CreateService from '../../lib/CreateService';
import CategoryModel, { ICategoryModel, ICategoryFields } from './Category.model';
import CategoryHooks from './Category.hooks';

const CategoryService = CreateService<ICategoryModel, ICategoryFields>(
    CategoryModel,
    {},
    CategoryHooks(CategoryModel),
);

export default CategoryService;
