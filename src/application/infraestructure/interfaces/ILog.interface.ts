import { LogDto } from '../../components/log/dto/log.dto';

interface ILogInterface {
  create: (dto: LogDto) => Promise<void>;
}

export { ILogInterface };
