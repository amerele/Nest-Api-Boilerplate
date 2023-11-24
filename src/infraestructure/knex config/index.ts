import Knex from 'knex';
import { IDatabaseConnection } from 'src/domain/interfaces/database-connection.interface';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: join(__dirname, '../../../../.env') });

const rootDir = process.env.NODE_ENV == 'LOCAL' ? 'src' : 'dist';

const runMigrationDir = join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  rootDir,
  'infrastructure',
  'knex config',
  'migrations',
);

export const getKnexInstance = async (connection: IDatabaseConnection) => {
  if (process.env.NODE_ENV !== 'LOCAL') console.log(connection);

  const knex =
    process.env.NODE_ENV == 'test'
      ? Knex({
          client: process.env.TEST_DB_CLIENT,
          connection: {
            host: process.env.TEST_DB_HOST,
            port: Number(process.env.TEST_DB_PORT),
            user: process.env.TEST_DB_USER,
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DB_DATABASE,
          },
          migrations: {
            directory: runMigrationDir,
            extension: 'js',
          },
        })
      : Knex({
          client: 'pg',
          connection: {
            host:
              process.env.NODE_ENV === 'LOCAL'
                ? process.env.DB_HOST
                : connection.host,
            port: Number(connection.port),
            user: connection.user,
            password: connection.password,
            database: connection.database,
          },
          migrations: {
            directory: runMigrationDir,
            extension: 'js',
          },
        });

  // Ensure migrations
  // await knex.migrate.latest();
  return knex;
};
