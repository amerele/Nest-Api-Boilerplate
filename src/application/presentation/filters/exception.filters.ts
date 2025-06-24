import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from './error.types';

enum ErrorPriority {
  API = 'API',
  CUSTOM = 'CUSTOM',
  DEFAULT = 'DEFAULT',
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusMapping = [
      {
        check: exception instanceof HttpException,
        value:
          exception instanceof HttpException ? exception.getStatus() : null,
      },
      {
        check: exception instanceof CustomError,
        value: exception instanceof CustomError ? exception.statusCode : null,
      },
    ];
    const status =
      statusMapping.find((mapping) => mapping.check)?.value ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    const genericMessage =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const extractMessage = (msg: any): string =>
      Array.isArray(msg) ? msg[0] : msg;

    const errorHandlers = {
      [ErrorPriority.API]: () => extractMessage(exception?.response?.message),
      [ErrorPriority.CUSTOM]: () =>
        exception instanceof CustomError ? exception.message : '',
      [ErrorPriority.DEFAULT]: () => exception.message,
    };

    const priorityOrder: ErrorPriority[] = [
      ErrorPriority.API,
      ErrorPriority.CUSTOM,
      ErrorPriority.DEFAULT,
    ];
    const internalMessage =
      priorityOrder
        .map((key) => errorHandlers[key]())
        .find((msg) => msg && msg.toString().trim().length > 0) ||
      genericMessage;

    const location =
      (exception.stack?.split('\n') ?? []).reduce(
        (found: string, line: string) =>
          found ||
          (line.includes('\\src\\') ? `src${line.split('src')[1]}` : null),
        null,
      ) || 'Arquivo do erro não identificado';

    const errorResponse = {
      statusCode: status,
      message: internalMessage,
      error: {
        internalMessage,
        url: request.url,
        location,
      },
    };
    const rawResponse = exception?.['rawResponse'] ?? 'undefined';
    response.locals.errorResponse = internalMessage;
    response.locals.rawResponse = rawResponse;
    response.locals.location = internalMessage?.error?.location;

    response.status(status).json(errorResponse);

    const logMessage =
      internalMessage && internalMessage.toString().trim().length > 1
        ? { log: internalMessage, file: location }
        : null;
    response.on(
      'finish',
      () => logMessage && console.log('Error detail:', logMessage),
    );
  }
}
