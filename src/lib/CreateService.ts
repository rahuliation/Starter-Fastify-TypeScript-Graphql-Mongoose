import mongoose from 'mongoose';
import _ from 'lodash';

interface IHooks {
  after: any,
  before: any,
  error: any
}

interface IContext<ResulType = {}> {
  query?: any,
  options?: { pagination?: { page: number, limit: number } },
  data?: any,
  result?: ResulType,
  error?: any
}

interface IBaseService<IModel, IFields> {
  list: (context: IContext) =>Promise<IContext<mongoose.PaginateResult<IModel> | IModel[]>>;
  create: (context: IContext) => Promise<IContext<IModel>>;
  update: (context: IContext) => Promise<IContext<IModel>>;
  remove: (context: IContext) => Promise<IContext<IModel>>;
  [name: string]: (context: IContext) => any ;

}

const CreateService = <IModel extends mongoose.Document, IFields>
  (model: mongoose.Model<IModel>, customModel = {}, hooks: IHooks = { after: {}, before: {}, error: {} })
  : IBaseService<IModel, IFields> => {
  const ServiceModel: mongoose.PaginateModel<IModel> = (model as any);

  const Service = _.merge({
    async list(context: IContext) {
      const { options: { pagination }, query } = context;
      const result=  pagination ? await ServiceModel.paginate(query, {
        ...pagination
      }) : await ServiceModel.find(query);
      return {...context, result};
    },
    async create(context: IContext) {
      const { data } = context;
      const result = await ServiceModel.create(data);
      return {...context, result};

    },
    async update(context: IContext) {
      const { query, data } = context;
      const instance = await ServiceModel.findOne(query);
      const result =  await instance.update(data);
      return {...context, result};
    },
    async remove(context: any) {
      const { query } = context;
      const instance = await ServiceModel.findOne(query);
      const result = await instance.remove();
      return {...context, result};
    }
  }, customModel);

   _.forEach(Service, (serviceFunction) => {
    Service[serviceFunction.name] = async function(context: IContext) {
      let ctx = context;
      console.log(context);
      try {
        if (hooks.before[serviceFunction.name]) {
          ctx = hooks.before[serviceFunction.name]
            .reduce((state, fun) => {
              return fun(state);
            }, ctx);
        }
        ctx = await serviceFunction(ctx);

        if (hooks.after[serviceFunction.name]) {
          ctx = hooks.after[serviceFunction.name]
            .reduce((state, fun) => {
              return fun(state);
            }, ctx);
        }
        return ctx
      } catch (error) {
        if (hooks.error[serviceFunction.name]) {
          ctx = hooks.error[serviceFunction.name]
            .reduce((state, fun) => {
              return fun(state);
            }, { ...ctx , error: error });
        }
        return ctx
      }
    }
  });

  return  Service;

};

export default CreateService;
