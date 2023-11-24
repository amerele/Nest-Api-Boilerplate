import { Module } from '@nestjs/common';
import * as path from 'path';
import { KnexModule } from 'nest-knexjs';
const runMigrationDir = path.join(__dirname, 'migrations');
const seedDir = path.join(__dirname, 'seeds');
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        },
        migrations: {
          directory: runMigrationDir,
          extension: 'js',
        },
        seeds: {
          directory: seedDir,
          extension: 'js',
        },
      },
    }),
  ],
})
export class KnexConnectModule {}
