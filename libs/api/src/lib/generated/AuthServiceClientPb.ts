/**
 * @fileoverview gRPC-Web generated client stub for api.auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as auth_pb from './auth_pb';


export class AuthServiceClient {
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

  methodInfoauth = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.ResAuth,
    (request: auth_pb.ReqAuth) => {
      return request.serializeBinary();
    },
    auth_pb.ResAuth.deserializeBinary
  );

  auth(
    request: auth_pb.ReqAuth,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.ResAuth>;

  auth(
    request: auth_pb.ReqAuth,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_pb.ResAuth) => void): grpcWeb.ClientReadableStream<auth_pb.ResAuth>;

  auth(
    request: auth_pb.ReqAuth,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_pb.ResAuth) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.auth.AuthService/auth',
        request,
        metadata || {},
        this.methodInfoauth,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.auth.AuthService/auth',
    request,
    metadata || {},
    this.methodInfoauth);
  }

  methodInfoupdate = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.ResAuth,
    (request: auth_pb.Stub) => {
      return request.serializeBinary();
    },
    auth_pb.ResAuth.deserializeBinary
  );

  update(
    request: auth_pb.Stub,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.ResAuth>;

  update(
    request: auth_pb.Stub,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_pb.ResAuth) => void): grpcWeb.ClientReadableStream<auth_pb.ResAuth>;

  update(
    request: auth_pb.Stub,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_pb.ResAuth) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.auth.AuthService/update',
        request,
        metadata || {},
        this.methodInfoupdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.auth.AuthService/update',
    request,
    metadata || {},
    this.methodInfoupdate);
  }

  methodInfogetCertStream = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.GetCertStreamReAuth,
    (request: auth_pb.Stub) => {
      return request.serializeBinary();
    },
    auth_pb.GetCertStreamReAuth.deserializeBinary
  );

  getCertStream(
    request: auth_pb.Stub,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.auth.AuthService/getCertStream',
      request,
      metadata || {},
      this.methodInfogetCertStream);
  }

}

