// import { join } from 'path';

// export const grpcOption = (
//   transport: number,
//   protoPath: string,
//   pack: string,
//   port?: string
// ) => {
//   return {
//     transport: transport,
//     options: {
//       url: port,
//       package: pack,
//       protoPath: protoPath,
//     },
//   };
// };


// export const authGrpc = (
//   transport: number,
//   port?: number,
//   protoPath?: string
// ) => {
//   return {
//     transport: transport,
//     options: {
//       url: '0.0.0.0:' + port || 50051, // port || '127.0.0.1:8002',
//       package: 'api.auth',
//       protoPath: protoPath || 
//         join(__dirname, '../../../', 'apps/proto/auth.proto')
//     },
//   };
// };

// export const userGrpc = (
//   transport: number,
//   port?: string,
//   protoPath?: string
// ) => {
//   return {
//     transport: transport,
//     options: {
//       url: 'localhost:' + port || '8001',
//       package: 'api.user',
//       protoPath: protoPath || 
//         join(__dirname, '../../../', 'apps/proto/user.proto')
//     },
//   };
// };