/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from '@api/env';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(environment.globalPrefix);
    const port = process.env.PORT || environment.port;
    await app.listen(port, () => {
      Logger.log('Listening at http://localhost:' + port + '/' + environment.globalPrefix);
    });
  }

bootstrap();
