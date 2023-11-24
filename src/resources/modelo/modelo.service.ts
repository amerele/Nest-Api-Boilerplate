import { Injectable } from '@nestjs/common';
import { CreateStoreClustersStoresDto } from './dto/create-modelo.dto';
import { UpdateStoreClustersStoresDto } from './dto/update-modelo.dto';
import { StoreClustersStoresRepository } from 'src/repositories/modelo.repository';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
@Injectable()
export class StoreClustersStoresService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly _storeClustersStoresRepository: StoreClustersStoresRepository,
  ) {}

  public async findAll() {
    try {
      const StoreClustersStores =
        await this._storeClustersStoresRepository.findAll(this.knex);
      return StoreClustersStores;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async findOne(cdStoreClustersStores: number) {
    try {
      const StoreClustersStores =
        await this._storeClustersStoresRepository.findByPrimary(
          this.knex,
          cdStoreClustersStores,
        );
      return StoreClustersStores;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async create(
    createStoreClustersStores: number[],
    cdStoreCluster: number,
  ) {
    const trx = await this.knex.transaction();
    const data = createStoreClustersStores.map((item) => ({
      cdStoreCluster,
      cdStore: item,
    }));

    try {
      await this._storeClustersStoresRepository.delete(trx, cdStoreCluster);
      const StoreClusterStores =
        await this._storeClustersStoresRepository.create(trx, data[0]);
      trx.commit();

      console.log('StoreClusterStores', StoreClusterStores);
      return StoreClusterStores;
    } catch (error) {
      trx.rollback();
      console.log(error);
      throw error;
    }
  }
}
