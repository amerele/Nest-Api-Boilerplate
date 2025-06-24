import { Injectable } from '@nestjs/common';
import { ILogInterface } from '../../../infraestructure/interfaces/ILog.interface';
import { LogDto } from '../dto/log.dto';

@Injectable()
export class LogService implements ILogInterface {
  constructor(
    @Inject(ILogInterface)
    private readonly repository: ILogInterface) {}

  public async create(dto: LogDto): Promise<void> {
    this.repository.create(dto);
  }
}