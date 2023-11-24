/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../../.env') });

const runMigrationDir = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'src',
  'infraestructure',
  'knex config',
  'migrations',
);
 module.exports = {
   client: 'pg',
   connection: {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: process.env.DB_PORT,
   },
   migrations: {
     directory: runMigrationDir,
     extension: 'js',
   },
 };
