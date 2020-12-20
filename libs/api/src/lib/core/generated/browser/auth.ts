/* eslint-disable */
import { Observable } from 'rxjs';
import { BrowserHeaders } from 'browser-headers';
import { grpc } from '@improbable-eng/grpc-web';
import { take, share } from 'rxjs/operators';
import { Code } from '@improbable-eng/grpc-web/dist/typings/Code';
import { Writer, Reader } from 'protobufjs/minimal';


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

const baseReqAuth: object = {
  email: "",
  password: "",
};

const baseResAuth: object = {
  token: "",
};

const baseGetCertStreamReAuth: object = {
  key: "",
};

const baseStub: object = {
};

export interface AuthService {

  auth(request: DeepPartial<ReqAuth>, metadata?: grpc.Metadata): Observable<ResAuth>;

  update(request: DeepPartial<Stub>, metadata?: grpc.Metadata): Observable<ResAuth>;

  getCertStream(request: DeepPartial<Stub>, metadata?: grpc.Metadata): Observable<GetCertStreamReAuth>;

}

export class AuthServiceClientImpl implements AuthService {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  auth(request: DeepPartial<ReqAuth>, metadata?: grpc.Metadata): Observable<ResAuth> {
    return this.rpc.unary(AuthServiceauthDesc, ReqAuth.fromPartial(request), metadata);
  }

  update(request: DeepPartial<Stub>, metadata?: grpc.Metadata): Observable<ResAuth> {
    return this.rpc.unary(AuthServiceupdateDesc, Stub.fromPartial(request), metadata);
  }

  getCertStream(request: DeepPartial<Stub>, metadata?: grpc.Metadata): Observable<GetCertStreamReAuth> {
    return this.rpc.invoke(AuthServicegetCertStreamDesc, Stub.fromPartial(request), metadata);
  }

}

interface Rpc {

  unary<T extends UnaryMethodDefinitionish>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined): Observable<any>;

  invoke<T extends UnaryMethodDefinitionish>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined): Observable<any>;

}

export class GrpcWebImpl implements Rpc {

  private host: string;

  private options: { transport?: grpc.TransportFactory, streamingTransport?: grpc.TransportFactory, debug?: boolean, metadata?: grpc.Metadata | undefined };

  constructor(host: string, options: { transport?: grpc.TransportFactory, streamingTransport?: grpc.TransportFactory, debug?: boolean, metadata?: grpc.Metadata | undefined }) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(methodDesc: T, _request: any, metadata: grpc.Metadata | undefined): Observable<any> {
    const request = { ..._request, ...methodDesc.requestType };
        const maybeCombinedMetadata =
        metadata && this.options.metadata
          ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
          : metadata || this.options.metadata;
        return new Observable(observer => {
          grpc.unary(methodDesc, {
              request,
              host: this.host,
              metadata: maybeCombinedMetadata,
              transport: this.options.transport,
              debug: this.options.debug,
              onEnd: (next) => {
                if (next.status !== 0) {
                  observer.error({ code: next.status, message: next.statusMessage });
                } else {
                  observer.next(next.message as any);
                  observer.complete();
                }
              },
            });
          }).pipe(take(1));}

  invoke<T extends UnaryMethodDefinitionish>(methodDesc: T, _request: any, metadata: grpc.Metadata | undefined): Observable<any> {
    const upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15]; /* Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes) */
        const DEFAULT_TIMEOUT_TIME: number = 3 /* seconds */ * 1000 /* ms */;
        const request = { ..._request, ...methodDesc.requestType };
        const maybeCombinedMetadata =
        metadata && this.options.metadata
          ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
          : metadata || this.options.metadata;
        return new Observable(observer => {
          const upStream = (() => {
            grpc.invoke(methodDesc, {
              host: this.host,
              request,
              transport: this.options.streamingTransport || this.options.transport,
              metadata: maybeCombinedMetadata,
              debug: this.options.debug,
              onMessage: (next) => observer.next(next),
              onEnd: (code: Code, message: string) => {
                if (code === 0) {
                  observer.complete();
                } else if (upStreamCodes.includes(code)) {
                  setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
                } else {
                  observer.error(new Error(`Error ${code} ${message}`));
                }
              },
            });
          });
          upStream();
        }).pipe(share());
  }

}

export const protobufPackage = 'api.auth'

export const ReqAuth = {
  encode(message: ReqAuth, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.email);
    writer.uint32(18).string(message.password);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReqAuth {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReqAuth } as ReqAuth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReqAuth {
    const message = { ...baseReqAuth } as ReqAuth;
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReqAuth>): ReqAuth {
    const message = { ...baseReqAuth } as ReqAuth;
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = "";
    }
    return message;
  },
  toJSON(message: ReqAuth): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },
};

export const ResAuth = {
  encode(message: ResAuth, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.token);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ResAuth {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResAuth } as ResAuth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ResAuth {
    const message = { ...baseResAuth } as ResAuth;
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ResAuth>): ResAuth {
    const message = { ...baseResAuth } as ResAuth;
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = "";
    }
    return message;
  },
  toJSON(message: ResAuth): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },
};

export const GetCertStreamReAuth = {
  encode(message: GetCertStreamReAuth, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GetCertStreamReAuth {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetCertStreamReAuth } as GetCertStreamReAuth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetCertStreamReAuth {
    const message = { ...baseGetCertStreamReAuth } as GetCertStreamReAuth;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetCertStreamReAuth>): GetCertStreamReAuth {
    const message = { ...baseGetCertStreamReAuth } as GetCertStreamReAuth;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
  toJSON(message: GetCertStreamReAuth): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },
};

export const Stub = {
  encode(_: Stub, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Stub {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStub } as Stub;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): Stub {
    const message = { ...baseStub } as Stub;
    return message;
  },
  fromPartial(_: DeepPartial<Stub>): Stub {
    const message = { ...baseStub } as Stub;
    return message;
  },
  toJSON(_: Stub): unknown {
    const obj: any = {};
    return obj;
  },
};

export const AuthServiceDesc = {
  serviceName: "api.auth.AuthService",
}
export const AuthServiceauthDesc: UnaryMethodDefinitionish = {
  methodName: "auth",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary: function serializeBinary() {
      return ReqAuth.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...ResAuth.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
export const AuthServiceupdateDesc: UnaryMethodDefinitionish = {
  methodName: "update",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary: function serializeBinary() {
      return Stub.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...ResAuth.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
export const AuthServicegetCertStreamDesc: UnaryMethodDefinitionish = {
  methodName: "getCertStream",
  service: AuthServiceDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary: function serializeBinary() {
      return Stub.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...GetCertStreamReAuth.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
import UnaryMethodDefinition = grpc.UnaryMethodDefinition;
interface UnaryMethodDefinitionishR extends UnaryMethodDefinition<any, any> { requestStream: any; responseStream: any; };
type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;