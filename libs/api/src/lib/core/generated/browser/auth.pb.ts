/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for api.auth.ReqAuth
 */
export class ReqAuth implements GrpcMessage {
  static id = 'api.auth.ReqAuth';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ReqAuth();
    ReqAuth.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ReqAuth) {
    _instance.email = _instance.email || '';
    _instance.password = _instance.password || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ReqAuth,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.email = _reader.readString();
          break;
        case 2:
          _instance.password = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ReqAuth.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: ReqAuth, _writer: BinaryWriter) {
    if (_instance.email) {
      _writer.writeString(1, _instance.email);
    }
    if (_instance.password) {
      _writer.writeString(2, _instance.password);
    }
  }

  private _email?: string;
  private _password?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ReqAuth to deeply clone from
   */
  constructor(_value?: RecursivePartial<ReqAuth.AsObject>) {
    _value = _value || {};
    this.email = _value.email;
    this.password = _value.password;
    ReqAuth.refineValues(this);
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
  }
  get password(): string | undefined {
    return this._password;
  }
  set password(value: string | undefined) {
    this._password = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ReqAuth.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ReqAuth.AsObject {
    return {
      email: this.email,
      password: this.password
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ReqAuth.AsProtobufJSON {
    return {
      email: this.email,
      password: this.password
    };
  }
}
export module ReqAuth {
  /**
   * Standard JavaScript object representation for ReqAuth
   */
  export interface AsObject {
    email?: string;
    password?: string;
  }

  /**
   * Protobuf JSON representation for ReqAuth
   */
  export interface AsProtobufJSON {
    email?: string;
    password?: string;
  }
}

/**
 * Message implementation for api.auth.ResAuth
 */
export class ResAuth implements GrpcMessage {
  static id = 'api.auth.ResAuth';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ResAuth();
    ResAuth.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ResAuth) {
    _instance.token = _instance.token || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ResAuth,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.token = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ResAuth.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: ResAuth, _writer: BinaryWriter) {
    if (_instance.token) {
      _writer.writeString(1, _instance.token);
    }
  }

  private _token?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ResAuth to deeply clone from
   */
  constructor(_value?: RecursivePartial<ResAuth.AsObject>) {
    _value = _value || {};
    this.token = _value.token;
    ResAuth.refineValues(this);
  }
  get token(): string | undefined {
    return this._token;
  }
  set token(value: string | undefined) {
    this._token = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ResAuth.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ResAuth.AsObject {
    return {
      token: this.token
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ResAuth.AsProtobufJSON {
    return {
      token: this.token
    };
  }
}
export module ResAuth {
  /**
   * Standard JavaScript object representation for ResAuth
   */
  export interface AsObject {
    token?: string;
  }

  /**
   * Protobuf JSON representation for ResAuth
   */
  export interface AsProtobufJSON {
    token?: string;
  }
}

/**
 * Message implementation for api.auth.GetCertStreamReAuth
 */
export class GetCertStreamReAuth implements GrpcMessage {
  static id = 'api.auth.GetCertStreamReAuth';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetCertStreamReAuth();
    GetCertStreamReAuth.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetCertStreamReAuth) {
    _instance.key = _instance.key || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetCertStreamReAuth,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.key = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetCertStreamReAuth.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetCertStreamReAuth,
    _writer: BinaryWriter
  ) {
    if (_instance.key) {
      _writer.writeString(1, _instance.key);
    }
  }

  private _key?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetCertStreamReAuth to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetCertStreamReAuth.AsObject>) {
    _value = _value || {};
    this.key = _value.key;
    GetCertStreamReAuth.refineValues(this);
  }
  get key(): string | undefined {
    return this._key;
  }
  set key(value: string | undefined) {
    this._key = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetCertStreamReAuth.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetCertStreamReAuth.AsObject {
    return {
      key: this.key
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetCertStreamReAuth.AsProtobufJSON {
    return {
      key: this.key
    };
  }
}
export module GetCertStreamReAuth {
  /**
   * Standard JavaScript object representation for GetCertStreamReAuth
   */
  export interface AsObject {
    key?: string;
  }

  /**
   * Protobuf JSON representation for GetCertStreamReAuth
   */
  export interface AsProtobufJSON {
    key?: string;
  }
}

/**
 * Message implementation for api.auth.Stub
 */
export class Stub implements GrpcMessage {
  static id = 'api.auth.Stub';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Stub();
    Stub.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Stub) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Stub, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    Stub.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Stub, _writer: BinaryWriter) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Stub to deeply clone from
   */
  constructor(_value?: RecursivePartial<Stub.AsObject>) {
    _value = _value || {};
    Stub.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Stub.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Stub.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Stub.AsProtobufJSON {
    return {};
  }
}
export module Stub {
  /**
   * Standard JavaScript object representation for Stub
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for Stub
   */
  export interface AsProtobufJSON {}
}
