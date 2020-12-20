import {
  AuthService,
  AuthServiceClientImpl,
  AuthServiceDesc,
  AuthServiceauthDesc,
  AuthServicegetCertStreamDesc,
  AuthServiceupdateDesc,
  GetCertStreamReAuth,
  GrpcWebImpl,
  ReqAuth,
  ResAuth,
  Stub,
  protobufPackage,
} from './auth';

export { DeepPartial } from './auth';
export type AuthServiceBr = AuthService;
export const GrpcWebImplBr = GrpcWebImpl;
export const AuthServiceClientImplBr = AuthServiceClientImpl;
export const AuthServiceDescBr = AuthServiceDesc;
export const AuthServiceauthDescBr = AuthServiceauthDesc;
export const AuthServicegetCertStreamDescBr = AuthServicegetCertStreamDesc;
export const AuthServiceupdateDescBr = AuthServiceupdateDesc;
export type GetCertStreamReAuthBr = GetCertStreamReAuth;
export type ReqAuthBr = ReqAuth;
export type ResAuthBr = ResAuth;
export type StubBr = Stub;
export const protobufPackageBr = protobufPackage;
