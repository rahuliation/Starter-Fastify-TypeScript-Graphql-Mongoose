import CreateService from '../../lib/CreateService';
import CategoryModel, { ICategoryModel, ICategoryFields } from './Category.model';

const CategoryService = CreateService<ICategoryModel, ICategoryFields>(CategoryModel);

export default CategoryService;
