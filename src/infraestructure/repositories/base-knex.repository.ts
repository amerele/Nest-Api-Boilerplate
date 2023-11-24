import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { getKnexInstance } from '../knex config';
import { IDatabaseConnection } from 'src/domain/interfaces/database-connection.interface';
import { Knex } from 'knex';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../../.env') });
@Injectable()
export class BaseKnexRepository {
  private knexInstanceOverride: Knex;

  constructor(
    @Inject(REQUEST) private readonly _request: Request,
  ) {}

  public async createTransaction(): Promise<{
    transaction: Knex.Transaction;
    knexInstance: Knex;
  }> {
    const knexInstance = await this.getKnexInstance();
    const transaction = await knexInstance.transaction();
    return { transaction, knexInstance };
  }

  public async getKnexInstance(): Promise<Knex> {
    if (this.knexInstanceOverride) return this.knexInstanceOverride;
    const connection: IDatabaseConnection = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
    return getKnexInstance(connection);
  }

  public setKnexInstanceOverride(knexInstance: Knex): void {
    this.knexInstanceOverride = knexInstance;
  }

  public clearKnexInstanceOverride(): void {
    this.knexInstanceOverride = undefined;
  }

  public async commitTransaction(
    transaction: Knex.Transaction<any, any[]>,
  ): Promise<void> {
    await transaction.commit();
  }

  public async rollbackTransaction(
    transaction: Knex.Transaction<any, any[]>,
  ): Promise<void> {
    await transaction.rollback();
  }

  public async destroyConnection(knexInstance: Knex): Promise<void> {
    await knexInstance.destroy();
  }
}
