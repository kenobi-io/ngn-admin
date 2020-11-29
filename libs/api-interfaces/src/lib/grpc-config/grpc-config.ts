import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const grpcOption = (
  transport: number,
  protoPath: string,
  pack: string,
  port?: string
) => {
  return {
    transport: transport,
    options: {
      url: port,
      package: pack,
      protoPath: protoPath,
    },
  };
};


export const authGrps = (
  transport: number,
  protoPath: string,
  port?: string
) => {
  return {
    transport: transport,
    options: {
      url: port || '127.0.0.1:8002',
      package: 'api.auth',
      protoPath: protoPath,
    },
  };
};

// export const userGrpc = (
//   transport: number,
//   protoPath: string,
//   port?: string
// ) => {
//   return {
//     transport: transport,
//     options: {
//       url: port || '127.0.0.1:8001',
//       package: 'api.user',
//       protoPath: protoPath,
//     },
//   };
// };


export const userGrpc: GrpcOptions = grpcOption(
    Transport.GRPC, 
    join(__dirname, '../../../', 'libs/api-interfaces/src/lib/proto/user.proto'),
    'api.user',
    '127.0.0.1:8001');
