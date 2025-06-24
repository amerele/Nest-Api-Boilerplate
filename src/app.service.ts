import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nest API Boilerplate by Bruno Gomes';
  }
}
