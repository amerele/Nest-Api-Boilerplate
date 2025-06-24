import { forwardRef, Module } from '@nestjs/common';
//import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './service/log.service';
import { LogController } from './controller/log.controller';
import { LogRepository } from './repository/log.repository';
import { Log, LogSchema } from './schema/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    /*
    CacheModule.register({
      ttl: 6000, // ms
    }),
    */
  ],
  controllers: [LogController],
  providers: [
    {
      provide: 'ILogInterface',
      useClass: LogRepository,
    },
    LogService
  ],
  exports: [LogService, MongooseModule]
})
export class LogModule {}
