import envSchema from 'env-schema';

const schema = {
  type: 'object',
  required: [ 'HOST', 'PORT', 'DB_URL', 'DB_DEBUG', 'JWT_SECRET' ],
  properties: {
    HOST: {
      type: 'string'
    },
    PORT: {
        type: 'number'
      },
    DB_URL: {
        type: 'string'
    },
    DB_DEBUG: {
      type: 'boolean'
    },
    JWT_SECRET: {
      type: 'string'
    }
  }
};

envSchema({ schema, dotenv: true });
