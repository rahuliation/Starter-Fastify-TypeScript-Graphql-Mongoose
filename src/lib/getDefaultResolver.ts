import { Model, Document } from 'mongoose';
import _ from 'lodash';

export default function <Schema extends Document, Fields  > (model: Model<Schema>) {

    return {
        Query: {
            [model.collection.collectionName]: async function (obj, args, context, info) {
              const docs = await model.find({});
              return docs;
            }
        },
        Mutation: {
            [`create`+model.collection.collectionName]: async function (obj, { data }, context, info) {
              const doc = new model(data);
              const saveddoc = await doc.save();
              return saveddoc;
            },
            [`update`+model.collection.collectionName]: async function (obj, { id, data }, context, info) {
                const doc =  await model.findOne({ _id: id });
                _.forEach(data, (val, key) => {
                    if(!_.isEmpty(val)) {
                        doc[key] = val;
                    }
                })
                const saveddoc = await doc.save();
                return saveddoc;
              }
         }
    };

};

