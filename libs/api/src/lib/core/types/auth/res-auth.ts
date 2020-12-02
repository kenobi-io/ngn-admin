import { auth_pb } from '../../generated';

export class ResAuth implements auth_pb.ResAuth.AsObject {
    token: string;
}