import { Controller, Get } from '@nestjs/common';

import { MessageDto } from '@api/types';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): MessageDto {
    return this.appService.getData();
  }
}
