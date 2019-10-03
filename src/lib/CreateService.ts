import  mongoose from 'mongoose';

interface IBaseService <IModel, IFields> {
  list: (pageinate?: { page: number, limit: number }, condition?: any ) => Promise<IModel[]> | Promise<mongoose.PaginateResult<IModel>>;
  create: (data: IFields) => Promise<IModel>;
  update: (cond: any, data: IFields) => Promise<IModel>;
  delete: (cond: any) => Promise<IModel>;
}

function CreateService<IModel extends mongoose.Document, IFields>
(model: mongoose.Model<IModel> , methods?: string[]): IBaseService<IModel, IFields> {

  const ServiceModel: mongoose.PaginateModel<IModel> = (model as any);

  return {
      async list(pageinate, cond = {}) {
          return pageinate ? await ServiceModel.paginate(cond) : await ServiceModel.find(cond);
      },
      async create(data) {
         return await ServiceModel.create(data);
      },
      async update(cond, data) {
        const instance = await ServiceModel.findOne(cond);
        return await instance.update(data);
      },
      async delete(cond) {
        const instance = await ServiceModel.findOne(cond);
        return await instance.remove();
      }
    };
  }
export default CreateService;
