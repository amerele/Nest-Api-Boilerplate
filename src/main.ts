import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { CustomExceptionFilter } from './application/presentation/filters/exception.filters';
import { LogService } from './application/components/log/service/log.service';
import { LogDto, status } from './application/components/log/dto/log.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  const logService = app.get(LogService);

  process.on('unhandledRejection', async (reason, promise) => {
    const stack = reason instanceof Error ? reason.stack : null;

    const log: LogDto = {
      host: 'unknown',
      reqUser: null,
      clientIp: 'unknown',
      statusCode: 500,
      file: stack?.split('\n')[1].split('src')[1]
        ? String(`src${stack?.split('\n')[1].split('src')[1]}`)
        : 'unknown',
      status: status.error,
      description: `FATAL: ${reason}`,
      method: 'unknown',
      url: 'unknown',
      body: {},
    };

    try {
      await logService.create(log);
    } catch (writeErr) {
      console.log('Failed to write fatal log to DB', writeErr);
    }

    console.log('Unhandled Rejection', reason);
    //  process.exit(1);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
