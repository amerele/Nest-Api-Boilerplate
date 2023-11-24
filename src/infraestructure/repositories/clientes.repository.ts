import { Injectable } from '@nestjs/common';
import { Clientes } from 'src/domain/entities/clientes.entity';
import { BaseKnexRepository } from './base-knex.repository';
import { CreateClientesDto } from 'src/application/DTOs/clientes/create-clientes.dto';
import { UpdateClientesDto } from 'src/application/DTOs/clientes/update-clientes.dto';

@Injectable()
export class ClientesRepository extends BaseKnexRepository {
  public async findAll(): Promise<Clientes> {
    const knexInstance = await this.getKnexInstance();

    const clients = await knexInstance('TABELA.clientes').where('').select('*');

    await this.destroyConnection(knexInstance);
    return clients;
  }

  public async findByPrimary(id: string): Promise<Clientes> {
    const knexInstance = await this.getKnexInstance();

    const client = await knexInstance('TABELA.clientes')
      .where({ id })
      .select('*');

    await this.destroyConnection(knexInstance);
    return client;
  }

  public async CreateOrUpdateClientes(
    data: CreateClientesDto,
    id: string,
  ): Promise<Clientes> {
    const knexInstance = await this.getKnexInstance();

    const client = await knexInstance('TABELA.clientes')
      .upsert({ data, id })
      .returning('*');

    await this.destroyConnection(knexInstance);
    return client;
  }

  public async deleteClientes(id: string): Promise<Clientes> {
    const knexInstance = await this.getKnexInstance();

    const client = await knexInstance('TABELA.clientes').where({ id }).del();

    await this.destroyConnection(knexInstance);
    return client;
  }
}
