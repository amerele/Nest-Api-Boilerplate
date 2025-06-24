/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
  res: null;
  raw: any;

  constructor(
    public statusCode: number,
    message: string,
    raw?: any,
  ) {
    super(message);
    this.res = null;
    this.raw = raw;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class NoContentError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.NO_CONTENT, message);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
export class ConflictError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}
export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
export class ApiRequestError extends CustomError {
  constructor(message: string, raw: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, raw);
  }
}

export class TooManyRequestsError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.TOO_MANY_REQUESTS, message);
  }
}
