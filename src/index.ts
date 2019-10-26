import { IContext } from './index';
import { buildSchema, AuthChecker } from 'type-graphql';
import 'reflect-metadata';
import fastify, { RequestHandler, FastifyRequest } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { ApolloServer } from 'apollo-server-fastify';
import './lib/Config';
import ConnectDB from './lib/ConnectDB';
import path from 'path';
import jwt from 'fastify-jwt';
import { ObjectIdScalar } from './object-id.scalar';
import { ObjectId } from 'mongodb';
import { TypegooseMiddleware } from './typegoose-middleware';
import { ContextualizedTypeStats } from 'apollo-engine-reporting-protobuf';

const { PORT, JWT_SECRET } = process.env;

export interface IContext {
  app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;
  user?: {
    _id?: string
  };
}

const app: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
  > = fastify(
  {
    logger: {
      prettyPrint: { translateTime: 'yyyy-mm-dd HH:MM:ss' }
    }
  }
  );

const authChecker: AuthChecker<ContextualizedTypeStats> = (
    { root, args, context, info }: any,
    roles
  ) => {
    if (!context.user) {
      return false;
    }
    return true; // or false if access is denied
  };

const start = async () => {
  ConnectDB(async (dbURL) => {
    app.log.info(`Mongoose Connected at ${dbURL}`);
    try {
      const schema = await buildSchema({
        resolvers: [__dirname + '/**/*.resolver.ts'],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        globalMiddlewares: [TypegooseMiddleware],
        authChecker,
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
      });
      app.log.info('Graphql Schema Generated');

      const server = new ApolloServer({
        schema ,
        context: (request: FastifyRequest, connection): IContext => {
          const { user } = request as any;
          if (connection) {
            // check connection for metadata
            return connection.context;
          } else {
           return {
             app,
             user
           };
          }
        },
        playground: true
      });
      app.register(server.createHandler());
      await app.listen(parseInt(PORT, 10), '0.0.0.0');
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
};

app.register(jwt, {
  secret: JWT_SECRET
});

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../static'),
  prefix: '/static/'
});

app.addHook('onRequest', async (request, reply) => {
  try {
    await request.jwtVerify();
    return;
  } catch (err) {
    return;
  }
});

process.on('uncaughtException', error => {
  console.error(error);
});
process.on('unhandledRejection', error => {
  console.error(error);
});

start();
