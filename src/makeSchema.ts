import { ObjectIdScalar } from './object-id.scalar';
import { ObjectId } from 'mongodb';
import { TypegooseMiddleware } from './typegoose-middleware';
import { ContextualizedTypeStats } from 'apollo-engine-reporting-protobuf';
import { buildSchema, AuthChecker } from 'type-graphql';
import path from 'path';

const authChecker: AuthChecker<ContextualizedTypeStats> = (
    { root, args, context, info }: any,
    roles
  ) => {
    if (!context.user) {
      return false;
    }
    return true; // or false if access is denied
  };

const makeSchema =  async () => await buildSchema({
    resolvers: [__dirname + '/**/*.resolver.ts'],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypegooseMiddleware],
    authChecker,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  });

export default makeSchema;
