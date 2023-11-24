import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoreClustersStoresService } from './store-clusters-stores.service';

@Controller('store-clusters-stores')
export class StoreClustersStoresController {
  constructor(
    private readonly storeClustersStoresService: StoreClustersStoresService,
  ) {}

  @Get()
  findAll() {
    return this.storeClustersStoresService.findAll();
  }

  @Get(':cdStoreClustersStores')
  findOne(@Param('cdStoreClustersStores') cdStoreClustersStores: string) {
    return this.storeClustersStoresService.findOne(+cdStoreClustersStores);
  }

  @Post(':cdStoreCluster')
  create(
    @Param('cdStoreCluster') cdStoreCluster: string,
    @Body() createStoreClustersStores: number[],
  ) {
    return this.storeClustersStoresService.create(
      createStoreClustersStores,
      +cdStoreCluster,
    );
  }
}
