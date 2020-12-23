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
export enum EStatus {
  UNKNOWN = 0,
  SUCCESS = 1,
  ERROR = 2
}
/**
 * Message implementation for api.user.User
 */
export class User implements GrpcMessage {
  static id = 'api.user.User';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new User();
    User.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: User) {
    _instance.id = _instance.id || '';
    _instance.name = _instance.name || '';
    _instance.email = _instance.email || '';
    _instance.avatar = _instance.avatar || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: User, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readString();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.email = _reader.readString();
          break;
        case 4:
          _instance.avatar = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    User.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: User, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeString(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.email) {
      _writer.writeString(3, _instance.email);
    }
    if (_instance.avatar) {
      _writer.writeString(4, _instance.avatar);
    }
  }

  private _id?: string;
  private _name?: string;
  private _email?: string;
  private _avatar?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of User to deeply clone from
   */
  constructor(_value?: RecursivePartial<User.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.email = _value.email;
    this.avatar = _value.avatar;
    User.refineValues(this);
  }
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
  }
  get avatar(): string | undefined {
    return this._avatar;
  }
  set avatar(value: string | undefined) {
    this._avatar = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    User.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): User.AsObject {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar
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
  ): User.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar
    };
  }
}
export module User {
  /**
   * Standard JavaScript object representation for User
   */
  export interface AsObject {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  }

  /**
   * Protobuf JSON representation for User
   */
  export interface AsProtobufJSON {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  }
}

/**
 * Message implementation for api.user.ReqUser
 */
export class ReqUser implements GrpcMessage {
  static id = 'api.user.ReqUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ReqUser();
    ReqUser.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ReqUser) {
    _instance.id = _instance.id || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ReqUser,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ReqUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: ReqUser, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeString(1, _instance.id);
    }
  }

  private _id?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ReqUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<ReqUser.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    ReqUser.refineValues(this);
  }
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ReqUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ReqUser.AsObject {
    return {
      id: this.id
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
  ): ReqUser.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module ReqUser {
  /**
   * Standard JavaScript object representation for ReqUser
   */
  export interface AsObject {
    id?: string;
  }

  /**
   * Protobuf JSON representation for ReqUser
   */
  export interface AsProtobufJSON {
    id?: string;
  }
}

/**
 * Message implementation for api.user.CreateReqUser
 */
export class CreateReqUser implements GrpcMessage {
  static id = 'api.user.CreateReqUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CreateReqUser();
    CreateReqUser.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CreateReqUser) {
    _instance.name = _instance.name || '';
    _instance.email = _instance.email || '';
    _instance.password = _instance.password || '';
    _instance.avatar = _instance.avatar || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CreateReqUser,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.email = _reader.readString();
          break;
        case 3:
          _instance.password = _reader.readString();
          break;
        case 4:
          _instance.avatar = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    CreateReqUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CreateReqUser,
    _writer: BinaryWriter
  ) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.email) {
      _writer.writeString(2, _instance.email);
    }
    if (_instance.password) {
      _writer.writeString(3, _instance.password);
    }
    if (_instance.avatar) {
      _writer.writeString(4, _instance.avatar);
    }
  }

  private _name?: string;
  private _email?: string;
  private _password?: string;
  private _avatar?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CreateReqUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<CreateReqUser.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.email = _value.email;
    this.password = _value.password;
    this.avatar = _value.avatar;
    CreateReqUser.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
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
  get avatar(): string | undefined {
    return this._avatar;
  }
  set avatar(value: string | undefined) {
    this._avatar = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CreateReqUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CreateReqUser.AsObject {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      avatar: this.avatar
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
  ): CreateReqUser.AsProtobufJSON {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      avatar: this.avatar
    };
  }
}
export module CreateReqUser {
  /**
   * Standard JavaScript object representation for CreateReqUser
   */
  export interface AsObject {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
  }

  /**
   * Protobuf JSON representation for CreateReqUser
   */
  export interface AsProtobufJSON {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
  }
}

/**
 * Message implementation for api.user.UpdateReqUser
 */
export class UpdateReqUser implements GrpcMessage {
  static id = 'api.user.UpdateReqUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new UpdateReqUser();
    UpdateReqUser.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: UpdateReqUser) {
    _instance.name = _instance.name || '';
    _instance.email = _instance.email || '';
    _instance.avatar = _instance.avatar || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: UpdateReqUser,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.email = _reader.readString();
          break;
        case 3:
          _instance.avatar = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    UpdateReqUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: UpdateReqUser,
    _writer: BinaryWriter
  ) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.email) {
      _writer.writeString(2, _instance.email);
    }
    if (_instance.avatar) {
      _writer.writeString(3, _instance.avatar);
    }
  }

  private _name?: string;
  private _email?: string;
  private _avatar?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of UpdateReqUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<UpdateReqUser.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.email = _value.email;
    this.avatar = _value.avatar;
    UpdateReqUser.refineValues(this);
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
  }
  get avatar(): string | undefined {
    return this._avatar;
  }
  set avatar(value: string | undefined) {
    this._avatar = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    UpdateReqUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): UpdateReqUser.AsObject {
    return {
      name: this.name,
      email: this.email,
      avatar: this.avatar
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
  ): UpdateReqUser.AsProtobufJSON {
    return {
      name: this.name,
      email: this.email,
      avatar: this.avatar
    };
  }
}
export module UpdateReqUser {
  /**
   * Standard JavaScript object representation for UpdateReqUser
   */
  export interface AsObject {
    name?: string;
    email?: string;
    avatar?: string;
  }

