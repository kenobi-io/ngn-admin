/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

import { userGrpc } from "@api/core";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const config: GrpcOptions = userGrpc(
    Transport.GRPC,
    environment.port.toString()
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config
  );

  app
    .listenAsync()
    .then(() => {
      Logger.log('Listening at http://localhost:' + environment.port);
    });
}

bootstrap();
