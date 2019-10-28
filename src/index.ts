import 'reflect-metadata';
import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { ApolloServer } from 'apollo-server-fastify';
import './lib/Config';
import ConnectDB from './lib/ConnectDB';
import path from 'path';
import jwt from 'fastify-jwt';
import makeSchema from './makeSchema';
import makeContext from './makeContext';

const { PORT, JWT_SECRET } = process.env;

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

const start = async () => {
  ConnectDB(async (dbURL) => {
    app.log.info(`Mongoose Connected at ${dbURL}`);
    try {

      const schema = await makeSchema();
      app.log.info('Graphql Schema Generated');
      const context = makeContext(app);

      const server = new ApolloServer({
        schema ,
        context,
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
