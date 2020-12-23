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
import * as thisProto from './user.pb';
import { GRPC_USER_SERVICE_CLIENT_SETTINGS } from './user.pbconf';
/**
 * Service client implementation for api.user.UserService
 */
@Injectable({ providedIn: 'any' })
export class UserServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary RPC for /api.user.UserService/create
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ResUser>>
     */
    create: (
      requestData: thisProto.CreateReqUser,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ResUser>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.user.UserService/create',
        requestData,
        requestMetadata,
        requestClass: thisProto.CreateReqUser,
        responseClass: thisProto.ResUser
      });
    },
    /**
     * Unary RPC for /api.user.UserService/update
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ResUser>>
     */
    update: (
      requestData: thisProto.UpdateReqUser,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ResUser>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.user.UserService/update',
        requestData,
        requestMetadata,
        requestClass: thisProto.UpdateReqUser,
        responseClass: thisProto.ResUser
      });
    },
    /**
     * Unary RPC for /api.user.UserService/delete
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ResUser>>
     */
    delete: (
      requestData: thisProto.ReqUser,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ResUser>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.user.UserService/delete',
        requestData,
        requestMetadata,
        requestClass: thisProto.ReqUser,
        responseClass: thisProto.ResUser
      });
    },
    /**
     * Unary RPC for /api.user.UserService/verify
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.User>>
     */
    verify: (
      requestData: thisProto.VerifyReqUser,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.User>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.user.UserService/verify',
        requestData,
        requestMetadata,
        requestClass: thisProto.VerifyReqUser,
        responseClass: thisProto.User
      });
    },
    /**
     * Unary RPC for /api.user.UserService/get
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.User>>
     */
    get: (
      requestData: thisProto.ReqUser,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.User>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.user.UserService/get',
        requestData,
        requestMetadata,
        requestClass: thisProto.ReqUser,
        responseClass: thisProto.User
      });
    },
    /**
     * Unary RPC for /api.user.UserService/getAll
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ArrayResUser>>
     */
    getAll: (
      requestData: thisProto.ReqUser,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ArrayResUser>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/api.user.UserService/getAll',
        requestData,
        requestMetadata,
        requestClass: thisProto.ReqUser,
        responseClass: thisProto.ArrayResUser
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_USER_SERVICE_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('api.user.UserService', settings);
  }

  /**
   * Unary RPC for /api.user.UserService/create
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ResUser>
   */
  create(
    requestData: thisProto.CreateReqUser,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ResUser> {
    return this.$raw
      .create(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /api.user.UserService/update
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ResUser>
   */
  update(
    requestData: thisProto.UpdateReqUser,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ResUser> {
    return this.$raw
      .update(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /api.user.UserService/delete
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ResUser>
   */
  delete(
    requestData: thisProto.ReqUser,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ResUser> {
    return this.$raw
      .delete(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /api.user.UserService/verify
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.User>
   */
  verify(
    requestData: thisProto.VerifyReqUser,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.User> {
    return this.$raw
      .verify(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /api.user.UserService/get
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.User>
   */
  get(
    requestData: thisProto.ReqUser,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.User> {
    return this.$raw
      .get(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /api.user.UserService/getAll
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ArrayResUser>
   */
  getAll(
    requestData: thisProto.ReqUser,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ArrayResUser> {
    return this.$raw
      .getAll(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
