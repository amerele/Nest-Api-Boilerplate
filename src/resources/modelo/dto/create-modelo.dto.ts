import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateStoreClustersStoresDto {
  @IsNumber()
  cdStoreCluster: number;
  @IsNumber()
  cdStore: number;

  constructor(cdStoreCluster: number, cdStore: number) {
    this.cdStoreCluster = cdStoreCluster;
    this.cdStore = cdStore;
  }
}
