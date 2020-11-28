import { Injectable } from '@nestjs/common';
import { MessageDto } from '@api/types';

@Injectable()
export class AppService {
  getData(): MessageDto {
    console.log('return message.');
    return { message: 'Welcome to api!' };
  }
}
