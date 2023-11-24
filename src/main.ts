import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/modules/app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.NODE_PORT || 3333);
}
bootstrap();
