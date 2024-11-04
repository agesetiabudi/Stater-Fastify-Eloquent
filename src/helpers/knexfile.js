'use strict';

const fs = require('fs');
const path = require('path');

// Load .env configuration.
require('dotenv').load({path: path.resolve(__dirname, '../../.env')});

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'schema',
    charset: 'utf8',
    timezone: 'UTC',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(__dirname, './migrations'),
    tableName: 'migrations',
  },
  debug: process.env.KNEX_DEBUG === 'true',
};
