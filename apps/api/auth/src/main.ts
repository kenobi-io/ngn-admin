import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { environment } from '@api/env-auth';
import { authGrps } from '@api/core';

async function bootstrap() {
  const config: GrpcOptions = authGrps(
    Transport.GRPC,
    environment.port.toString()
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config
  );
  
  // app.useLogger(logger); TODO: add logger;
  
  app.useGlobalPipes(new ValidationPipe());
  console.log("Compiled: ", await app.listenAsync());
}

bootstrap();
