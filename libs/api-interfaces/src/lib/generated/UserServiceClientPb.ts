/**
 * @fileoverview gRPC-Web generated client stub for api.user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';


export class UserServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfocreate = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.ResUser,
    (request: user_pb.CreateReqUser) => {
      return request.serializeBinary();
    },
    user_pb.ResUser.deserializeBinary
  );

  create(
    request: user_pb.CreateReqUser,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.ResUser>;

  create(
    request: user_pb.CreateReqUser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.ResUser) => void): grpcWeb.ClientReadableStream<user_pb.ResUser>;

  create(
    request: user_pb.CreateReqUser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.ResUser) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.user.UserService/create',
        request,
        metadata || {},
        this.methodInfocreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.user.UserService/create',
    request,
    metadata || {},
    this.methodInfocreate);
  }

  methodInfoupdate = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.ResUser,
    (request: user_pb.UpdateReqUser) => {
      return request.serializeBinary();
    },
    user_pb.ResUser.deserializeBinary
  );

  update(
    request: user_pb.UpdateReqUser,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.ResUser>;

  update(
    request: user_pb.UpdateReqUser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.ResUser) => void): grpcWeb.ClientReadableStream<user_pb.ResUser>;

  update(
    request: user_pb.UpdateReqUser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.ResUser) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.user.UserService/update',
        request,
        metadata || {},
        this.methodInfoupdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.user.UserService/update',
    request,
    metadata || {},
    this.methodInfoupdate);
  }

  methodInfodelete = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.ResUser,
    (request: user_pb.ReqUser) => {
      return request.serializeBinary();
    },
    user_pb.ResUser.deserializeBinary
  );

  delete(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.ResUser>;

  delete(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.ResUser) => void): grpcWeb.ClientReadableStream<user_pb.ResUser>;

  delete(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.ResUser) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.user.UserService/delete',
        request,
        metadata || {},
        this.methodInfodelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.user.UserService/delete',
    request,
    metadata || {},
    this.methodInfodelete);
  }

  methodInfoverify = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.User,
    (request: user_pb.VerifyReqUser) => {
      return request.serializeBinary();
    },
    user_pb.User.deserializeBinary
  );

  verify(
    request: user_pb.VerifyReqUser,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.User>;

  verify(
    request: user_pb.VerifyReqUser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.User) => void): grpcWeb.ClientReadableStream<user_pb.User>;

  verify(
    request: user_pb.VerifyReqUser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.user.UserService/verify',
        request,
        metadata || {},
        this.methodInfoverify,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.user.UserService/verify',
    request,
    metadata || {},
    this.methodInfoverify);
  }

  methodInfoget = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.User,
    (request: user_pb.ReqUser) => {
      return request.serializeBinary();
    },
    user_pb.User.deserializeBinary
  );

  get(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.User>;

  get(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.User) => void): grpcWeb.ClientReadableStream<user_pb.User>;

  get(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.user.UserService/get',
        request,
        metadata || {},
        this.methodInfoget,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.user.UserService/get',
    request,
    metadata || {},
    this.methodInfoget);
  }

  methodInfogetAll = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.ArrayResUser,
    (request: user_pb.ReqUser) => {
      return request.serializeBinary();
    },
    user_pb.ArrayResUser.deserializeBinary
  );

  getAll(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.ArrayResUser>;

  getAll(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.ArrayResUser) => void): grpcWeb.ClientReadableStream<user_pb.ArrayResUser>;

  getAll(
    request: user_pb.ReqUser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.ArrayResUser) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.user.UserService/getAll',
        request,
        metadata || {},
        this.methodInfogetAll,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.user.UserService/getAll',
    request,
    metadata || {},
    this.methodInfogetAll);
  }

}

