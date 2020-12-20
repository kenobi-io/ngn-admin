/* eslint-disable */
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface ReqAuth {
  email: string;
  password: string;
}

export interface ResAuth {
  token: string;
}

export interface GetCertStreamReAuth {
  key: string;
}

export interface Stub {
}

export interface AuthServiceClient {

  auth(request: ReqAuth, metadata: Metadata, ...rest: any): Observable<ResAuth>;

  update(request: Stub, metadata: Metadata, ...rest: any): Observable<ResAuth>;

  getCertStream(request: Stub, metadata: Metadata, ...rest: any): Observable<GetCertStreamReAuth>;

}

export interface AuthServiceController {

  auth(request: ReqAuth, metadata: Metadata, ...rest: any): Observable<ResAuth>;

  update(request: Stub, metadata: Metadata, ...rest: any): Observable<ResAuth>;

  getCertStream(request: Stub, metadata: Metadata, ...rest: any): Observable<GetCertStreamReAuth>;

}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['auth', 'update', 'getCertStream'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('AuthService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('AuthService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'api.auth'

export const API_AUTH_PACKAGE_NAME = 'api.auth'
export const AUTH_SERVICE_NAME = 'AuthService';