import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { environment } from '@api/env-auth';
import { join } from 'path';
// import { authGrpc } from '@api/core';

async function bootstrap() {

  
const authGrpc = (
  transport: number,
  port?: number,
  protoPath?: string
) => {
  return {
    transport: transport,
    options: {
      url: '0.0.0.0:' + port || 50051,
      package: 'api.auth',
      protoPath: protoPath || 
        join(__dirname, '../../../', 'apps/proto/auth.proto')
    },
  };
};
  const config: GrpcOptions = authGrpc(
    Transport.GRPC,
    environment.port
  ) as GrpcOptions;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config
  );
  app.listenAsync().then(() => {
      Logger.log('Listening at http://localhost:' + environment.port);
  });
}

bootstrap();
