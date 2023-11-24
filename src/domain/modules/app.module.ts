import { Module } from '@nestjs/common';
import { KnexConnectModule } from 'src/infraestructure/knex config/knex.module';
import { AppController } from '../../presentation/controllers/app.controller';

@Module({
  imports: [KnexConnectModule, ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
