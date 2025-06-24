import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { status, StatusType } from '../dto/log.dto'; // Make sure Status is exported as an enum, not just a type
import { ReqUser } from 'src/application/infraestructure/auth/types';

@Schema({ timestamps: true })
export class Log {

    @Prop({ type: String, required: false })
    method: string;

    @Prop({ type: Number, required: true })
    statusCode: number;

    @Prop({ type: String, required: false })
    url: string

    @Prop({ type: String, enum: status, required: true })
    status: StatusType;

    @Prop({ type: String, required: false })
    file: string = 'not specified';

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Object, required: false })
    body: object = {};

    @Prop({ type: String, required: false })
    host: string;

    @Prop({ type: String, required: false })
    clientIp: string | string[];

    @Prop({ type: Object, required: false })
    reqUser: ReqUser | null = null;
}

export const LogSchema = SchemaFactory.createForClass(Log);
LogSchema.index({ status: 1 });