import { Module } from '@nestjs/common';
import { KnexConnectModule } from './config/knex/knex.module';
import { modelo } from './resources/modelo/modelo.module';
import { AppController } from './resources/app/app.controller';

@Module({
  imports: [KnexConnectModule, modelo],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
