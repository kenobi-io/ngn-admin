/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
// import { environment as env } from './environments/environment';

async function bootstrap(): Promise<void> {
    // const { port, prefix } = env;
    const app = await NestFactory.create(AppModule);
    // TODO: add rule to linter for prefix (globalPrefix only from lib) var name and port nam
    // app.setGlobalPrefix(prefix);
    // await app.listen(port);
    app.enableCors(); // TODO: for develop mode cause angular proxy not work
    app.setGlobalPrefix('api/v1/bff');
    await app.listen(3330);
    Logger.log(
        `🚀 Application is running on: http://localhost:${3330}/${'api/v1/bff'}`
    );
}

bootstrap();
