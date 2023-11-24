import { Module } from '@nestjs/common';
import { StoreClustersStoresController } from './modelo.controller';
import { StoreClustersStoresService } from './modelo.service';
import { StoreClustersStoresRepository } from 'src/repositories/modelo.repository';

@Module({
  controllers: [StoreClustersStoresController],
  providers: [StoreClustersStoresService, StoreClustersStoresRepository],
  exports: [StoreClustersStoresRepository, StoreClustersStoresService],
})
export class modelo {}
