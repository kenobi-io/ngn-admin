import { Controller, Get } from '@nestjs/common';

import { AppService, User } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getData(): User[] {
        return this.appService.getData();
    }
}
