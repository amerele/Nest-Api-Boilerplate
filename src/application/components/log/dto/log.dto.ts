import {
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { ReqUser } from 'src/application/infraestructure/auth/types';

export const status = {
    success: 'SUCCESS',
    error: 'ERROR',
} as const

export type StatusType = typeof status[keyof typeof status];

export class LogDto {

    @IsOptional()
    reqUser: ReqUser | null = null;

    @IsNotEmpty()
    @IsNumber()
    statusCode: number;

    @IsNotEmpty()
    status: StatusType;

    @IsString()
    @IsOptional()
    description: string = '';

    @IsString()
    @IsOptional()
    method: string = '';

    @IsString()
    @IsOptional()
    url: string = '';

    @IsString()
    @IsOptional()
    file: string = 'not specified';

    @IsObject()
    @IsOptional()
    body: object = {};

    @IsString()
    @IsOptional()
    host: string = '';

    @IsString()
    @IsOptional()
    clientIp: string | string[];
}