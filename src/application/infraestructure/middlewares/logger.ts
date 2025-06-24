import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LogDto, status } from 'src/application/components/log/dto/log.dto';
import { LogService } from 'src/application/components/log/service/log.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Injectable()
class LoggerRequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  constructor(
    @Inject(LogService) private readonly logService: LogService,
    @Inject(JwtStrategy) private readonly jwt: JwtStrategy
  ) { }

  use(request: Request & { auth: unknown }, response: Response, next: NextFunction) {
    const requestStart = Date.now();

    response.on('finish', async () => {
      const { method, originalUrl, headers, ip } = request;
      const { statusCode, statusMessage } = response;
      if (statusCode <= 300) return;

      const host = headers.host ?? 'unknown';
      const clientIp = headers['x-forwarded-for'] ?? ip ?? 'unknown';
      const processingTime = Date.now() - requestStart;

      const errorResponse = response.locals?.errorResponse;
      const file = response.locals?.location;
      const reqUser = await this.jwt.getUserFromReq(request);

      const log: LogDto = {
        host,
        reqUser,
        clientIp,
        statusCode,
        file,
        status: statusCode >= 400 ? status.error : status.success,
        description: errorResponse,
        method,
        url: originalUrl,
        body: request.body || {},
      }

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${processingTime}ms host: ${host} ip: ${clientIp}`;


      if (statusCode >= 500) {
        await this.logService.create(log);
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        await this.logService.create(log);
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });



    next();
  }
}

export default LoggerRequestMiddleware;
