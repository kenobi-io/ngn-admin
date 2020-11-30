import { join } from 'path';

export const grpcOption = (
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
  port?: string,
  protoPath?: string
) => {
  return {
    transport: transport,
    options: {
      url: port || '127.0.0.1:8002',
      package: 'api.auth',
      protoPath: protoPath || 
        join(__dirname, '../../../', 'libs/api-interfaces/src/lib/proto/auth.proto')
    },
  };
};

export const userGrpc = (
  transport: number,
  port?: string,
  protoPath?: string
) => {
  return {
    transport: transport,
    options: {
      url: port || '127.0.0.1:8001',
      package: 'api.user',
      protoPath: protoPath || 
        join(__dirname, '../../../', 'libs/api-interfaces/src/lib/proto/user.proto')
    },
  };
};