import * as envSchema from 'env-schema';

const schema = {
  type: 'object',
  required: [ 'HOST', 'PORT', 'DB_URL' ],
  properties: {
    HOST: {
      type: 'string',
    },
    PORT: {
        type: 'string',
      },
    DB_URL: {
        type: 'string',
    },
  }
}

envSchema({ schema, dotenv: true });