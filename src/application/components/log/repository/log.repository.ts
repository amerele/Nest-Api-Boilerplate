import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from '../schema/log.schema';
import { LogDto } from '../dto/log.dto';
import { ILogInterface } from '../../../infraestructure/interfaces/ILog.interface';

@Injectable()
export class LogRepository implements ILogInterface {
constructor(
    @InjectModel(Log.name)
    private readonly model: Model<Log>,
  ) { }

  public async create(dto: LogDto): Promise<void> {
    await this.model.create(dto);
  }
}
 