import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientGrpc,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';

import { userGrpc, UserServiceClient } from '@api/types';
import { environment } from '@api/env-auth';

@Controller()
export class AuthController implements OnModuleInit {

  @Client(userGrpc(Transport.GRPC, environment.port.toString()))
  private readonly userClientGrpc: ClientGrpc;
  private userServiceGrps: UserServiceClient;

  constructor() {}

  public onModuleInit() {
    this.userServiceGrps = this.userClientGrpc.getService('UserService');
  }

//   @GrpcMethod('AuthService', 'auth')
//   auth(data: ReqAuth,  metadata: Metadata, call: ServerUnaryCall<any>): ResAuth {
//     const items = [
//       { email: '', password: 'John' },
//       { email: '', password: 'Doe' },
//     ];
//     return items.find(({ id }) => id === data.id);
//   }
}
