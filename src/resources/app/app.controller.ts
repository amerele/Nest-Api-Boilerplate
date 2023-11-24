import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  getHello() {
    return 'Promo';
  }
}
