import CreateService from '../../lib/CreateService';
import CategoryModel, { ICategoryModel, ICategoryFields } from './Category.model';

const hooks = {
    before : {
        list: [function (ctx) {

            throw new Error();
        }],
        create: [],
    },
    after : {
        list: [],
        create: []
    },
    error: {
        list: [function (ctx) {
            console.log('error');
            console.log(ctx.error);
        }],
        create: []
    }
}

const CategoryService = CreateService<ICategoryModel, ICategoryFields>(CategoryModel, {}, hooks);

export default CategoryService;