  /**
   * Protobuf JSON representation for UpdateReqUser
   */
  export interface AsProtobufJSON {
    name?: string;
    email?: string;
    avatar?: string;
  }
}

/**
 * Message implementation for api.user.VerifyReqUser
 */
export class VerifyReqUser implements GrpcMessage {
  static id = 'api.user.VerifyReqUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new VerifyReqUser();
    VerifyReqUser.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: VerifyReqUser) {
    _instance.email = _instance.email || '';
    _instance.password = _instance.password || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: VerifyReqUser,
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

    VerifyReqUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: VerifyReqUser,
    _writer: BinaryWriter
  ) {
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
   * @param _value initial values object or instance of VerifyReqUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<VerifyReqUser.AsObject>) {
    _value = _value || {};
    this.email = _value.email;
    this.password = _value.password;
    VerifyReqUser.refineValues(this);
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
    VerifyReqUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): VerifyReqUser.AsObject {
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
  ): VerifyReqUser.AsProtobufJSON {
    return {
      email: this.email,
      password: this.password
    };
  }
}
export module VerifyReqUser {
  /**
   * Standard JavaScript object representation for VerifyReqUser
   */
  export interface AsObject {
    email?: string;
    password?: string;
  }

  /**
   * Protobuf JSON representation for VerifyReqUser
   */
  export interface AsProtobufJSON {
    email?: string;
    password?: string;
  }
}

/**
 * Message implementation for api.user.ResUser
 */
export class ResUser implements GrpcMessage {
  static id = 'api.user.ResUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ResUser();
    ResUser.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ResUser) {
    _instance.status = _instance.status || 0;
    _instance.message = _instance.message || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ResUser,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.status = _reader.readEnum();
          break;
        case 2:
          _instance.message = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ResUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: ResUser, _writer: BinaryWriter) {
    if (_instance.status) {
      _writer.writeEnum(1, _instance.status);
    }
    if (_instance.message) {
      _writer.writeString(2, _instance.message);
    }
  }

  private _status?: EStatus;
  private _message?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ResUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<ResUser.AsObject>) {
    _value = _value || {};
    this.status = _value.status;
    this.message = _value.message;
    ResUser.refineValues(this);
  }
  get status(): EStatus | undefined {
    return this._status;
  }
  set status(value: EStatus | undefined) {
    this._status = value;
  }
  get message(): string | undefined {
    return this._message;
  }
  set message(value: string | undefined) {
    this._message = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ResUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ResUser.AsObject {
    return {
      status: this.status,
      message: this.message
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
  ): ResUser.AsProtobufJSON {
    return {
      status: EStatus[this.status ?? 0],
      message: this.message
    };
  }
}
export module ResUser {
  /**
   * Standard JavaScript object representation for ResUser
   */
  export interface AsObject {
    status?: EStatus;
    message?: string;
  }

  /**
   * Protobuf JSON representation for ResUser
   */
  export interface AsProtobufJSON {
    status?: string;
    message?: string;
  }
}

/**
 * Message implementation for api.user.ArrayResUser
 */
export class ArrayResUser implements GrpcMessage {
  static id = 'api.user.ArrayResUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ArrayResUser();
    ArrayResUser.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ArrayResUser) {
    _instance.users = _instance.users || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ArrayResUser,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new User();
          _reader.readMessage(
            messageInitializer1,
            User.deserializeBinaryFromReader
          );
          (_instance.users = _instance.users || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ArrayResUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ArrayResUser,
    _writer: BinaryWriter
  ) {
    if (_instance.users && _instance.users.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.users as any,
        User.serializeBinaryToWriter
      );
    }
  }

  private _users?: User[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ArrayResUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<ArrayResUser.AsObject>) {
    _value = _value || {};
    this.users = (_value.users || []).map(m => new User(m));
    ArrayResUser.refineValues(this);
  }
  get users(): User[] | undefined {
    return this._users;
  }
  set users(value: User[] | undefined) {
    this._users = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ArrayResUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ArrayResUser.AsObject {
    return {
      users: (this.users || []).map(m => m.toObject())
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
  ): ArrayResUser.AsProtobufJSON {
    return {
      users: (this.users || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module ArrayResUser {
  /**
   * Standard JavaScript object representation for ArrayResUser
   */
  export interface AsObject {
    users?: User.AsObject[];
  }

  /**
   * Protobuf JSON representation for ArrayResUser
   */
  export interface AsProtobufJSON {
    users?: User.AsProtobufJSON[] | null;
  }
}
