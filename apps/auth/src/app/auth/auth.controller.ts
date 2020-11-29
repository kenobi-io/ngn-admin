import { Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { userGrpc, UserServiceClient } from '@api/types';
import { environment } from '@api/env-auth';

@Controller('auth')
export class AuthController implements OnModuleInit {

    // @Client(userGrpc
    //     // userGrpc(
    //     //     Transport.GRPC, 
    //     //     join(__dirname, '../../../', 'libs/api-interfaces/src/lib/proto/user.proto'),
    //     //     environment.port.toString())
    // )
    private readonly userClientGrpc: ClientGrpc;
    private userServiceGrps: UserServiceClient;

    constructor() { }

    public onModuleInit() {
        let i = 0;
        i++;
        // this.userServiceGrps = this.userClientGrpc.getService('UserServiceClient');
    }

}
