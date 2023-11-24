import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreClustersStoresDto } from './create-modelo.dto';

export class UpdateStoreClustersStoresDto extends PartialType(
  CreateStoreClustersStoresDto,
) {}
