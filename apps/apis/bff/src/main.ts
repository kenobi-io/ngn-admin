/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment as env } from './environments/environment';

const { port, prefix } = env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: add rule to linter for prefix (globalPrefix only from lib) var name and port nam
  app.setGlobalPrefix(prefix);
  const servicePort = process.env.PORT || port;
  await app.listen(servicePort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${servicePort}/${prefix}`
  );
}

bootstrap();
