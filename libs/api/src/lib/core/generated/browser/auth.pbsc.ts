/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './auth.pb';
import { GRPC_AUTH_SERVICE_CLIENT_SETTINGS } from './auth.pbconf';
/**
 * Service client implementation for api.auth.AuthService
 */
@Injectable({ providedIn: 'any' })
export class AuthServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary RPC for /api.auth.AuthService/auth
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ResAuth>>
     */
    auth: (
      requestData: thisProto.ReqAuth,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ResAuth>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.auth.AuthService/auth',
        requestData,
        requestMetadata,
        requestClass: thisProto.ReqAuth,
        responseClass: thisProto.ResAuth
      });
    },
    /**
     * Unary RPC for /api.auth.AuthService/update
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ResAuth>>
     */
    update: (
      requestData: thisProto.Stub,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ResAuth>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.auth.AuthService/update',
        requestData,
        requestMetadata,
        requestClass: thisProto.Stub,
        responseClass: thisProto.ResAuth
      });
    },
    /**
     * Server streaming RPC for /api.auth.AuthService/getCertStream
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.GetCertStreamReAuth>>
     */
    getCertStream: (
      requestData: thisProto.Stub,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.GetCertStreamReAuth>> => {
      return this.handler.handle({
        type: GrpcCallType.serverStream,
        client: this.client,
        path: '/api.auth.AuthService/getCertStream',
        requestData,
        requestMetadata,
        requestClass: thisProto.Stub,
        responseClass: thisProto.GetCertStreamReAuth
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_AUTH_SERVICE_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('api.auth.AuthService', settings);
  }

  /**
   * Unary RPC for /api.auth.AuthService/auth
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ResAuth>
   */
  auth(
    requestData: thisProto.ReqAuth,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ResAuth> {
    return this.$raw
      .auth(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /api.auth.AuthService/update
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ResAuth>
   */
  update(
    requestData: thisProto.Stub,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ResAuth> {
    return this.$raw
      .update(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Server streaming RPC for /api.auth.AuthService/getCertStream
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.GetCertStreamReAuth>
   */
  getCertStream(
    requestData: thisProto.Stub,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.GetCertStreamReAuth> {
    return this.$raw
      .getCertStream(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
