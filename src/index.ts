import fastify from 'fastify';
import * as cors from 'cors';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { ApolloServer } from 'apollo-server-fastify';
import typeDefs from './types';
import resolvers from './resolvers';
import './lib/Config';
import ConnectDB from 'lib/ConnectDB';
import path from 'path';

const app: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({
  logger: {
    prettyPrint: { translateTime: 'yyyy-mm-dd HH:MM:ss' }
  }
});

console.log(path.join(__dirname, 'static'));
app.register(require('fastify-static'), {
  root: path.join(__dirname, '../static'),
  prefix: '/public/'
});

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const start = async () => {
  ConnectDB(async (dbURL) => {
    app.log.info(`Mongoose Connected at ${dbURL}`);
    try {
      app.register(server.createHandler());
      await app.listen(3000, '0.0.0.0');

    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
};

process.on('uncaughtException', error => {
  console.error(error);
});
process.on('unhandledRejection', error => {
  console.error(error);
});

start();
