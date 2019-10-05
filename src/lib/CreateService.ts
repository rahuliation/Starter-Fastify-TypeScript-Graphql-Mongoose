import  mongoose from 'mongoose';

interface IBaseService <IModel, IFields> {
  list: (
          pagination?: { page: number, limit: number }, condition?: any
        ) => Promise<mongoose.PaginateResult<IModel> | IModel[]>;
  create: (data: IFields) => Promise<IModel>;
  update: (condition: any, data: IFields) => Promise<IModel>;
  remove: (condition: any) => Promise<IModel>;
}

const CreateService = <IModel extends mongoose.Document, IFields>
 (model: mongoose.Model<IModel>)
 : IBaseService<IModel, IFields> => {
  const ServiceModel: mongoose.PaginateModel<IModel> = (model as any);
  return {
      async list(pagination, condition = {}) {
          return pagination ? await ServiceModel.paginate(condition, {
            ...pagination
          }) : await ServiceModel.find(condition);
      },
      async create(data) {
         return await ServiceModel.create(data);
      },
      async update(condition, data) {
        const instance = await ServiceModel.findOne(condition);
        return await instance.update(data);
      },
      async remove(condition) {
        const instance = await ServiceModel.findOne(condition);
        return await instance.remove();
      }
    };
  };

export default CreateService;
