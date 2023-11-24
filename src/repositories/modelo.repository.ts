import { Injectable } from '@nestjs/common';
import { CreateStoreClustersStoresDto } from 'src/resources/modelo/dto/create-modelo.dto';
import { UpdateStoreClustersStoresDto } from 'src/resources/modelo/dto/update-modelo.dto';
import { StoreClustersStores } from 'src/entities/modelo.entity';

@Injectable()
export class StoreClustersStoresRepository {
  //Provisório, usar query do Flávio.
  public async findAll(knexInstance): Promise<StoreClustersStores> {
    const StoreClustersStores = await knexInstance
      .table('Promo.StoreClusters_Stores')
      .select('*')
      .orderBy('cdStoreCluster');
    return StoreClustersStores;
  }

  public async findByPrimary(
    knexInstance,
    cdStoreCluster: number,
  ): Promise<StoreClustersStores> {
    const StoreClustersStores = await knexInstance
      .table('Promo.StoreClusters_Stores')
      .where({ cdStoreCluster })
      .select('*');
    return StoreClustersStores;
  }
  public async delete(
    knexInstance,
    cdStoreCluster: number,
  ): Promise<StoreClustersStores> {
    const StoreClustersStores = await knexInstance
      .table('Promo.StoreClusters_Stores')
      .delete()
      .where({ cdStoreCluster });

    return StoreClustersStores;
  }
  public async create(
    knexInstance,
    CreateStoreClustersStoresDto: CreateStoreClustersStoresDto,
  ): Promise<StoreClustersStores> {
    const StoreClustersStores = await knexInstance
      .table('Promo.StoreClusters_Stores')
      .insert(CreateStoreClustersStoresDto)
      .returning('*');

    return StoreClustersStores;
  }
}
